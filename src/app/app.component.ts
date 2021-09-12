import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TaskItem } from './models/taskItem.model';
import { TaskItemsService } from './services/taskItems.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { EditTaskItemDialogComponent } from './edit-task-item-dialog/edit-task-item-dialog.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private taskItemsService: TaskItemsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  taskItems: TaskItem[] = [];
  filteredTaskItems: TaskItem[] = [];
  description = '';
  isValid = false;

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings:IDropdownSettings = {};

  ngOnInit() {
    this.getTaskItems();
    this.dropdownList = [
      { item_id: 1, item_text: 'Complete' },
      { item_id: 2, item_text: 'Incomplete' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3
    };
  }

  onItemSelect(item: any) {
    this.filter();
  }
  onSelectAll(items: any) {
    this.filteredTaskItems = this.taskItems;
  }
  onItemDeSelect(item: any) {
    this.filter();
  }

  filter() {
    var includeComplete = this.selectedItems.filter(item => item.item_text == 'Complete').length > 0;
    var includeIncomplete = this.selectedItems.filter(item => item.item_text == 'Incomplete').length > 0;
    if (includeComplete && includeIncomplete)
      this.filteredTaskItems = this.taskItems;
    else if (includeComplete)
      this.filteredTaskItems = this.taskItems.filter((item: any) => item.isComplete == true);
    else if (includeIncomplete)
      this.filteredTaskItems = this.taskItems.filter((item: any) => item.isComplete == false);
    else
      this.filteredTaskItems = this.taskItems;
  }

  createTaskItem() {
    var inputEl = <HTMLInputElement>document.getElementById('description');
    if (inputEl.value.length == 0) {
      this.openSnackBar('Description cannot be empty', 'Cancel')
      return;
    } else {
      var taskItem = new TaskItem();
      taskItem.id = null;
      taskItem.description = inputEl.value;
      this.clearForm();
      this.taskItemsService.createTaskItem(taskItem).subscribe(response => {
        this.getTaskItems();
        console.log(response)
        this.openSnackBar('Item created successfully', 'Cancel');
      });
    }
  }

  getTaskItems() {
      this.taskItemsService.getTaskItems().subscribe((taskItems: any) => {
        this.taskItems = taskItems;
        this.filter();
      });
  }

  deleteTaskItem(taskItem: TaskItem) {
    this.taskItemsService.deleteTaskItem(taskItem).subscribe(taskItem => this.openSnackBar('Item deleted successfully', 'Cancel'));
    this.getTaskItems();
  }

  editTaskItem(taskItem: TaskItem) {
    const dialogRef = this.dialog.open(EditTaskItemDialogComponent, {
      width: 'max(30vw, 300px)',
      data: {id: taskItem.id, description: taskItem.description, isComplete: taskItem.isComplete}
    });

    dialogRef.afterClosed().subscribe(taskItem => {
      if (taskItem) {
        console.log('The dialog was closed', taskItem);
        this.taskItemsService.updateTaskItem(taskItem).subscribe(response => this.openSnackBar('Item updated successfully', 'Cancel'));
        this.getTaskItems()
      }
    });
  }

  toggleCompletion(taskItem: TaskItem) {
    taskItem.isComplete = !taskItem.isComplete;
    this.taskItemsService.updateTaskItem(taskItem).subscribe(response => this.openSnackBar('Completion status updated successfully', 'Cancel'));
    this.getTaskItems();
  }

  clearForm() {
    var inputEl = <HTMLInputElement>document.getElementById('description');
    inputEl.value = '';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  setIsValid(event: any) {
    var inputEl = <HTMLInputElement>document.getElementById('description');
    if (event.target.value.length > 0) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }


  title = 'Task List';

}

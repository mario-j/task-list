import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TaskItem } from './models/taskItem.model';
import { TaskItemsService } from './services/taskItems.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { EditTaskItemDialogComponent } from './edit-task-item-dialog/edit-task-item-dialog.component';

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
  description = '';
  isValid = false;

  ngOnInit() {
    this.getTaskItems();
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
      });
  }

  deleteTaskItem(taskItem: TaskItem) {
    this.taskItemsService.deleteTaskItem(taskItem).subscribe(taskItem => this.openSnackBar('Item deleted successfully', 'Cancel'));
    this.getTaskItems();
  }

  editTaskItem(taskItem: TaskItem) {
    const dialogRef = this.dialog.open(EditTaskItemDialogComponent, {
      width: 'max(30vw, 300px)',
      data: {id: taskItem.id, description: taskItem.description}
    });

    dialogRef.afterClosed().subscribe(taskItem => {
      console.log('The dialog was closed', taskItem);
      this.taskItemsService.updateTaskItem(taskItem).subscribe(response => this.openSnackBar('Item updated successfully', 'Cancel'));
      this.getTaskItems()
    });
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
    var description = event.target.value;
    if (description.length == 0) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }


  title = 'Task List';

}

import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TaskItem } from './models/taskItem.model';
import { TaskItemsService } from './services/taskItems.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private taskItemsService: TaskItemsService, private snackBar: MatSnackBar) { }

  taskItems: TaskItem[] = [];
  description = '';

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

  clearForm() {
    var inputEl = <HTMLInputElement>document.getElementById('description');
    inputEl.value = '';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


  title = 'Task List';

}

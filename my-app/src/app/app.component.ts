import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TaskItem } from './models/taskItem.model';
import { TaskItemsService } from './services/taskItems.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private taskItemsService: TaskItemsService) { }

  taskItems: TaskItem[] = [];
  description = '';

  ngOnInit() {
    this.getTaskItems();
  }

  createTaskItem() {
    var inputEl = <HTMLInputElement>document.getElementById('description');
    var taskItem = new TaskItem();
    taskItem.id = null;
    taskItem.description = inputEl.value;
    this.taskItemsService.createTaskItem(taskItem).subscribe(response => {
      console.log(response)
      this.getTaskItems();
    });
  }

  getTaskItems() {
      this.taskItemsService.getTaskItems().subscribe((taskItems: any) => {
        this.taskItems = taskItems;
      });
  }

  deleteTaskItem(taskItem: TaskItem) {
    this.taskItemsService.deleteTaskItem(taskItem).subscribe(taskItem => console.log(taskItem));
    this.getTaskItems();
  }


  title = 'Task List';

}

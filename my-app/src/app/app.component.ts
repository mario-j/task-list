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

  ngOnInit() {
    this.taskItemsService.getTaskItems().subscribe((taskItems: any) => {
      console.log("new", taskItems);
      this.taskItems = taskItems;
    });
  }

  title = 'Task List';

}

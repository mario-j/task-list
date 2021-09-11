import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaskItem } from '../models/taskItem.model';

@Component({
  selector: 'app-edit-task-item-dialog',
  templateUrl: './edit-task-item-dialog.component.html',
  styleUrls: ['./edit-task-item-dialog.component.css']
})
export class EditTaskItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditTaskItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
    isValid = true;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log("data", this.data);
    var inputEl = <HTMLInputElement>document.getElementById('dialogDescription');
    inputEl.value = this.data.description;
  }

  cancel() {
    this.dialogRef.close();
  }

  updateTaskItem() {
    var inputEl = <HTMLInputElement>document.getElementById('dialogDescription');
    var taskItem = new TaskItem();
    taskItem.id = this.data.id
    taskItem.description = inputEl.value;
    taskItem.isComplete = this.data.isComplete
    this.dialogRef.close(taskItem);
  }

  setIsValid(event: any) {
    var inputEl = <HTMLInputElement>document.getElementById('description');
    if (event.target.value.length > 0) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

}

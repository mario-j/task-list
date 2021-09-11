import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TaskItem } from '../models/taskItem.model';
import { catchError, retry } from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TaskItemsService {
  private taskItemsUrl = 'api/taskItems/';
  constructor(private http:HttpClient) {}

  getTaskItems(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.taskItemsUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return _throw(error);
      })
    );
  }

  createTaskItem(taskItem: TaskItem): Observable<TaskItem> {
    taskItem.id = null;
    return this.http.post<TaskItem>(this.taskItemsUrl, taskItem).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return _throw(error);
      })
    )
  }

  deleteTaskItem(taskItem: TaskItem): Observable<any> {
    const id = taskItem.id;
    return this.http.delete(this.taskItemsUrl + id);
  }

  updateTaskItem(taskItem: TaskItem): Observable<any> {
     return this.http.put(this.taskItemsUrl + taskItem.id, taskItem);
  }
}

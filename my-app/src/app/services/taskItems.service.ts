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
    console.log("est");
    return this.http.get<TaskItem[]>(this.taskItemsUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return _throw(error);
      })
    );
  }

  // get() {
  //
  //   let params = new HttpParams().set('item', item);
  //   return this.http.get('http://localhost:3000/api/search', { params: params });
  // }
}

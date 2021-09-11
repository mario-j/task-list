import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TaskItem } from '../models/taskItem.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TaskItemsService {

  constructor(private http:HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  get() {
    return this.http.get('http://localhost:3000/api/get' );
  }

  // get() {
  //
  //   let params = new HttpParams().set('item', item);
  //   return this.http.get('http://localhost:3000/api/search', { params: params });
  // }
}

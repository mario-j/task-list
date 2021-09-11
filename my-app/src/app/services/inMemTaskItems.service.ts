
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class InMemTaskItemsService implements InMemoryDbService {
  createDb() {
    let taskItems = [
      { id: 1, description: 'Unload the dishwasher' },
      { id: 2, description: 'Vacuum' },
      { id: 3, description: 'Mow' },
      { id: 4, description: 'Do laundry' }
    ];
    return {taskItems};
  }
}


import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class InMemTaskItemsService implements InMemoryDbService {
  createDb() {
    let taskItems = [
      { id: 1, description: 'Unload the dishwasher', isComplete: false },
      { id: 2, description: 'Vacuum', isComplete: false },
      { id: 3, description: 'Mow', isComplete: false },
      { id: 4, description: 'Do laundry', isComplete: false }
    ];
    return {taskItems};
  }
}

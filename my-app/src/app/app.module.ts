import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, FormsModule, NgForm, Validators, ReactiveFormsModule, FormGroup,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { TaskItemsService } from './services/taskItems.service';
import { InMemTaskItemsService } from './services/inMemTaskItems.service';

import { AppComponent } from './app.component';
import { EditTaskItemDialogComponent } from './edit-task-item-dialog/edit-task-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EditTaskItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ScrollingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(InMemTaskItemsService),
  ],
  providers: [
    TaskItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

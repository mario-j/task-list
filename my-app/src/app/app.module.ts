import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {FormControl, FormGroupDirective, FormsModule, NgForm, Validators, ReactiveFormsModule, FormGroup,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppComponent } from './app.component';
import { TaskItemsService } from './services/taskItems.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemTaskItemsService } from './services/inMemTaskItems.service';

@NgModule({
  declarations: [
    AppComponent
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
    ReactiveFormsModule,
    ScrollingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemTaskItemsService),
  ],
  providers: [
    TaskItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OneFieldFormComponent } from './components/one-field-form/one-field-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    OneFieldFormComponent,
    ProjectListItemComponent,
    TaskListItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

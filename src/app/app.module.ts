import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OneFieldFormComponent } from './components/one-field-form/one-field-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    OneFieldFormComponent,
    ProjectListItemComponent,
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

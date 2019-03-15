import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OneFieldFormComponent } from './components/one-field-form/one-field-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SplitViewComponent } from './components/pages/split-view/split-view.component';
import { CardViewComponent } from './components/pages/card-view/card-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'projects/:projectId', component: SplitViewComponent},
  {path: 'projects', component: SplitViewComponent},
  {path: 'dashboard', component: CardViewComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    OneFieldFormComponent,
    ProjectListItemComponent,
    TaskListItemComponent,
    SplitViewComponent,
    CardViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

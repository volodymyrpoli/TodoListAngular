import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OneFieldFormComponent } from './components/shared/one-field-form/one-field-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListItemComponent } from './components/shared/project-list-item/project-list-item.component';
import { TaskListItemComponent } from './components/shared/task-list-item/task-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SplitViewComponent } from './components/pages/split-view/split-view.component';
import { CardViewComponent } from './components/pages/card-view/card-view.component';
import { ProjectCardComponent } from './components/shared/project-card/project-card.component';
import { PinnedPipe } from './pipes/pinned.pipe';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'projects/:projectId', component: SplitViewComponent},
  {path: 'projects', redirectTo: 'projects/', pathMatch: 'full'},
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
    ProjectCardComponent,
    PinnedPipe,
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

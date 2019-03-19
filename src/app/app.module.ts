import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OneFieldFormComponent } from './components/shared/one-field-form/one-field-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListItemComponent } from './components/shared/project-list-item/project-list-item.component';
import { TaskListItemComponent } from './components/shared/task-list-item/task-list-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SplitViewComponent } from './components/pages/split-view/split-view.component';
import { CardViewComponent } from './components/pages/card-view/card-view.component';
import { ProjectCardComponent } from './components/shared/project-card/project-card.component';
import { PinnedPipe } from './pipes/pinned.pipe';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './components/pages/login/login.component';
import { MainContainerComponent } from './components/pages/main-container/main-container.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'work', pathMatch: 'full' },
  {
    path: 'work',
    component: MainContainerComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'projects/:projectId', component: SplitViewComponent },
      { path: 'projects', redirectTo: 'projects/', pathMatch: 'full' },
      { path: 'dashboard', component: CardViewComponent },
    ]
  },
  { path: 'login', component: LoginComponent }
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
    LoginComponent,
    MainContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

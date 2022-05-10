import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './project2-users/components/main/main.component';
import { UsersComponent } from './project2-users/components/users/users.component';
import { UserComponent } from './project2-users/components/user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


// angular materials
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserTasksComponent } from './project2-users/components/user-tasks/user-tasks.component';
import { UserTaskComponent } from './project2-users/components/user-task/user-task.component';
import { UserPostsComponent } from './project2-users/components/user-posts/user-posts.component';
import { UserPostComponent } from './project2-users/components/user-post/user-post.component';
import { AddUserComponent } from './project2-users/components/add-user/add-user.component';
import { AddTaskComponent } from './project2-users/components/add-task/add-task.component';
import { AddPostComponent } from './project2-users/components/add-post/add-post.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    UserComponent,
    UserTasksComponent,
    UserTaskComponent,
    UserPostsComponent,
    UserPostComponent,
    AddUserComponent,
    AddTaskComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    // angular materials
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

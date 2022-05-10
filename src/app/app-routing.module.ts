import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './project2-users/components/add-post/add-post.component';
import { AddTaskComponent } from './project2-users/components/add-task/add-task.component';
import { AddUserComponent } from './project2-users/components/add-user/add-user.component';
import { UserPostsComponent } from './project2-users/components/user-posts/user-posts.component';
import { UserTasksComponent } from './project2-users/components/user-tasks/user-tasks.component';
import { UsersComponent } from './project2-users/components/users/users.component';

const routes: Routes = [{path : '', component : UsersComponent,
                              children : 
                              [
                                {path : 'add-user', component : AddUserComponent, outlet : 'tasks'},
                                {path : 'tasks/:_id', component : UserTasksComponent, outlet : 'tasks'},
                                {path : 'add-task/:_id', component : AddTaskComponent, outlet : 'tasks'},
                                {path : 'posts/:_id', component : UserPostsComponent, outlet : 'posts'},
                                {path : 'add-post', component : AddPostComponent, outlet : 'posts'}
                              ]
                       }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../classes/task';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {

  constructor(private srvHttpUsers : HttpUsersService, private router : Router) { }

  sub : Subscription = new Subscription();

  @Input()
  taskData : Task = {_id : '', title : '', completed : false};

  @Input()
  userFromTasks : User = {
                      _id : '',
                      id : 0,
                      name : '',
                      email : '',
                      address : {city : '', street : '', zipcode : 0},
                      posts : [],
                      tasks : [],
                      isSelected : false
                    };

  ngOnInit(): void { 
  }

  update()
  {
    let wantedTask = this.userFromTasks.tasks.find(x => x._id == this.taskData._id);
    if(wantedTask != null)
    {
      wantedTask.completed = true;
      let taskIndex = this.userFromTasks.tasks.findIndex(x => x._id == wantedTask?._id);
      this.userFromTasks.tasks.splice(taskIndex,1,wantedTask);

      this.sub = this.srvHttpUsers.updateUser(this.userFromTasks._id,this.userFromTasks)
        .subscribe(() => {
          this.router.navigate([{ outlets : { tasks : ['tasks',this.userFromTasks._id] } }]);
          window.location.reload();
        });
    }
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe()
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../classes/task';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private ar : ActivatedRoute, 
              private router : Router, 
              private srvHttpUsers : HttpUsersService) { }

  sub : Subscription = new Subscription();

  userData : User = JSON.parse(sessionStorage['user']);
  newTask : Task = new Task('',false);

  ngOnInit(): void {  
  }

  cancel()
  {
    this.router.navigate([{ outlets : { tasks : ['tasks',this.userData._id] } }]);
  }

  add(isTitleValid : boolean | null)
  {
    if(isTitleValid)
    {
      this.userData.tasks.push(this.newTask);

      this.sub = this.srvHttpUsers.updateUser(this.userData._id,this.userData)
        .subscribe(() => { 
          alert(`New Task Added to ${this.userData.name}`);
          
        });

      this.router.navigate([{ outlets : { tasks : ['tasks',this.userData._id] } }]);
    }
    else
    {
      // 
    }
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

}

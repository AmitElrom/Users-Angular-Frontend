import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../classes/task';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {

  constructor(private router : Router ,private srvHttpUsers : HttpUsersService, private ar : ActivatedRoute) { }

  sub : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();

  tasks : Task[] = [];
  user_id : string = '';
  userData : User = {
                      _id : '',
                      id : 0,
                      name : '',
                      email : '',
                      address : {city : '', street : '', zipcode : 0},
                      posts : [],
                      tasks : [],
                      isSelected : false
                    };

  ngOnInit(): void 
  {
    this.sub = this.ar.params.subscribe((params : Params) =>
    {
      this.user_id = params['_id'];
      this.sub2 = this.srvHttpUsers.getUsers()
      .subscribe((data : any) => {
        this.userData = data.find((x : any) => x._id == this.user_id);          
        this.tasks = this.userData.tasks.sort((a : any, b : any) => a.completed - b.completed);  
      })
    })
  }

  toAddTask()
  {
    this.router.navigate([{ outlets: { tasks : ['add-task',this.user_id] }}])
    sessionStorage['user'] = JSON.stringify(this.userData);
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }

}

// delete function - find another way instead of reload


import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { EventEmitter } from 'stream';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private srvHttpUsers : HttpUsersService, private router : Router) { }

  sub : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();

  @Input()
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

  areAllTasksCompleted : boolean = false;
  isOtherDataOpen : boolean = false;

  @Input()
  isSelected : boolean = false;

  ngOnInit(): void 
  {
    let task =this.userData.tasks?.find((x : any) => x.completed == false);
    if(task != null)
    {
      this.areAllTasksCompleted = false;
    }
    else
    {
      this.areAllTasksCompleted = true;
    }
  }

  update(isValid : boolean | null)
  {
    if(isValid)
    {
      this.sub = this.srvHttpUsers.updateUser(this.userData._id, this.userData)
        .subscribe((status : any) => alert(status))
    }
  }

  delete()
  {
    this.sub2 = this.srvHttpUsers.deleteUser(this.userData._id)
      .subscribe((status : any) => {
        window.location.reload();
        alert(status)
      });
  }

  @Output() notify = new EventEmitter<string>();
  showTasksAndPosts()
  {
    this.userData.isSelected = !this.userData.isSelected;
    if(this.userData.isSelected)
    {
      this.notify.emit(this.userData._id);
    }
    else
    {
      this.router.navigate([{ outlets : 
        { tasks : [], 
        posts : [] } }])
    }
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}

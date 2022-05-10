import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn, Subscription, windowToggle } from 'rxjs';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private srvHttpUser : HttpUsersService, private router : Router) { }

  sub : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();

  newUser : User = {
                      _id : '',
                      id : null,
                      name : '',
                      email : '',
                      address : {city : '', street : '', zipcode : 0},
                      posts : [],
                      tasks : [],
                      isSelected : false
                   };
  
  ngOnInit(): void {
  }

  toGeneralPage()
  {
    this.router.navigate([''])
  }

  isExistId : boolean = false;
  addUser(isValid : boolean | null)
  {
    let userIds = JSON.parse(sessionStorage.getItem('user_ids')!);  
    let userid = userIds.find((x : number) => x === this.newUser.id);   
    if(isValid)
    {
      if(userid != null)
      {
        this.isExistId = true;
      }
      else
      {
        let newUserNameArray = this.newUser.name.split(' ');
        let newUserNameArray2 =  newUserNameArray.map(x =>
          {
            return (x.charAt(0).toUpperCase() + x.substring(1));
          })
        this.newUser.name = newUserNameArray2.join(' ');
    
        this.sub = this.srvHttpUser.addUser(this.newUser)
          .subscribe((status : any) => {
            let newUserMsg = {name : this.newUser.name, isNewUserMsg : true}
            sessionStorage.setItem('new_user_msg',JSON.stringify(newUserMsg))
            window.location.reload()
          });
      }
    }
  }

  closeNoteId()
  {
    this.isExistId = false;
    this.newUser.id = null;
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }

}

import { ThisReceiver } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private srvHttpUsers : HttpUsersService, private router : Router) { }

  sub : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();
  sub3 : Subscription = new Subscription();

  users : User[] = [];
  filterdUsers : User[]= [];
  isAddUser : boolean = false;

  newUserMsg : any = {name : '', isNewUserMsg : false}

  ngOnInit(): void 
  {
    this.sub = this.srvHttpUsers.getUsers()
      .subscribe((data : any) => 
      {
        this.users = data.sort((a : User, b : any) => Number(a.id) - Number(b.id));
        this.filterdUsers = data.sort((a : any, b : any) => Number(a.id) - Number(b.id));

        let userIds : any = data.map((x : any) => x.id);
        sessionStorage.setItem('user_ids',JSON.stringify(userIds));

        let STnewUserMsg = JSON.parse(sessionStorage.getItem('new_user_msg')!);
        this.newUserMsg.name = STnewUserMsg.name;
        this.newUserMsg.isNewUserMsg = STnewUserMsg.isNewUserMsg;
      }) 
  }

  search(nameOrEmail : string)
  {
    let nameOrEmail1 = nameOrEmail.toLowerCase().trim();

    this.filterdUsers = this.users.filter(x => x.name?.toLowerCase().includes(nameOrEmail1) || x.email?.toLowerCase().includes(nameOrEmail1))
  }
  
  chooseUser(user_idFromChild : string)
  {
    this.filterdUsers.filter(x => x._id != user_idFromChild)
      .forEach(x => x.isSelected = false);

    this.router.navigate([{ outlets : 
      { tasks : ['tasks',user_idFromChild], 
      posts : ['posts',user_idFromChild] } }])
  }

  addUser()
  {
    this.filterdUsers.forEach(user => user.isSelected = false);
    this.isAddUser = true;
    this.router.navigate([{ outlets : { tasks : 'add-user', posts : [] } }]);
  }

  toUser()
  {
    this.newUserMsg.isNewUserMsg = false;
    sessionStorage.removeItem('new_user_msg');
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}

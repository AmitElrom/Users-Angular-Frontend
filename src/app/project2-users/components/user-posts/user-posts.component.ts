import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../classes/post';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  constructor(private srvHttpUsers : HttpUsersService, private ar : ActivatedRoute, private router : Router) { }

  sub : Subscription = new Subscription();
  sub2 : Subscription = new Subscription();

  posts : Post[] = [];
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
    this.sub = this.ar.params
      .subscribe((params : Params) => {
        this.user_id = params['_id'];
        this.sub2 = this.srvHttpUsers.getUsers()
          .subscribe((data : any) => {
            this.userData = data.find((x : any) => x._id == this.user_id);
            this.posts = this.userData.posts;
          })           
      })
  }

  toAddPost()
  {
    this.router.navigate([{ outlets: { posts: ['add-post'] }}]);
    sessionStorage['user'] = JSON.stringify(this.userData);
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }

}

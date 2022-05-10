import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../classes/post';
import { User } from '../../classes/user';
import { HttpUsersService } from '../../services/http-users.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private router : Router, private srvHttpUsers : HttpUsersService) { }

  sub : Subscription = new Subscription();

  userData : User = JSON.parse(sessionStorage['user']);
  newPost : Post = new Post('','');

  ngOnInit(): void {
  }

  cancel()
  {
    this.router.navigate([{ outlets : { posts : ['posts',this.userData._id] } }]);
  }

  add(isTitleValid : boolean | null)
  {
    if(isTitleValid)
    {
      this.userData.posts.push(this.newPost);

      this.sub = this.srvHttpUsers.updateUser(this.userData._id,this.userData)
        .subscribe(() => {
          this.router.navigate([{ outlets : { posts : ['posts',this.userData._id] } }]);
        })
    }
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

}

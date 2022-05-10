import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../classes/post';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {

  constructor() { }

  @Input()
  postData : Post = new Post('','','');

  ngOnInit(): void {
  }

}

import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.scss']
})
export class EditPostsComponent implements OnInit {
id: any
title!: string
body!: string
user!: any

  constructor(private postService: PostService, private act: ActivatedRoute) {
      this.id = this.act.snapshot.paramMap.get('id')
  
  }

  ngOnInit(): void {


    this.getsinglepost()
  }


  getsinglepost() {
    this.postService.getsinglePost(this.id).subscribe(data => {
    

      this.title = data.message[0][0].title
      this.body = data.message[0][0].body
      this.user = data.message[0][0].user
    })
  }



  
  

}

import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { PostService } from "src/app/services/post.service";
import { AuthService } from "src/app/services/auth.service";

import { Post } from "src/app/models/post";
import { User } from "src/app/models/user";
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { Games } from 'src/app/models/games';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  games: Games[] = []
  token: any;
   post$: Observable<Post[]> | any;
   payload: any;
  
current: Observable<User[]> | any;
  userId!: Pick<User, "id"> | any;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private gameService: GamesService,
    private router: Router
  ) {
      const tok = authService.GetToken()
        if (tok) {
          console.log(true)
        } else {
          console.log(false)
        }

  }

  deletegame(id: any) {
    this.gameService.deleteGame(id).subscribe((res: any) => {
      console.log(res)

      this.getallgames()

    }, err => {
      console.error(err)
    })
  }

  getallgames() {
    this.gameService.getGames()
    .subscribe((res: any) => {
 this.games = res

 
 
    }, err => {
       if (err) {
           this.logout()
       }
   
      console.error(err)
    })
  }

  ngOnInit(): void {

      this.getallgames()


    this.post$ = this.fetchAll();
 
 
 
 this.payload = this.authService.GetPayload()

 

}


  fetchAll(): Observable<Post[]> {
    return this.postService.fetchAll()

  }

  // getcurrentuser() {
  //   return this.authService.getloggedin(this.token).subscribe(data => {

  //         console.log(data.message[0][0].email)

  
  //   })
  // }

  createPost(): void {
    this.post$ = this.fetchAll();
  }

  logout() {
    this.authService.DeleteToken()
        

        this.router.navigateByUrl('/login')    

    
  }

  delete(postId: Pick<Post, "id"> | any): void {
    this.postService
      .deletePost(postId)
      .subscribe(() => (this.post$ = this.fetchAll()));
  }
  update(id: number) {
      this.router.navigateByUrl(`editpost/${id}`)
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Games } from 'src/app/models/games';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
  games: Games[] = []

  // game: Games = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   created_at: new Date()
  // }
  title!: string
  description!: string
  image!: any
  id: any
  constructor(private gameService: GamesService, private actRoute: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {

      this.id = this.actRoute.snapshot.paramMap.get('id')



    if (this.id) {
      this.gameService.getGame(this.id).subscribe((res: any) => {
          this.games = res

          this.games.forEach(i => {
              this.title = i.title
              this.description = i.description
              this.image = i.image
          })
      }, err => {
        console.error(err)
      })
    }

  }

  
  update() {

      const wew = {
     title:   this.title,
       description: this.description ,
       image:  this.image 
      }
    
    this.gameService.updateGame(this.id, wew).subscribe((res: any) => {
      console.log(res)

      this.router.navigateByUrl('/home')
    }, err => {
      console.error(err)
    })
  }

}

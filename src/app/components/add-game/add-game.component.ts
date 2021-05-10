import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Games } from 'src/app/models/games';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
game: Games = {
  id: 0,
  title: '',
  description: '',
  created_at: new Date()
}
  constructor(private router: Router, private gameService: GamesService) { }

  ngOnInit(): void {
  }

  saveGame() {
    const wew = {
      title: this.game.title,
      description: this.game.description,
      image: this.game.image

    }

    this.gameService.saveGame(wew).subscribe((res: any) => {
      console.log(res)


      setTimeout(() => {
          
      this.router.navigateByUrl('/home')
      this.game.title = ''
      this.game.description = ''
      this.game.image = ''
      }, 2500);
    }, err => {
      console.error(err)
    })
  }

}

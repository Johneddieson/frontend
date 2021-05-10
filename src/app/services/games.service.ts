import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Games } from '../models/games';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GamesService {
API_URL = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }


  getGames() {
    return this.http.get(`${this.API_URL}/games`)
  }

  getGame(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/games/${id}`)
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/games/${id}`)
  }

  saveGame(game: Games): Observable<any> {
    return this.http.post(`${this.API_URL}/games`, game)

  }

  updateGame(id: string, updateGame: Games): Observable<any> {
    return this.http.put(`${this.API_URL}/games/${id}`, updateGame)
  }

}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first, tap } from "rxjs/operators";

import { Post } from "../models/post";
import { User } from "../models/user";
import { ErrorhandlerService } from "../services/errorhandler.service";
import { Groceries } from "../models/groceries";
@Injectable({
  providedIn: 'root'
})
export class PostService {
    private gurl = 'http://localhost:3000/groceries'
  private url = "http://localhost:3000/post";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorhandlerService
  ) {}

  fetchAll(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Post[]>("fetchAll", []))
      );
  }
  getsinglePost(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`)
  }

  createPost(
    formData: Partial<Post>,
    userId: Pick<User, "id">
  ): Observable<Post> {
    return this.http
      .post<Post>(
        this.url,
        { title: formData.title, body: formData.body, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Post>("createPost"))
      );
  }
  
  post(item: Partial<Groceries>): Observable<any> {
    return this.http
      .post<Groceries>(this.gurl, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  deletePost(postId: Pick<Post, "id">): Observable<{}> {
    return this.http
      .delete<Post>(`${this.url}/${postId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Post>("deletePost"))
      );
  }

  
  fetchAllGroceries(): Observable<Groceries[]> {
    return this.http
      .get<Groceries[]>(this.gurl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched groceries")),
        catchError(
          this.errorHandlerService.handleError<Groceries[]>("fetchAll", [])
        )
      );
  }


  update(grocery: Groceries): Observable<any> {
    return this.http
      .put<Groceries>(this.gurl, grocery, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }



  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/groceries/${id}`;

    return this.http
      .delete<Groceries>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

  

}

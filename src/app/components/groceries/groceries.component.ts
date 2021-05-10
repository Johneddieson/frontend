import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Groceries } from 'src/app/models/groceries';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class GroceriesComponent implements OnInit {

  groceries$!: Observable<Groceries[]>;

  constructor(private groceryListCrudService: PostService) {}

  ngOnInit(): void {
    this.groceries$ = this.fetchAll();
  
  }

  fetchAll(): Observable<Groceries[]> {
    return this.groceryListCrudService.fetchAllGroceries();
  }

  post(groceryItem: Partial<Groceries> | string): void {
    const item = (<string>groceryItem).trim();
    if (!item) return;

    this.groceries$ = this.groceryListCrudService
      .post({ item })
      .pipe(tap(() => (this.groceries$ = this.fetchAll())));
  }

  update(id: number, newItem: Partial<Groceries> | string): void {
    const item = (<string>newItem).trim();
    
    if (!item) return;

    const newGrocery: Groceries = {
      id,
      item,
     
    };

    this.groceries$ = this.groceryListCrudService
      .update(newGrocery)
      .pipe(tap(() => (this.groceries$ = this.fetchAll())));
  }

  delete(id: number): void {
    this.groceries$ = this.groceryListCrudService
      .delete(id)
      .pipe(tap(() => (this.groceries$ = this.fetchAll())));
  }
}

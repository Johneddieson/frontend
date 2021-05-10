import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";

import { first } from "rxjs/operators";

import { Post } from 'src/app/models/post';

import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
 // @ViewChild("formDirective", {static: false})
  formDirective!: NgForm;
  token: any
  @Output() create: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
 
 
 
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      body: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit(formData: Pick<Post, "title" | "body"> | any): void {
      this.token = this.authService.GetPayload()
    this.postService
      .createPost(formData, this.token.id)
      .pipe(first())
      .subscribe(() => {
  
              this.create.emit(null);
      }, err => {
        console.log(err)
      })
    this.form.reset();
  }
}
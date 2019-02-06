import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../../posts/post.model';

@Component({
    selector: 'app-CreatePost',
    templateUrl: './CreatePost.component.html',
    styleUrls: ['./CreatePost.component.css']
})
export class CreatePostComponent {
    // Two way binding
    infoTitle = '';
    infoBody = '';
    @Output() infoCreated = new EventEmitter<Post>();

    addPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const post: Post = {
            title: form.value.infoTitle, 
            content: form.value.infoBody
        };
        this.infoCreated.emit(post);
    }
}
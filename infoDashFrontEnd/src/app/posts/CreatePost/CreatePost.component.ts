import { Component, EventEmitter, Output } from '@angular/core';
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

    addPost() {
        const post: Post = {
            title: this.infoTitle, 
            content: this.infoBody
        };
        this.infoCreated.emit(post);
    }
}
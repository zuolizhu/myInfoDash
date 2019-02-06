import { Component } from '@angular/core';

@Component({
    selector: 'app-CreatePost',
    templateUrl: './CreatePost.component.html'
})
export class CreatePostComponent {
    newPost = '';

    // Two way binding
    postInput = '';
    
    addPost() {
        this.newPost = this.postInput;
    }
}
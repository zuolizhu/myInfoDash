import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../../posts/post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-CreatePost',
    templateUrl: './CreatePost.component.html',
    styleUrls: ['./CreatePost.component.css']
})
export class CreatePostComponent {
    // Two way binding
    infoTitle = '';
    infoBody = '';

    constructor(public postsService: PostsService) {}

    addPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const post: Post = {
            title: form.value.infoTitle, 
            content: form.value.infoBody
        };
        this.postsService.addPost(post);
    }
}
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../../posts/post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-CreatePost',
    templateUrl: './CreatePost.component.html',
    styleUrls: ['./CreatePost.component.css']
})
export class CreatePostComponent implements OnInit {
    // Two way binding
    infoTitle = '';
    infoBody = '';
    post: Post;
    private MODE = 'create';
    private postId: string;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.MODE = 'edit';
                this.postId = paramMap.get('postId');
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.post = {id: postData._id, title: postData.title, content: postData.content};
                });
            } else {
                this.MODE = 'create';
                this.postId = null;
            }
        });
    }

    addPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const post: Post = {
            id: null,
            title: form.value.infoTitle, 
            content: form.value.infoBody
        };
        if (this.MODE === 'create') {
            this.postsService.addPost(post);
        } else {
            post.id = this.postId;
            console.log('Post id value: ' + post.id);
            this.postsService.updatePost(post);
        }
        
        form.resetForm();
    }
}
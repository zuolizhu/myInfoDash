import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../../posts/post.model';
import { PostsService } from '../posts.service';
@Component({
    selector: 'app-ListPost',
    templateUrl: './ListPost.component.html',
    styleUrls: ['./ListPost.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    private postsSubscription: Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.posts = this.postsService.getPosts();
        this.postsSubscription = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

    ngOnDestroy() {
        this.postsSubscription.unsubscribe();
    }
}
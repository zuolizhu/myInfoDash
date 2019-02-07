import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();


    constructor(private http: HttpClient) {}

    getPosts() {
        // Copy the content of the original array
        this.http.get<{message: string, posts: any}>(
            'http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    // Convert _id to id
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content
                    };
                });
            }))
            .subscribe(convertedPosts => {
                this.posts = convertedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((resData) => {
            // Update the id while creating the post
            const id = resData.postId;
            post.id = id;

            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }

    removePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        })
    }
}
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
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
        .subscribe((resData) => {
            console.log(resData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }
}
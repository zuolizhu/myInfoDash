import { Component, Input } from '@angular/core';
import { Post } from '../../posts/post.model';
@Component({
    selector: 'app-ListPost',
    templateUrl: './ListPost.component.html',
    styleUrls: ['./ListPost.component.css']
})
export class ListPostComponent {

    @Input() posts: Post[] = [];
}
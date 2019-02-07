import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './posts/ListPost/ListPost.component';
import { CreatePostComponent } from './posts/CreatePost/CreatePost.component';

const routes: Routes = [
    { path: '', component: ListPostComponent },
    { path: 'create', component: CreatePostComponent},
    { path: 'edit/:postId', component: CreatePostComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
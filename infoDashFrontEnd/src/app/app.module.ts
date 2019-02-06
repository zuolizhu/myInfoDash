import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatInputModule, 
  MatCardModule, 
  MatButtonModule, 
  MatToolbarModule, 
  MatExpansionModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CreatePostComponent } from './posts/CreatePost/CreatePost.component';
import { HeaderComponent } from './header/header.component';
import { ListPostComponent } from './posts/ListPost/ListPost.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    HeaderComponent,
    ListPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

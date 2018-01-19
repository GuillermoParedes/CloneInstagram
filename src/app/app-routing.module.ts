import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { FollowingComponent } from "./following/following.component";
import { FavoritiesComponent } from "./favorities/favorities.component";
import { MyPostsComponent } from "./my-posts/my-posts.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { RouteGuard } from "./auth/route-guard";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'allposts', component: AllPostsComponent, canActivate:[RouteGuard] },
  { path: 'following', component: FollowingComponent, canActivate:[RouteGuard]  },
  { path: 'favorities', component: FavoritiesComponent, canActivate:[RouteGuard]  },
  { path: 'myposts', component: MyPostsComponent, canActivate:[RouteGuard]  },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

import { AbsoluteRoutingModule } from './../../pipes/absolute-routing/absolute-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { HomeGuard } from '../../guards/home.guard';
import { ProfileDetailModule } from '../profile/profile-detail/profile-detail.module'
import { ViewComponent } from './profile-detail/view/view.component';
import { EditComponent } from './profile-detail/edit/edit.component';


const profileRoutes: Routes = [

  { path: '', component: ViewComponent },
  {
    path: 'edit', component: EditComponent,
  },
]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    RouterModule.forChild(profileRoutes),
    CommonModule,
    ProfileDetailModule,
    AbsoluteRoutingModule,
  ]
})
export class ProfileModule { }

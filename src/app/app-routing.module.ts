import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoCreateComponent } from './videos/video-create/video-create.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { VideoReserveComponent } from './videos/video-reserve/video-reserve.component';

const routes: Routes = [
  { path: '', component: VideoListComponent},
  { path: 'reserve/:videoId', component: VideoReserveComponent},
  { path: 'create', component: VideoCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:videoId', component: VideoCreateComponent, canActivate: [AuthGuard]},
  { path: 'customers', component: CustomerListComponent},
  { path: 'createcustomer', component: CustomerCreateComponent, canActivate: [AuthGuard]},
  { path: 'editcustomer/:customerId', component: CustomerCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

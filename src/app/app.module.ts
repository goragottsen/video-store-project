import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatListModule,
  MatSelectModule,
  MatGridListModule
  } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Internal components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { LoginComponent } from './auth/login/login.component';
import { VideoCreateComponent } from './videos/video-create/video-create.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { VideoReserveComponent } from './videos/video-reserve/video-reserve.component';
import { VideoFilterPipe } from './videos/video-filter.pipe';
import { CustomerFilterPipe } from './customers/customer-filter.pipe';
import { CustomersService } from './customers/customers.service';
import { VideosService } from './videos/videos.service';
import { AuthService } from './auth/auth.service';
import { StatusFilterPipe } from './videos/status-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoListComponent,
    VideoCreateComponent,
    LoginComponent,
    ErrorComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    VideoReserveComponent,
    VideoFilterPipe,
    CustomerFilterPipe,
    StatusFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [
    CustomersService,
    VideosService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }

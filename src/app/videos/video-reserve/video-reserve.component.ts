import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { VideosService } from '../videos.service';
import { Video } from '../video.model';
import { Customer } from 'src/app/customers/customer.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CustomersService } from 'src/app/customers/customers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-reserve',
  templateUrl: './video-reserve.component.html',
  styleUrls: ['./video-reserve.component.css']
})
export class VideoReserveComponent implements OnInit {
  isLoading = false;
  private videoId: string;
  video: Video;
  customers: Customer[] = [];
  private customersSub: Subscription;
  selectedCustomer: string;
  videoStatus = 'Available';

  constructor(public videosService: VideosService, private customersService: CustomersService, public route: ActivatedRoute) { }

  ngOnInit() {
    // this.isLoading = true;
    // this.customersSub = this.customersService.getCustomerUpdatedListener()
    // .subscribe((customerData: {customers: Customer[], customerCount: number}) => {
    //   this.isLoading = false;
    //   this.customers = customerData.customers;
    // });
    this.customers = this.videosService.getCustomer();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('videoId')) {
        this.videoId = paramMap.get('videoId');
        this.isLoading = true;
        this.videosService.getVideo(this.videoId).subscribe(videoData => {
          this.isLoading = false;
          this.video = {
              id: videoData._id,
              title: videoData.title,
              runningTime: videoData.runningTime,
              genre: videoData.genre,
              rating: videoData.rating,
              director: videoData.director,
              status: videoData.status,
              imagePath: videoData.imagePath,
              customerName: videoData.customerName
            };
        });
      }
    });
  }

  getFilter(customers: Customer[]): Customer[] {
    return customers.filter( x => x.status === 'Active');
  }

  onReserveVideo(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log(this.imagePreview);
    this.isLoading = true;
    this.videoStatus = 'Unavailable';
    this.videosService.updateVideo(
      this.videoId,
      this.video.title,
      this.video.runningTime,
      this.video.genre,
      this.video.rating,
      this.video.director,
      this.videoStatus,
      this.video.imagePath,
      form.value.customerName
      );
  }
}

import { Video } from './video.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Customer } from '../customers/customer.model';
import { CustomersService } from '../customers/customers.service';

@Injectable({providedIn: 'root'})
export class VideosService {
  private videos: Video [] = [];
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();
  private videosUpdated = new Subject<{videos: Video[], videoCount: number}>();

  constructor(private http: HttpClient, private router: Router, public customerService: CustomersService) {
    this.customerService.getCustomers(0, 0);
  }

  getVideos(videosPerPage: number, currentPage: number) {
    // Template expression: allows to dynamically add values into a normal string
    const queryParams = `?pagesize=${videosPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, videos: any, maxVideos: number }>('http://localhost:3000/api/videos' + queryParams)
      .pipe(
        map(videoData => {
        return { videos: videoData.videos.map(video => {
          return {
            title: video.title,
            runningTime: video.runningTime,
            genre: video.genre,
            rating: video.rating,
            director: video.director,
            status: video.status,
            id: video._id,
            imagePath: video.imagePath,
            customerName: video.customerName
          };
        }),
        maxVideos: videoData.maxVideos
      };
    }))
    .subscribe((transformedVideosData) => {
      this.videos = transformedVideosData.videos;
      this.videosUpdated.next({
        videos: [...this.videos],
        videoCount: transformedVideosData.maxVideos});
    });
  }

  getVideoUpdateListener() {
    return this.videosUpdated.asObservable();
  }

  getVideo(id: string) {
    return this.http.get<{_id: string, title: string, runningTime: string, genre: string,
      rating: string, director: string, status: string, imagePath: string, customerName: string }>(
      'http://localhost:3000/api/videos/' + id
    );
  }

  addVideo(title: string, runningTime: string, genre: string, rating: string, director: string, status: string,
    image: File, customerName: '') {
    const videoData = new FormData();
    videoData.append('title', title);
    videoData.append('runningTime', runningTime);
    videoData.append('genre', genre);
    videoData.append('rating', rating);
    videoData.append('director', director);
    videoData.append('status', status);
    videoData.append('image', image, title); // 3rd argument = name of the img
    videoData.append('customerName', customerName);
    this.http
      .post<{message: string, video: Video}>(
        'http://localhost:3000/api/videos',
        videoData
        )
      .subscribe((responseData) => {
          this.router.navigate(['/']);
      });
  }

  updateVideo(id: string, title: string, runningTime: string, genre: string, rating: string,
    director: string, status: string, image: File | string, customerName: string) {
      let videoData: Video | FormData;
      if (typeof(image) === 'object') { // Relevant for uploading a new image
        videoData = new FormData();
        videoData.append('id', id);
        videoData.append('title', title);
        videoData.append('runningTime', runningTime);
        videoData.append('genre', genre);
        videoData.append('rating', rating);
        videoData.append('director', director);
        videoData.append('status', status);
        videoData.append('image', image, title);
      } else {
        videoData = {
          id: id,
          title: title,
          runningTime: runningTime,
          genre: genre,
          rating: rating,
          director: director,
          status: status,
          imagePath: image,
          customerName: customerName
        };
      }
        this.http.put('http://localhost:3000/api/videos/' + id, videoData)
        .subscribe(response => {
          this.router.navigate(['/']); // Navigate to dashboard
        });
    }

  deleteVideo(videoId: string) {
    return this.http.delete('http://localhost:3000/api/videos/' + videoId);
  }

  getCustomer(): Customer[] {
    return this.customers = this.customerService.getCustomerList();
  }

}

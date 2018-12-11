import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideosService} from '../videos.service';
import { Video } from '../video.model';
import { Subscription, Observable } from 'rxjs';
import { PageEvent} from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy  {

  videos: Video[] = [];
  isLoading = false;
  private vidsSub: Subscription;
  private authStatusSub: Subscription;
  adminIsAuthenticated = false;
  dataSource;
  searchText: string;
  videoStatus: string;

  // For pagination:
  totalVideos = 0;
  videosPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];


  constructor(public videosService: VideosService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.videosService.getVideos(this.videosPerPage, this.currentPage);
    this.vidsSub = this.videosService.getVideoUpdateListener()
      .subscribe((videoData: { videos: Video[], videoCount: number}) => {
        this.isLoading = false;
        this.totalVideos = videoData.videoCount;
        this.videos = videoData.videos;
      });
      this.adminIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.adminIsAuthenticated = isAuthenticated;
        });
    }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1; // pageIndex starts with 0, in backend it starts with 1
    this.videosPerPage = pageData.pageSize;
    this.videosService.getVideos(this.videosPerPage, this.currentPage);
  }

  onDelete(videoId: string) {
    this.isLoading = true;
    this.videosService.deleteVideo(videoId)
      .subscribe(() => {
        this.videosService.getVideos(this.videosPerPage, 1);
      });
  }

  ngOnDestroy() {
    this.vidsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

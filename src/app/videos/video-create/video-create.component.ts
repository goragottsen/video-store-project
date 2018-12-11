import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { VideosService } from '../videos.service';
import { Video } from '../video.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit {
  enteredTitle = '';
  enteredRunningTime = '';
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  video: Video;
  private mode = 'create';
  private videoId: string;
  selected = 'Available';

  constructor(public videosService: VideosService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      runningTime: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      genre: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      rating: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      director: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      status: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      image: new FormControl (null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('videoId')) {
        this.mode = 'edit';
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
            customerName: ''
          };
          this.form.setValue({
            title: this.video.title,
            runningTime: this.video.runningTime,
            genre: this.video.genre,
            rating: this.video.rating,
            director: this.video.director,
            status: this.video.status,
            image: this.video.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.videoId = null;
      }
    });
  }

  // Upload image handling
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // Array of files with the first one being the file user selected
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Adding new video
  onSaveVideo() {
    // Create a javascript object to store the video entry
    if (this.form.invalid) {
      return;
    }
    // console.log(this.imagePreview);
    this.isLoading = true;
    if (this.mode === 'create') {
      this.videosService.addVideo(
        this.form.value.title,
        this.form.value.runningTime,
        this.form.value.genre,
        this.form.value.rating,
        this.form.value.director,
        this.form.value.status,
        this.form.value.image,
        '');
    } else {
    this.videosService.updateVideo(
      this.videoId,
      this.form.value.title,
      this.form.value.runningTime,
      this.form.value.genre,
      this.form.value.rating,
      this.form.value.director,
      this.form.value.status,
      this.form.value.image,
      ''
      );
    }
    this.form.reset();
  }
}

import { PipeTransform, Pipe } from '@angular/core';
import { Video } from './video.model';

@Pipe({
  name: 'videoFilter'
})
export class VideoFilterPipe implements PipeTransform {
  transform (videos: Video[], searchText: string): Video[] {
    if (!videos || !searchText) {
      return videos;
    }
    return videos.filter(video =>
      video.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }
}

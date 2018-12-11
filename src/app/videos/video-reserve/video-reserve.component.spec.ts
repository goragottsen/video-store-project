import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoReserveComponent } from './video-reserve.component';

describe('VideoReserveComponent', () => {
  let component: VideoReserveComponent;
  let fixture: ComponentFixture<VideoReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

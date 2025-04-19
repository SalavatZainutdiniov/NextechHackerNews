import { TestBed } from '@angular/core/testing';

import { NewestStoriesService } from './newest-stories.service';

describe('NewestStoriesService', () => {
  let service: NewestStoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewestStoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

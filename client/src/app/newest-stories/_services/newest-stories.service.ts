import { Injectable } from '@angular/core';
import { NewestStoriesRequestDto } from '../_models/newest-stories-request-dto';
import { NewestStoriesResponseDto } from '../_models/newest-stories-response-dto';
import { StoryDto } from '../_models/story-dto';

@Injectable({
  providedIn: 'root'
})
export class NewestStoriesService {

  constructor() { }

  get(request: NewestStoriesRequestDto): NewestStoriesResponseDto{

    var stories: StoryDto[] = [];

    return {
      pageIndex: 1,
      pageSize: 20,
      totalPages: 10,
      itemsCount: 100,
      stories: stories
    };
  }
}

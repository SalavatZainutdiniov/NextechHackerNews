import { Injectable } from '@angular/core';
import { delay, Observable, of, timeout } from 'rxjs';
import { NewestStoriesRequestDto } from '../models/newest-stories-request-dto';
import { NewestStoriesResponseDto } from '../models/newest-stories-response-dto';
import { StoryDto } from '../models/story-dto';

@Injectable({
  providedIn: 'root'
})
export class NewestStoriesService {

  constructor() { }

  get(request: NewestStoriesRequestDto|null): Observable<NewestStoriesResponseDto>{

    var stories: StoryDto[] = [];

    for (let i = 0; i < 12; i++) {
      stories.push({
        id: i + 1,
        title: "Title " + i,
        url: "https:\\fake.url"
      });
    }

    return of({
      pageIndex: 1,
      pageSize: 12,
      totalPages: 10,
      totalItemsCount: 100,
      stories: stories
    }).pipe(
      delay(2000)
    );
  }
}

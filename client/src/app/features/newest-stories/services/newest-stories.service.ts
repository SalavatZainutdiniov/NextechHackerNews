import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewestStoriesRequestDto } from '../models/newest-stories-request-dto';
import { NewestStoriesResponseDto } from '../models/newest-stories-response-dto';
import { HttpClientService } from '../../../core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class NewestStoriesService {

  private httpService = inject(HttpClientService);

  constructor() { }

  get(request: NewestStoriesRequestDto): Observable<NewestStoriesResponseDto> {
    return this.httpService.get<NewestStoriesResponseDto>(`neweststories?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&searchText=${encodeURIComponent(request.searchText)}`);
  }
}

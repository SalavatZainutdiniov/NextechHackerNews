import { Component, inject, OnInit, signal } from '@angular/core';
import { NewestStoryComponent } from "../newest-story/newest-story.component";
import { StoryDto } from '../../models/story-dto';
import { NewestStoriesService } from '../../services/newest-stories.service';
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { Pagination } from '../../../../shared/models/pagination.model';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { NewestStoriesRequestDto } from '../../models/newest-stories-request-dto';
import { NewestStoriesResponseDto } from '../../models/newest-stories-response-dto';
import { delay } from 'rxjs';

@Component({
  selector: 'app-newest-stories-page',
  imports: [NewestStoryComponent, SearchBarComponent, PaginationComponent],
  templateUrl: './newest-stories-page.component.html',
  styleUrl: './newest-stories-page.component.css'
})
export class NewestStoriesPageComponent implements OnInit {
  stories: StoryDto[] = [];
  isInit = false;
  searchText: string | null = null;
  loading = signal(false);
  error: string | null = null;

  pagination!: Pagination;

  request: NewestStoriesRequestDto = {
    pageIndex: 1,
    pageSize: 12,
    searchText: ""
  };

  response: NewestStoriesResponseDto | null = null;

  private storiesService = inject(NewestStoriesService);

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.loading.set(true);
    this.error = null;
    this.response = null;
    this.searchText = null;

    this.storiesService.get(this.request)
      .pipe(
        // wait for disappear animation
        delay(400)
      )
      .subscribe({
        next: (data) => {
          this.response = data;
          this.onLoadFinished();
        },
        error: () => {
          this.onLoadError();
        }
      });
  }

  private onLoadError() {
    this.response = null;
    this.error = 'Failed to load stories';
    this.onLoadFinished();
  }

  private onLoadFinished() {
    this.loading.set(false);

    if (this.searchText != null) {
      this.searchByText();
      return;
    }

    if (this.response) {
      this.stories = this.response.stories;

      this.pagination = {
        selectedPage: this.response.pageIndex,
        totalPages: this.response.totalPages,
        pageSize: this.response.pageSize,
        totalItemsCount: this.response.totalItemsCount
      };
      
      this.isInit = true;
    }
  }

  private searchByText(): void {
    this.request.pageIndex = 1;
    this.request.searchText = this.searchText ?? "";

    this.refreshData();
  }

  onSearch(value: string) {
    this.searchText = value;

    if (this.loading()) {
      return;
    }

    this.searchByText();
  }

  onPageChanged(pageIndex: number) {

    if (this.loading()) {
      return;
    }

    this.request.pageIndex = pageIndex;

    this.refreshData();
  }
}

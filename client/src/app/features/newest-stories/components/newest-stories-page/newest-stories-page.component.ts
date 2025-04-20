import { Component, inject, OnInit, signal } from '@angular/core';
import { NewestStoryComponent } from "../newest-story/newest-story.component";
import { StoryDto } from '../../models/story-dto';
import { NewestStoriesService } from '../../services/newest-stories.service';
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { Pagination } from '../../../../shared/models/pagination.model';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { NewestStoriesRequestDto } from '../../models/newest-stories-request-dto';
import { NewestStoriesResponseDto } from '../../models/newest-stories-response-dto';
import { delay, single } from 'rxjs';

@Component({
  selector: 'app-newest-stories-page',
  imports: [NewestStoryComponent, SearchBarComponent, PaginationComponent],
  templateUrl: './newest-stories-page.component.html',
  styleUrl: './newest-stories-page.component.css'
})
export class NewestStoriesPageComponent implements OnInit {

  readonly PAGE_SIZE: number = 12;

  animationWaitDelayMs: number = 400;

  stories: StoryDto[] = [];
  loading = signal(false);
  error = signal<string | null>(null);

  isInit = false;
  searchText: string | null = null;
  response: NewestStoriesResponseDto | null = null;

  pagination = signal<Pagination | null>(null);

  request: NewestStoriesRequestDto = {
    pageIndex: 1,
    pageSize: this.PAGE_SIZE,
    searchText: ""
  };

  private storiesService = inject(NewestStoriesService);

  ngOnInit(): void {
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

  private refreshData() {
    this.loading.set(true);
    this.error.set(null);

    this.response = null;
    this.searchText = null;

    this.storiesService.get(this.request)
      .pipe(
        // wait for the animation to disappear
        delay(this.animationWaitDelayMs)
      )
      .subscribe({
        next: (data) => {
          this.response = data;
          this.handleSuccess();
        },
        error: () => {
          this.handleError();
        }
      });
  }

  private handleError() {
    this.response = null;

    this.error.set("Failed to load stories");
    this.loading.set(false);
  }

  private handleSuccess() {
    this.loading.set(false);

    if (this.searchText != null) {
      this.searchByText();
      return;
    }

    if (this.response) {
      this.stories = this.response.stories;

      this.pagination.set({
        selectedPage: this.response.pageIndex,
        totalPages: this.response.totalPages,
        pageSize: this.response.pageSize,
        totalItemsCount: this.response.totalItemsCount
      });

      this.isInit = true;
    }
  }

  private searchByText(): void {
    this.request.pageIndex = 1;
    this.request.searchText = this.searchText ?? "";

    this.refreshData();
  }
}

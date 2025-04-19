import { Component, inject, OnInit } from '@angular/core';
import { NewestStoryComponent } from "../newest-story/newest-story.component";
import { StoryDto } from '../../models/story-dto';
import { NewestStoriesService } from '../../services/newest-stories.service';
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { Pagination } from '../../../../shared/models/pagination.model';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-newest-stories-page',
  imports: [NewestStoryComponent, SearchBarComponent, PaginationComponent],
  templateUrl: './newest-stories-page.component.html',
  styleUrl: './newest-stories-page.component.css'
})
export class NewestStoriesPageComponent implements OnInit {
  stories: StoryDto[] = [];
  loading = true;
  error: string | null = null;

  pagination!: Pagination;

  private storiesService = inject(NewestStoriesService);

  ngOnInit(): void {
    this.storiesService.get(null).subscribe({
      next: (data) => {
        this.stories = data.stories;
        this.pagination= {
          selectedPage: data.pageIndex,
          totalPages: data.totalPages,
          pageSize: data.pageSize,
          totalItemsCount: data.totalItemsCount
        };

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load stories';
        this.loading = false;
      }
    });
  }

  onSearch(value: string) {
    console.log('Search:', value);
  }
}

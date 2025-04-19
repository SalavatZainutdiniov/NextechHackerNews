import { Component, inject } from '@angular/core';
import { NewestStoryComponent } from "../newest-story/newest-story.component";
import { StoryDto } from '../../models/story-dto';
import { NewestStoriesService } from '../../services/newest-stories.service';
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-newest-stories-page',
  imports: [NewestStoryComponent, SearchBarComponent],
  templateUrl: './newest-stories-page.component.html',
  styleUrl: './newest-stories-page.component.css'
})
export class NewestStoriesPageComponent {
  stories: StoryDto[] = [];
  loading = true;
  error: string | null = null;

  private storiesService = inject(NewestStoriesService);

  ngOnInit(): void {
    this.storiesService.get(null).subscribe({
      next: (data) => {
        this.stories = data.stories;
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

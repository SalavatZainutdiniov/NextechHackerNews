import { Component, Input } from '@angular/core';
import { StoryDto } from '../../models/story-dto';

@Component({
  selector: 'app-newest-story',
  imports: [],
  templateUrl: './newest-story.component.html',
  styleUrl: './newest-story.component.css'
})
export class NewestStoryComponent {
  @Input() story!: StoryDto;
}

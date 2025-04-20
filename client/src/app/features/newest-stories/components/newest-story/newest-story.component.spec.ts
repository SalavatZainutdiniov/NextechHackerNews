import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewestStoryComponent } from './newest-story.component';

describe('StoryCardComponent', () => {
    let component: NewestStoryComponent;
    let fixture: ComponentFixture<NewestStoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewestStoryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NewestStoryComponent);
        component = fixture.componentInstance;
    });

    it('should display title and url', () => {
        component.story = {
            id: 1,
            title: 'Test Title',
            url: 'https://example.com'
        };
        fixture.detectChanges();

        const titleEl = fixture.debugElement.query(By.css('.story-card-header')).nativeElement;
        const linkEl = fixture.debugElement.query(By.css('.story-card-url')).nativeElement;

        expect(titleEl.innerHTML).toContain('Test Title');
        expect(linkEl.getAttribute('href')).toBe('https://example.com');
    });

    it('should display title only when URL is empty', () => {
        component.story = {
            id: 1,
            title: 'Test Title',
            url: ''
        };
        fixture.detectChanges();

        const titleEl = fixture.debugElement.query(By.css('.story-card-header')).nativeElement;
        const linkEl = fixture.debugElement.query(By.css('.story-card-url'));

        expect(titleEl.innerHTML).toContain('Test Title');
        expect(linkEl).toBeNull();
    });
});
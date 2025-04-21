import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NewestStoriesPageComponent } from './newest-stories-page.component';
import { NewestStoriesService } from '../../services/newest-stories.service';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { By } from '@angular/platform-browser';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';

describe('NewestStoriesPageComponent', () => {
    let component: NewestStoriesPageComponent;
    let fixture: ComponentFixture<NewestStoriesPageComponent>;
    let mockService: jest.Mocked<NewestStoriesService>;

    beforeEach(() => {
        // Create Jest mock function
        mockService = {
            get: jest.fn()
        } as any;

        TestBed.configureTestingModule({
            providers: [
                { provide: NewestStoriesService, useValue: mockService }
            ]
        });

        fixture = TestBed.createComponent(NewestStoriesPageComponent);
        component = fixture.componentInstance;

        component.animationWaitDelayMs = 0;
    });

    it('should load stories on init', fakeAsync(() => {
        const mockResponse = {
            pageIndex: 1,
            pageSize: 12,
            totalPages: 1,
            totalItemsCount: 1,
            stories: [{ id: 1, title: 'Story', url: 'http://test.com' }]
        };

        mockService.get.mockReturnValue(of(mockResponse).pipe(delay(5)));

        component.ngOnInit();
        expect(component.loading()).toBe(true);

        tick(10);

        expect(component.stories.length).toBe(1);
        expect(component.loading()).toBe(false);
        expect(component.pagination()?.totalPages).toBe(1);
    }));

    it('should handle error from service', fakeAsync(() => {
        mockService.get.mockReturnValue(throwError(() => new Error('error')).pipe(delay(5)));

        component.ngOnInit();
        tick(10);

        expect(component.error()).toBe('Failed to load stories');
        expect(component.loading()).toBe(false);
    }));

    it('should update page index and refresh on page change', fakeAsync(() => {
        const mockResponse = {
            pageIndex: 2,
            pageSize: 12,
            totalPages: 3,
            totalItemsCount: 36,
            stories: [{ id: 99, title: 'New Page', url: 'https://story.com' }]
        };

        mockService.get.mockReturnValue(of(mockResponse).pipe(delay(5)));

        component.onPageChanged(2);
        tick(10);

        expect(component.request.pageIndex).toBe(2);
        expect(component.stories[0].id).toBe(99);
    }));

    it('should trigger search and reset page index', fakeAsync(() => {
        const mockResponse = {
            pageIndex: 1,
            pageSize: 12,
            totalPages: 1,
            totalItemsCount: 1,
            stories: [{ id: 2, title: 'Search Result', url: 'https://story.com' }]
        };

        mockService.get.mockReturnValue(of(mockResponse).pipe(delay(5)));

        const searchBarComponent: SearchBarComponent = fixture.debugElement.query(By.directive(SearchBarComponent)).componentInstance;

        searchBarComponent.search.emit('Angular');
        tick(10);

        expect(component.request.searchText).toBe('Angular');
        expect(component.stories[0].title).toBe('Search Result');
    }));
});
import { TestBed } from '@angular/core/testing';
import { NewestStoriesService } from './newest-stories.service';
import { of } from 'rxjs';
import { HttpClientService } from '../../../core/services/http-client.service';
import { NewestStoriesRequestDto } from '../models/newest-stories-request-dto';
import { NewestStoriesResponseDto } from '../models/newest-stories-response-dto';

describe('NewestStoriesService', () => {
    let service: NewestStoriesService;
    let mockHttpClientService: { get: jest.Mock };

    beforeEach(() => {
        mockHttpClientService = {
            get: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                NewestStoriesService,
                { provide: HttpClientService, useValue: mockHttpClientService }
            ]
        });

        service = TestBed.inject(NewestStoriesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call HttpClientService.get with the correct URL and return data', () => {
        const request: NewestStoriesRequestDto = {
            pageIndex: 1,
            pageSize: 10,
            searchText: 'test'
        };

        const mockResponse: NewestStoriesResponseDto = {
            stories: [{ id: 1, title: 'Test Story', url: 'https://example.com' }],
            pageIndex: 1,
            pageSize: 10,
            totalPages: 1,
            totalItemsCount: 1
        };

        mockHttpClientService.get.mockReturnValue(of(mockResponse));

        service.get(request).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const expectedUrl = `neweststories?pageIndex=1&pageSize=10&searchText=test`;

        expect(mockHttpClientService.get).toHaveBeenCalledWith(expectedUrl);
    });
});
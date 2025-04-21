import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

describe('HttpClientService', () => {
    let service: HttpClientService;
    let mockHttpClient: jest.Mocked<HttpClient>;

    beforeEach(() => {
        mockHttpClient = {
            get: jest.fn(),
        } as any;

        TestBed.configureTestingModule({
            providers: [
                HttpClientService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        });

        service = TestBed.inject(HttpClientService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create expected url', () => {
        const url = service.createUrl('items/1');
        expect(url).toBe(environment.apiUrl + 'items/1');
    });

    it('should make GET request and return expected data', () => {
        const mockData = { id: 1, name: 'Test Item' };

        mockHttpClient.get.mockReturnValue(of(mockData));

        service.get<{ id: number; name: string }>('items/1').subscribe(data => {
            expect(data).toEqual(mockData);
        });

        expect(mockHttpClient.get).toHaveBeenCalledWith(service.createUrl('items/1'));
    });
});
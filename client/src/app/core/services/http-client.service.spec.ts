import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
    let service: HttpClientService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpClientService]
        });

        service = TestBed.inject(HttpClientService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // ensure no outstanding requests
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make GET request and return expected data', () => {
        const mockData = { id: 1, name: 'Test Item' };

        service.get<{ id: number; name: string }>('items/1').subscribe(data => {
            expect(data).toEqual(mockData);
        });


        const req = httpMock.expectOne(service.createUrl('items/1'));
        expect(req.request.method).toBe('GET');
        req.flush(mockData); // send fake response
    });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly calculate item indices', () => {
    component.pagination = {
      selectedPage: 2,
      pageSize: 10,
      totalItemsCount: 45,
      totalPages: 5,
    };

    component.ngOnChanges({
      pagination: {
        currentValue: component.pagination,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.startItemIndex).toBe(11);
    expect(component.endItemIndex).toBe(20);
  });

  it('should correctly calculate pages when selectedPage < SHOW_PAGES_COUNT', () => {
    component.pagination = {
      selectedPage: 2,
      pageSize: 10,
      totalItemsCount: 100,
      totalPages: 10,
    };

    component.ngOnChanges({
      pagination: {
        currentValue: component.pagination,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.pageFrom).toBe(1);
    expect(component.pageTo).toBe(6);
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should correctly calculate pages when selectedPage >= SHOW_PAGES_COUNT', () => {
    component.pagination = {
      selectedPage: 6,
      pageSize: 10,
      totalItemsCount: 100,
      totalPages: 10,
    };

    component.ngOnChanges({
      pagination: {
        currentValue: component.pagination,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.pageFrom).toBe(4);
    expect(component.pageTo).toBe(9);
    expect(component.pages).toEqual([4, 5, 6, 7, 8]);
  });
});
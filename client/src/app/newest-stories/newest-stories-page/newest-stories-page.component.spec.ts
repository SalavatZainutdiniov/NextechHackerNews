import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestStoriesPageComponent } from './newest-stories-page.component';

describe('NewestStoriesPageComponent', () => {
  let component: NewestStoriesPageComponent;
  let fixture: ComponentFixture<NewestStoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewestStoriesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestStoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

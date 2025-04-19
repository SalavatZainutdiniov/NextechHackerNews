import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestStoryComponent } from './newest-story.component';

describe('NewestStoryComponent', () => {
  let component: NewestStoryComponent;
  let fixture: ComponentFixture<NewestStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewestStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

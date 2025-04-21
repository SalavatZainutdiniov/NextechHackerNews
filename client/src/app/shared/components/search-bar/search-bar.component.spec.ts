import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
    let fixture: ComponentFixture<SearchBarComponent>;
    let component: SearchBarComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SearchBarComponent, ReactiveFormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the search bar component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit search value after debounce time', fakeAsync(() => {
        const emitSpy = jest.spyOn(component.search, 'emit');

        component.searchControl.setValue('hacker');
        fixture.detectChanges();

        tick(component.debounceTimeMs());
        fixture.detectChanges();

        expect(emitSpy).toHaveBeenCalledWith('hacker');
    }));

    it('should emit only distinct values', fakeAsync(() => {
        const emitSpy = jest.spyOn(component.search, 'emit');

        component.searchControl.setValue('angular');
        tick(component.debounceTimeMs());
        fixture.detectChanges();

        component.searchControl.setValue('angular');
        tick(component.debounceTimeMs());
        fixture.detectChanges();

        expect(emitSpy).toHaveBeenCalledTimes(1);
    }));
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({ standalone: true, template: '' })
class DummyHotNewsComponent { }

@Component({ standalone: true, template: '' })
class DummyContactComponent { }

const routes: Routes = [
    { path: '', component: DummyHotNewsComponent },
    { path: 'newest-stories', component: DummyHotNewsComponent },
    { path: 'contact', component: DummyContactComponent }
];

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [provideRouter(routes)]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        fixture.detectChanges();
    });

    it('should create the header', () => {
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should render "Hacker News" logo', () => {
        const logo = fixture.debugElement.query(By.css('.header-logo'));
        expect(logo.nativeElement.textContent).toContain('Hacker News');
    });

    it('should contain link to newest-stories', () => {
        const links = fixture.debugElement.queryAll(By.css('.header-link'));
        const hotNewsLink = links.find(link => link.nativeElement.textContent.includes('Hot news'));
        expect(hotNewsLink?.nativeElement.getAttribute('ng-reflect-router-link')).toContain('newest-stories');
    });
});
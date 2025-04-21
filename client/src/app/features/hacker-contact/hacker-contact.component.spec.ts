import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HackerContactComponent } from './hacker-contact.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('HackerContactComponent', () => {
  let component: HackerContactComponent;
  let fixture: ComponentFixture<HackerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, HackerContactComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    global.alert = jest.fn();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show encryption error when email does not contain "encrypt"', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));

    emailInput.nativeElement.value = 'test@example.com';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.onSubmit();

    expect(component.showEncryptionError).toBeTruthy();
  });

  it('should not show encryption error when email contains "encrypt"', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));

    emailInput.nativeElement.value = 'encrypt@domain.com';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.onSubmit();

    expect(component.showEncryptionError).toBeFalsy();
  });

  it('should reset the form and show an alert when email contains "encrypt"', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const messageInput = fixture.debugElement.query(By.css('textarea[formControlName="message"]'));

    const spyAlert = jest.spyOn(window, 'alert');

    emailInput.nativeElement.value = 'encrypt@domain.com';
    messageInput.nativeElement.value = 'Hello, agent!';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    messageInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.onSubmit();

    expect(spyAlert).toHaveBeenCalledWith('📡 Packet sent to the darknet. Stay stealthy, agent.');

    expect(component.contactForm.value.alias).toBeNull();
    expect(component.contactForm.value.email).toBeNull();
    expect(component.contactForm.value.message).toBeNull();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HackerContactComponent } from './hacker-contact.component'; // Make sure to import the standalone component
import { CommonModule } from '@angular/common'; // Import CommonModule as needed
import { By } from '@angular/platform-browser';

describe('HackerContactComponent', () => {
  let component: HackerContactComponent;
  let fixture: ComponentFixture<HackerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, HackerContactComponent], // Import the standalone component
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show encryption error when email does not contain "encrypt"', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));

    emailInput.nativeElement.value = 'test@example.com';
    emailInput.nativeElement.dispatchEvent(new Event('input')); // Simulate user input
    fixture.detectChanges(); // Trigger change detection

    component.onSubmit();

    // Check if the error condition is set
    expect(component.showEncryptionError).toBeTrue();
  });

  it('should not show encryption error when email contains "encrypt"', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));

    emailInput.nativeElement.value = 'encrypt@domain.com';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.onSubmit();

    expect(component.showEncryptionError).toBeFalse();
  });

  it('should reset the form and show an alert when email contains "encrypt"', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const messageInput = fixture.debugElement.query(By.css('textarea[formControlName="message"]'));
    const spyAlert = spyOn(window, 'alert');

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
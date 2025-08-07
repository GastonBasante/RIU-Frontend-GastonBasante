import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  template: `<input [formControl]="control" appUppercase />`,
  standalone: true,
  imports: [ReactiveFormsModule, UppercaseDirective],
})
class TestComponent {
  control = new FormControl('');
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(inputEl).toBeTruthy();
  });

  it('should convert input to uppercase on input event', () => {
    inputEl.value = 'superman';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('SUPERMAN');
  });

  it('should not emit event when updating the control programmatically', () => {
    const testInstance = fixture.componentInstance;
    const spy = jasmine.createSpy('valueChanges');

    testInstance.control.valueChanges.subscribe(spy);
    testInstance.control.setValue('test', { emitEvent: false });
    expect(spy).not.toHaveBeenCalled();
  });
});

import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  private control = inject(NgControl);

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const upper = value.toUpperCase();
    this.control.control?.setValue(upper, { emitEvent: false });
  }
}
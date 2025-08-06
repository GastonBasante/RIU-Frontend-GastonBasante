import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hero-filter',
  standalone: true,
  imports: [],
  templateUrl: './hero-filter.component.html',
  styleUrl: './hero-filter.component.scss'
})
export class HeroFilterComponent {
  @Output() filterOutput = new EventEmitter<string>();

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterOutput.emit(value);
  }
}
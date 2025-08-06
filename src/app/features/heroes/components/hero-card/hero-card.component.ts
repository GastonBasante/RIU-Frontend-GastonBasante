import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {

@Input() hero!: Hero;
  @Output() edit = new EventEmitter<Hero>();
  @Output() delete = new EventEmitter<Hero>();

  onEdit() {
    this.edit.emit(this.hero);
  }

  onDelete() {
    this.delete.emit(this.hero);
  }
}

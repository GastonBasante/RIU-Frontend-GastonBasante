import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HeroListComponent } from '../components/hero-list/hero-list.component';
import { HeroFilterComponent } from "../components/hero-filter/hero-filter.component";
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.model';
import { Observable } from 'rxjs';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [HeroListComponent, HeroFilterComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  heroService = inject(HeroService)
  heroesSignal: WritableSignal<Hero[]> = signal<Hero[]>([]);
  ngOnInit() {
  this.heroService.getAll().subscribe(heroes => this.heroesSignal.set(heroes));
}
onFilter(term: string) {
  this.heroService.searchByName(term).subscribe(heroes => this.heroesSignal.set(heroes));
}
}

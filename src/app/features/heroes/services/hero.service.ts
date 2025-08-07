import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { MOCK_HEROES } from '../../../../mock/data-heroes-response';
import { Hero } from '../models/hero.model';



@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesSubject = new BehaviorSubject<Hero[]>(MOCK_HEROES);

  get heroes$(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  getAll(): Observable<Hero[]> {
    return this.heroes$.pipe(delay(300)); 
  }

  getById(id: number): Observable<Hero | undefined> {
    return this.getAll().pipe(map(heroes => heroes.find(h => h.id === id)));
  }

  searchByName(term: string): Observable<Hero[]> {
    const lowerTerm = term.toLowerCase();
    return this.getAll().pipe(
      map(heroes =>
        heroes.filter(hero => hero.name.toLowerCase().includes(lowerTerm))
      )
    );
  }
  filterHeroes(term: string) {
    const all = this.heroesSubject.value;
    const filtered = all.filter((h: Hero) =>
      h.name.toLowerCase().includes(term.toLowerCase())
    );
    this.heroesSubject.next(filtered);
  }
  create(hero: Omit<Hero, 'id'>): Observable<Hero> {
    const newHero: Hero = { id: Math.floor(Math.random() * 1000000), ...hero };
    const current = this.heroesSubject.value;
    this.heroesSubject.next([newHero, ...current]);
    return of(newHero).pipe(delay(300));
  }

  update(updatedHero: Hero): Observable<Hero | null> {
    const heroes = this.heroesSubject.value;
    const index = heroes.findIndex(h => h.id === updatedHero.id);

    if (index === -1) return of(null);
    const updated = [...heroes];
    updated[index] = updatedHero;

    this.heroesSubject.next(updated);
    return of(updatedHero).pipe(delay(300));
  }

  delete(id: number): Observable<boolean> {
    const filtered = this.heroesSubject.value.filter(h => h.id !== id);
    const changed = filtered.length !== this.heroesSubject.value.length;
    this.heroesSubject.next(filtered);
    return of(changed).pipe(delay(300));
  }
}

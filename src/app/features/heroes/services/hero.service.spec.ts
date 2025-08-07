import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MOCK_HEROES } from '../../../../mock/data-heroes-response';
import { Hero } from '../models/hero.model';
import { take } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes', (done) => {
    service.getAll().pipe(take(1)).subscribe((heroes) => {
      expect(heroes.length).toBe(MOCK_HEROES.length);
      done();
    });
  });

  it('should return a hero by ID', (done) => {
    const hero = MOCK_HEROES[0];
    service.getById(hero.id).pipe(take(1)).subscribe((found) => {
      expect(found).toEqual(hero);
      done();
    });
  });



  it('should filter heroes by name ', (done) => {
    const term = MOCK_HEROES[0].name.slice(0, 3); 
    service.searchByName(term).pipe(take(1)).subscribe((results) => {
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name.toLowerCase()).toContain(term.toLowerCase());
      done();
    });
  });



  it('should create a new hero', (done) => {
    const newHero: Omit<Hero, 'id'> = {
      name: 'New Hero',
      power: 'Speed',
      universe: 'DC',
      creator: 'Test',
      age: 30,
      comicCreationYear: 2000,
      romanticInterest: 'None',
      weakness: 'Kryptonite',
      picture: 'newhero'
    };

    service.create(newHero).pipe(take(1)).subscribe((created) => {
      expect(created).toBeTruthy();
      expect(created.id).toBeDefined();

      service.heroes$.pipe(take(1)).subscribe((all) => {
        expect(all.some(h => h.id === created.id)).toBeTrue();
        done();
      });
    });
  });

  it('should update an existing hero', (done) => {
    const hero = { ...MOCK_HEROES[0], name: 'Updated Name' };

    service.update(hero).pipe(take(1)).subscribe((updated) => {
      expect(updated).toBeTruthy();
      expect(updated!.name).toBe('Updated Name');

      service.heroes$.pipe(take(1)).subscribe((all) => {
        expect(all.find(h => h.id === hero.id)?.name).toBe('Updated Name');
        done();
      });
    });
  });



  it('should delete a hero', (done) => {
    const heroId = MOCK_HEROES[0].id;
    service.delete(heroId).pipe(take(1)).subscribe((deleted) => {
      expect(deleted).toBeTrue();

      service.heroes$.pipe(take(1)).subscribe((all) => {
        expect(all.find(h => h.id === heroId)).toBeUndefined();
        done();
      });
    });
  });


});

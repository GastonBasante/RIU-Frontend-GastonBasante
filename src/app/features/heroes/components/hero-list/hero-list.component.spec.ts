import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../services/hero.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service/confirm-dialog.service';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router } from '@angular/router';
import { MOCK_HEROES } from '../../../../../mock/data-heroes-response';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockDialogService: jasmine.SpyObj<ConfirmDialogService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['delete']);
    mockDialogService = jasmine.createSpyObj('ConfirmDialogService', [
      'confirm',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HeroListComponent,
        CommonModule,
        MatPaginatorModule,
        MatButtonModule,
        HeroCardComponent,
        NgxSkeletonLoaderModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: ConfirmDialogService, useValue: mockDialogService },
        { provide: Router, useValue: mockRouter },
   
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('heroesSignal', MOCK_HEROES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate heroes correctly', () => {
    const result = component.pagedHeroes();
    expect(result.length).toBe(5);
    expect(result[0].name).toBe('AQUAMAN');
  });

  it('should update page on onPageChange()', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 2, length: 6 } as any);
    const result = component.pagedHeroes();
    expect(result[0].name).toBe('BLACK PANTHER');
  });

  it('should navigate to edit hero', () => {
    const hero = MOCK_HEROES[0];
    component.onEdit(hero);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/heroes/edit', hero.id]);
  });

  it('should call confirm dialog and delete hero when confirmed', fakeAsync(() => {
    const hero = MOCK_HEROES[0];
    mockDialogService.confirm.and.returnValue(of(true));
    mockHeroService.delete.and.returnValue(of());

    component.onDelete(hero);
    tick();

    expect(mockDialogService.confirm).toHaveBeenCalled();
    expect(mockHeroService.delete).toHaveBeenCalledWith(hero.id);
  }));

  it('should NOT delete hero if not confirmed', fakeAsync(() => {
    const hero = MOCK_HEROES[0];
    mockDialogService.confirm.and.returnValue(of(false));

    component.onDelete(hero);
    tick();

    expect(mockDialogService.confirm).toHaveBeenCalled();
    expect(mockHeroService.delete).not.toHaveBeenCalled();
  }));

  it('should navigate to addHeroe()', () => {
    component.addHeroe();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/heroes/add']);
  });
});

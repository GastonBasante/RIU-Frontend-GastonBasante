import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { Hero } from '../../models/hero.model';
import { By } from '@angular/platform-browser';
import { MOCK_HEROES } from '../../../../../mock/data-heroes-response';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  const mockHero: Hero = MOCK_HEROES[1]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    component.hero = mockHero;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero image with correct src', () => {
    const imgEl: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgEl.src).toContain(`assets/media/${mockHero.picture}.jpg`);
 
  });

  it('Should emit the "edit" event when the edit button is clicked', () => {
    spyOn(component.edit, 'emit');
    const editBtn = fixture.debugElement.query(By.css('[data-testid="edit-btn"]'));
    editBtn.triggerEventHandler('click');
    expect(component.edit.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should emit "delete" event with the when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const deleteBtn = fixture.debugElement.query(By.css('[data-testid="delete-btn"]'));
    deleteBtn.triggerEventHandler('click');
    expect(component.delete.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should return correct hero image path', () => {
    const path = component.getHeroImagePath(mockHero);
    expect(path).toBe(`assets/media/${mockHero.picture}.jpg`);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
  });

  it('should set formSubmitted to true on valid submit', () => {
    component.form.setValue({
      name: 'Test Hero',
      power: 'Test Power',
      universe: 'Test Universe',
      creator: 'Test Creator',
      age: 30,
      comicCreationYear: 2000,
      romanticInterest: 'Test Interest',
      weakness: 'Test Weakness',
    });

    component.onSubmit();

    expect(component['formSubmitted']).toBeTrue();
  });

  it('should not set formSubmitted to true on invalid submit', () => {
    component.form.setValue({
      name: '',
      power: '',
      universe: '',
      creator: '',
      age: null,
      comicCreationYear: null,
      romanticInterest: '',
      weakness: '',
    });

    component.onSubmit();

    expect(component['formSubmitted']).toBeFalse();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroFormComponent } from './hero-form.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { provideLocationMocks } from '@angular/common/testing';
describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HeroFormComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => (key === 'id' ? '1' : null),
            }),

          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
  });

  it('should set formSubmitted to false', () => {
    component.form.setValue({
      name: 'Test Hero',
      power: 'Test Power',
      universe: 'Test Universe',
      creator: 'Test Creator',
      age: 30,
      picture:'hero',
      comicCreationYear: 2000,
      romanticInterest: 'Test Interest',
      weakness: 'Test Weakness',
    });

    component.onSubmit();

    expect(component['formSubmitted']).toBeFalse();
  });
});

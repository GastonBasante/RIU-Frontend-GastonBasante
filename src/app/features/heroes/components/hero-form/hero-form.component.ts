import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { filter, map, switchMap, tap } from 'rxjs';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatFormField, MatLabel,MatInputModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);
  form!: FormGroup;
  isEditMode = false;

  private heroId!: number;
  private formSubmitted = false;
  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      power: ['', Validators.required],
      universe: ['', Validators.required],
      creator: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      comicCreationYear: [null, [Validators.required, Validators.min(1900)]],
      romanticInterest: [''],
      picture: ['default-hero'],
      weakness: [''],
    });
  }
  getHeroImagePath(): string {
    const pic = this.form.get('picture')?.value;
    return `assets/media/${pic}.jpg`;
  }
private checkEditMode(): void {
  this.route.paramMap
    .pipe(
      map((params) => params.get('id')),
      tap((id) => {
        if (id) {
          this.isEditMode = true;
          this.heroId = +id;
        }
      }),
      filter((id) => !!id),
      switchMap((id) => this.heroService.getById(+id!)),
    )
    .subscribe((hero) => {
      if (hero) {
        this.form.patchValue(hero);
      }
    });
}
  goToHome() {
    this.router.navigate(['/heroes']);
  }

onSubmit(): void {
  if (this.form.invalid) return;

  const heroData = this.form.value;

  const action$ = this.isEditMode
    ? this.heroService.update({ id: this.heroId, ...heroData })
    : this.heroService.create(heroData);

  action$.subscribe(() => {
    this.form.markAsPristine();
    this.formSubmitted = true;
    this.router.navigate(['/heroes']);
  });
}


}

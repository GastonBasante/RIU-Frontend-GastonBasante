import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  signal,
} from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { CommonModule } from '@angular/common';
import { Hero } from '../../models/hero.model';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Router } from '@angular/router';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service/confirm-dialog.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroCardComponent, MatPaginatorModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent {
  heroService = inject(HeroService);
  router = inject(Router);
  confirmDialog = inject(ConfirmDialogService);

  readonly heroesSignal: InputSignal<Hero[]> = input<Hero[]>([]);

  currentPage = signal(0);
  pageSize = signal(5);

  readonly pagedHeroes = computed(() => {
    const heroes = this.heroesSignal();
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    return heroes.slice(start, end);
  });

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  onEdit(hero: Hero) {
    this.router.navigate(['/heroes/edit', hero.id]);
  }

  async onDelete(hero: Hero) {
    const data = {
      title: 'Eliminar héroe',
      message: `¿Seguro que querés borrar a ${hero.name}?`,
    };

    const confirmed = await firstValueFrom(this.confirmDialog.confirm(data));
    if (confirmed) {
      this.heroService.delete(hero.id).subscribe();
    }
  }
  addHeroe() {
    this.router.navigate(['/heroes/add']);
  }
}

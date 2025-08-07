import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogService } from '../services/confirm-dialog.service/confirm-dialog.service';


export interface CanComponentDeactivate {
  form: { dirty: boolean };
  formSubmitted: boolean;
}

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
   confirmDialog = inject(ConfirmDialogService)


  async canDeactivate(component: CanComponentDeactivate): Promise<boolean> {
    if (component.form.dirty && !component.formSubmitted) {
      const data ={
        title:'¡Cambios sin Guardar!',
        message:'¿Hay cambios sin guardar. ¿Seguro que querés salir?'
      }
      const result = await firstValueFrom(this.confirmDialog.confirm(data));
      return result;
    }
    return true;
  }
}

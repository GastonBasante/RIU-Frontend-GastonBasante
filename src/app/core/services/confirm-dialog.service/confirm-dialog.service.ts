import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog.component/confirm-dialog.component';

export interface dataDialog {
  title:string,
  message:string
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  confirm(data:dataDialog): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
     data
    });
    return dialogRef.afterClosed();
  }
}
import { TestBed } from '@angular/core/testing';
import { UnsavedChangesGuard, CanComponentDeactivate } from './unsaved-changes.guard';
import { ConfirmDialogService } from '../services/confirm-dialog.service/confirm-dialog.service';
import { of } from 'rxjs';

describe('UnsavedChangesGuard', () => {
  let guard: UnsavedChangesGuard;
  let confirmDialogServiceSpy: jasmine.SpyObj<ConfirmDialogService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ConfirmDialogService', ['confirm']);

    TestBed.configureTestingModule({
      providers: [
        UnsavedChangesGuard,
        { provide: ConfirmDialogService, useValue: spy }
      ]
    });

    guard = TestBed.inject(UnsavedChangesGuard);
    confirmDialogServiceSpy = TestBed.inject(ConfirmDialogService) as jasmine.SpyObj<ConfirmDialogService>;
  });

  it('should allow navigation if form is not dirty', async () => {
    const component: CanComponentDeactivate = {
      form: { dirty: false },
      formSubmitted: false,
    };

    const result = await guard.canDeactivate(component);
    expect(result).toBeTrue();
    expect(confirmDialogServiceSpy.confirm).not.toHaveBeenCalled();
  });

  it('should allow navigation if form is dirty but already submitted', async () => {
    const component: CanComponentDeactivate = {
      form: { dirty: true },
      formSubmitted: true,
    };

    const result = await guard.canDeactivate(component);
    expect(result).toBeTrue();
    expect(confirmDialogServiceSpy.confirm).not.toHaveBeenCalled();
  });

  it('should show confirmation dialog if form is dirty and not submitted (confirmed)', async () => {
    confirmDialogServiceSpy.confirm.and.returnValue(of(true));

    const component: CanComponentDeactivate = {
      form: { dirty: true },
      formSubmitted: false,
    };

    const result = await guard.canDeactivate(component);
    expect(confirmDialogServiceSpy.confirm).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('should show confirmation dialog if form is dirty and not submitted (cancelled)', async () => {
    confirmDialogServiceSpy.confirm.and.returnValue(of(false));

    const component: CanComponentDeactivate = {
      form: { dirty: true },
      formSubmitted: false,
    };

    const result = await guard.canDeactivate(component);
    expect(confirmDialogServiceSpy.confirm).toHaveBeenCalled();
    expect(result).toBeFalse();
  });
});

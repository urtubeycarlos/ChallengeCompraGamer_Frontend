import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackDialogComponent } from '../../../../shared/feedback-dialog/feedback-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { ChoferesService } from '../../services/choferes.service';
import { Chofer } from '../../models/chofer.model';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
    selector: 'app-update-chofer-dialog',
    standalone: true,
    templateUrl: './update-chofer-dialog.component.html',
    styleUrls: ['./update-chofer-dialog.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        MatIconModule,
        FeedbackDialogComponent,
        MatSelect,
        MatOption,
        MatSelect
    ]
})
export class UpdateChoferDialogComponent {
    choferForm: FormGroup;
    isSubmitting = false;
    showFooter = false;
    resultMessage = '';
    resultType: 'success' | 'error' = 'success';
    clasesLicencia = ['D', 'D1', 'D2', 'D3', 'E', 'E1'];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UpdateChoferDialogComponent>,
        private choferesService: ChoferesService,
        private cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: Chofer 
    ) {
        this.choferForm = this.fb.group({
            dni: [{ value: this.data.dni, disabled: true }, Validators.required],
            nombre: [this.data.nombre, Validators.required],
            apellido: [this.data.apellido, [Validators.required]],
            claseLicencia: [this.data.claseLicencia, Validators.required],
            telefono: [this.data.telefono, [Validators.required, 
                                            Validators.max(2147483647) // número menor a int32
            ]]
        });
    }

    submit(): void {
        if (this.choferForm.invalid) return;

        this.isSubmitting = true;
        this.showFooter = true;
        this.resultMessage = '';

        this.choferesService.update(this.data.dni, this.choferForm.value).subscribe({
            next: () => {
                this.resultMessage = 'Chofer creado con éxito';
                this.resultType = 'success';
                this.isSubmitting = false;
                this.cdr.detectChanges();
                this.dialogRef.close(true);
            },
            error: () => {
                this.resultMessage = 'Error al actualizar el chofer';
                this.resultType = 'error';
                this.isSubmitting = false;
                this.cdr.detectChanges();
            }
        });
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    closeFooter(): void {
        this.showFooter = false;
        this.resultMessage = '';
    }
}
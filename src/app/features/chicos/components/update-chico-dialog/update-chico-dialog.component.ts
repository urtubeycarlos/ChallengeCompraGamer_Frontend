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
import { ChicosService } from '../../services/chicos.service';
import { Chico } from '../../models/chico.model';

@Component({
    selector: 'app-update-chico-dialog',
    standalone: true,
    templateUrl: './update-chico-dialog.component.html',
    styleUrls: ['./update-chico-dialog.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        MatIconModule,
        FeedbackDialogComponent
    ]
})
export class UpdateChicoDialogComponent {
    chicoForm: FormGroup;
    isSubmitting = false;
    showFooter = false;
    resultMessage = '';
    resultType: 'success' | 'error' = 'success';

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UpdateChicoDialogComponent>,
        private chicosService: ChicosService,
        private cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: Chico 
    ) {
        this.chicoForm = this.fb.group({
            dni: [{ value: this.data.dni, disabled: true }, Validators.required],
            nombre: [this.data.nombre, Validators.required],
            apellido: [this.data.apellido, [Validators.required]]
        });
    }

    submit(): void {
        if (this.chicoForm.invalid) return;

        this.isSubmitting = true;
        this.showFooter = true;
        this.resultMessage = '';

        this.chicosService.updateChico(this.data.dni, this.chicoForm.value).subscribe({
            next: () => {
                this.resultMessage = 'Chico creado con éxito';
                this.resultType = 'success';
                this.isSubmitting = false;
                this.cdr.detectChanges();
                this.dialogRef.close(true);
            },
            error: () => {
                this.resultMessage = 'Error al crear el chico';
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
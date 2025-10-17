import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackDialogComponent } from '../../../../shared/feedback-dialog/feedback-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { ChicosService } from '../../services/chicos.service';

@Component({
    selector: 'app-add-chico-dialog',
    standalone: true,
    templateUrl: './add-chico-dialog.component.html',
    styleUrls: ['./add-chico-dialog.component.scss'],
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
export class AddChicoDialogComponent {
    chicoForm: FormGroup;
    isSubmitting = false;
    showFooter = false;
    resultMessage = '';
    resultType: 'success' | 'error' = 'success';

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddChicoDialogComponent>,
        private chicosService: ChicosService,
        private cdr: ChangeDetectorRef
    ) {
        this.chicoForm = this.fb.group({
            dni: ['', [Validators.required, Validators.maxLength(16)]],
            nombre: ['', [Validators.required, Validators.maxLength(128)]],
            apellido: ['', [Validators.required, Validators.maxLength(128)]]
        });
    }

    submit(): void {
        if (this.chicoForm.invalid) return;

        this.isSubmitting = true;
        this.showFooter = true;
        this.resultMessage = '';

        this.chicosService.createChico(this.chicoForm.value).subscribe({
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
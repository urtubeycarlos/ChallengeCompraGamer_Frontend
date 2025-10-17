import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { MatAutocomplete, MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatError } from '@angular/material/input';
import { FeedbackDialogComponent } from '../../../../shared/feedback-dialog/feedback-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { MicrosService } from '../../services/micros.service';

@Component({
    selector: 'app-add-micro-dialog',
    standalone: true,
    templateUrl: './add-micro-dialog.component.html',
    styleUrls: ['./add-micro-dialog.component.scss'],
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
        MatSelect,
        MatAutocomplete,
        MatAutocompleteModule
    ]
})
export class AddMicroDialogComponent {
    microForm: FormGroup;
    isSubmitting = false;
    showFooter = false;
    resultMessage = '';
    resultType: 'success' | 'error' = 'success';

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddMicroDialogComponent>,
        private microsService: MicrosService,
        private cdr: ChangeDetectorRef
    ) {
        this.microForm = this.fb.group({
            patente: ['', [Validators.required, Validators.maxLength(16)]],
            marca: ['', [Validators.required, Validators.maxLength(64)]],
            modelo: ['', [Validators.required, Validators.maxLength(64)]],
            cantidadAsientos: ['', [Validators.required, Validators.min(1), Validators.max(70)]]
        });
    }

    submit(): void {
        if (this.microForm.invalid) return;

        this.isSubmitting = true;
        this.showFooter = true;
        this.resultMessage = '';

        this.microsService.create(this.microForm.value).subscribe({
            next: () => {
                this.resultMessage = 'Chofer creado con éxito';
                this.resultType = 'success';
                this.isSubmitting = false;
                this.cdr.detectChanges();
                this.dialogRef.close(true);
            },
            error: () => {
                this.resultMessage = 'Error al crear el chofer';
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
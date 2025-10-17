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
import { MatOption } from '@angular/material/autocomplete';
import { MatError } from '@angular/material/input';
import { FeedbackDialogComponent } from '../../../../shared/feedback-dialog/feedback-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { ChoferesService } from '../../services/choferes.service';

@Component({
    selector: 'app-add-chofer-dialog',
    standalone: true,
    templateUrl: './add-chofer-dialog.component.html',
    styleUrls: ['./add-chofer-dialog.component.scss'],
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
export class AddChoferDialogComponent {
    choferForm: FormGroup;
    isSubmitting = false;
    showFooter = false;
    resultMessage = '';
    resultType: 'success' | 'error' = 'success';
    clasesLicencia = ['D', 'D1', 'D2', 'D3', 'E', 'E1'];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddChoferDialogComponent>,
        private choferesService: ChoferesService,
        private cdr: ChangeDetectorRef
    ) {
        this.choferForm = this.fb.group({
            dni: ['', [Validators.required, Validators.maxLength(16)]],
            nombre: ['', [Validators.required, Validators.maxLength(128)]],
            apellido: ['', [Validators.required, Validators.maxLength(128)]],
            claseLicencia: ['', Validators.required],
            telefono: ['', [Validators.required, Validators.max(2147483647)]] // número menor a int32
        });
    }

    submit(): void {
        if (this.choferForm.invalid) return;

        this.isSubmitting = true;
        this.showFooter = true;
        this.resultMessage = '';

        this.choferesService.create(this.choferForm.value).subscribe({
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
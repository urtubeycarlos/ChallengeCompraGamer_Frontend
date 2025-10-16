import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChoferesService } from '../../services/choferes.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Chofer } from '../../models/chofer.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-chofer-details',
    standalone: true,
    templateUrl: './chofer-details.component.html',
    styleUrls: ['./chofer-details.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class ChoferDetailsComponent implements OnInit {
    chofer: Chofer | null = null;
    choferForm: FormGroup;
    microForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private choferesService: ChoferesService
    ) {
        this.choferForm = this.fb.group({
            dni: [''],
            nombre: [''],
            apellido: [''],
            createdAt: ['']
        });

        this.microForm = this.fb.group({
            patente: [''],
            marca: [''],
            modelo: ['']
        });
    }

    ngOnInit(): void {
        const dni = this.route.snapshot.paramMap.get('dni');
        if (dni) {
            this.choferesService.getByDNI(dni).subscribe(chofer => {
                this.chofer = chofer;
                this.choferForm.patchValue(chofer);

                if (chofer.estaAsignado && chofer.micro) {
                    this.microForm.patchValue(chofer.micro);
                }
            });
        }
    }

    formatFecha(fecha: string): string {
        const d = new Date(fecha);
        return d.toLocaleString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    verMicro(patente: string | undefined): void {
        if (patente) {
            this.router.navigate(['micros', patente]);
        }
    }
}
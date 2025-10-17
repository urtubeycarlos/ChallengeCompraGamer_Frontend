import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChicosService } from '../../services/chicos.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Chico } from '../../models/chico.model';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-chico-details',
    standalone: true,
    templateUrl: './chico-details.component.html',
    styleUrls: ['./chico-details.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIcon,
        MatButtonModule,
    ]
})
export class ChicoDetailsComponent implements OnInit {
    chico: Chico | null = null;
    chicoForm: FormGroup;
    microForm: FormGroup;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private chicosService: ChicosService
    ) {
        this.chicoForm = this.fb.group({
            dni: [''],
            nombre: [''],
            apellido: [''],
            createdAt: ['']
        });
        this.chicoForm.disable();

        this.microForm = this.fb.group({
            patente: [''],
            marca: [''],
            modelo: ['']
        });
        this.chicoForm.disable();
    }

    ngOnInit(): void {
        const dni = this.route.snapshot.paramMap.get('dni');
        if (dni) {
            this.chicosService.getChicoByDNI(dni).subscribe(chico => {
                this.chico = chico;
                console.log(chico);
                this.chicoForm.patchValue(chico);

                if (chico.estaAsignado && chico.micro) {
                    this.microForm.patchValue(chico.micro);
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
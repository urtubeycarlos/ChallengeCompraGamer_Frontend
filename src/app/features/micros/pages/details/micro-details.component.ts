import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Chofer } from '../../models/chofer.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MicrosService } from '../../services/micros.service';
import { ChicosService } from '../../../chicos/services/chicos.service';
import { ChoferesService } from '../../../choferes/services/choferes.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Chico } from '../../models/chico.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/select';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Micro } from '../../models/micro.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-micro-details',
    standalone: true,
    templateUrl: './micro-details.component.html',
    styleUrls: ['./micro-details.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule,
        MatOption,
        MatAutocomplete,
        FormsModule,
        MatPaginatorModule,
        MatSlideToggle,
        MatCheckbox,
        DatePipe,
        MatFormField,
        MatAutocomplete,
        MatAutocompleteModule,
        MatTable,
        MatProgressSpinner
    ],
    providers: [DatePipe]
})
export class MicroDetailsComponent implements OnInit {
    chofer: Chofer | null = null;
    choferForm: FormGroup;
    autoCompleteChofer = new FormControl<Chofer | null>(null);
    optionsChofer!: Observable<Chofer[]>;
    todosLosChoferes: Chofer[] = [];

    micro: Micro | null = null;
    microForm: FormGroup;

    isEditing = false;
    isSubmitting = false;
    isLoading = false;

    selectedChofer: Chofer | null = null;
    choferSearchControl = new FormControl('');
    filteredChoferes: Chofer[] = [];

    chicosDisplayedColumns = ['select', 'dni', 'nombre', 'apellido'];
    chicos: Chico[] = [];
    @ViewChild(MatTable) tableChicos!: MatTable<Chico>;
    chicosDataSource = new MatTableDataSource<Chico>([]);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private microsService: MicrosService,
        private choferesService: ChoferesService,
        private chicosService: ChicosService,
        private datePipe: DatePipe,
        private snackBar: MatSnackBar,
        private cdr: ChangeDetectorRef
    ) {
        this.microForm = this.fb.group({
            patente: [{ value: '', disabled: true }],
            marca: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]],
            modelo: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]],
            cantidadAsientos: [{ value: '', disabled: true }, [Validators.required, Validators.min(1), Validators.max(70)]],
            cantidadAsientosOcupados: [{ value: '', disabled: true }],
            estaCompleto: [{ value: '', disabled: true }],
            fechaAlta: [{ value: '', disabled: true }]
        });

        this.choferForm = this.fb.group({
            dni: [{ value: '', disabled: true },],
            nombre: [{ value: '', disabled: true }],
            apellido: [{ value: '', disabled: true }],
            telefono: [{ value: '', disabled: true }],
            claseLicencia: [{ value: '', disabled: true }]
        });
    }

    ngOnInit(): void {
        const patente = this.route.snapshot.paramMap.get('patente');
        if (patente) {
            this.microsService.getByPatente(patente).subscribe(micro => {
                this.micro = micro;
                this.microForm.patchValue({
                    ...micro,
                    estaCompleto: micro.estaCompleto ? 'Sí' : 'No',
                    fechaAlta: this.formatFecha(micro.createdAt)
                });


                if (micro.chofer) {
                    this.chofer = micro.chofer;
                    this.autoCompleteChofer.setValue(micro.chofer);
                    this.autoCompleteChofer.disable();
                    this.choferForm.patchValue(micro.chofer);
                }

                if (micro.chicos && micro.chicos.length) {
                    micro.chicos.forEach(chico => {
                        chico.seleccionado = true;
                    });
                    this.chicos = micro.chicos;
                    this.chicosDataSource = new MatTableDataSource(micro.chicos);
                }
            })

            this.cdr.detectChanges();
        }
    }

    enableEdit(): void {
        this.isEditing = true;

        this.endableMicroForm();
        this.resetInputsChofer();
        this.resetInputsChicos();
    }

    endableMicroForm() {
        this.microForm.enable();
        this.microForm.get('patente')?.disable();
        this.microForm.get('cantidadAsientosOcupados')?.disable();
        this.microForm.get('estaCompleto')?.disable();
        this.microForm.get('fechaAlta')?.disable();
    }

    resetInputsChofer() {
        this.autoCompleteChofer.enable();
        this.autoCompleteChofer.reset();

        this.cdr.detectChanges();

        this.autoCompleteChofer.valueChanges.subscribe((chofer: string | Chofer | null) => {
            if (chofer && typeof chofer === 'object') {
                this.choferForm.patchValue({
                    dni: chofer.dni || '',
                    nombre: chofer.nombre || '',
                    apellido: chofer.apellido || '',
                    telefono: chofer.telefono || '',
                    claseLicencia: chofer.claseLicencia || ''
                });
            } else {
                this.choferForm.reset();
            }
        });

        this.choferForm.reset();
        this.cdr.detectChanges();

        this.choferesService.getAll().subscribe(choferes => {
            const choferActual: Chofer | null = this.chofer;
            this.todosLosChoferes = choferes.filter(chofer =>
                choferActual ? chofer.dni === choferActual.dni || !chofer.estaAsignado : !chofer.estaAsignado
            );

            this.optionsChofer = this.autoCompleteChofer.valueChanges.pipe(
                startWith(''),
                map(value => this.filtrarChoferes(value))
            );
            this.autoCompleteChofer.setValue(choferActual);

            this.cdr.detectChanges();
        });
    }

    resetInputsChicos() {
        this.chicosService.getChicos().subscribe((chicos: any[]) => {
            const chicosAsignados = this.micro?.chicos || [];

            const chicosFiltrados = chicos.filter((chico: { estaAsignado: any; dni: string; }) =>
                !chico.estaAsignado || chicosAsignados.some(asignado => asignado.dni === chico.dni)
            );

            // Marcar como seleccionados los que ya estaban asignados
            chicosFiltrados.forEach((chico: { seleccionado: boolean; dni: string; }) => {
                chico.seleccionado = chicosAsignados.some(asignado => asignado.dni === chico.dni);
            });

            this.chicos = chicosFiltrados;
            this.chicosDataSource.data = [...chicosFiltrados];
            this.tableChicos.renderRows();

            this.cdr.detectChanges();
        });
    }

    filtrarChoferes(valor: string | Chofer | null): Chofer[] {
        const texto = typeof valor === 'string' ? valor.toLowerCase() : '';
        return this.todosLosChoferes.filter(c =>
            c.nombre.toLowerCase().includes(texto) ||
            c.apellido.toLowerCase().includes(texto) ||
            c.dni.toString().includes(texto)
        );
    }

    cancel(): void {
        window.location.reload();
    }

    // clearChofer(): void {
    //     this.selectedChofer = null;
    //     this.choferSearchControl.setValue('');
    // }

    // selectChofer(chofer: Chofer): void {
    //     this.selectedChofer = chofer;
    //     this.microForm.patchValue({ choferId: chofer.dni });
    // }

    applyFilterChicos(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.chicosDataSource.filter = filterValue.trim().toLowerCase();

        if (this.chicosDataSource.paginator) {
            this.chicosDataSource.paginator.firstPage();
        }
    }

    // clearChicos(): void {
    //     // this.chicosDataSource.data.forEach((c: { seleccionado: boolean; }) => c.seleccionado = false);
    // }

    formatFecha(fecha: string): string | null {
        return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm')
    }

    displayFnChofer(chofer: Chofer): string {
        return chofer ? `${chofer.dni} - ${chofer.nombre} ${chofer.apellido}` : '';
    }


    submit(): void {
        this.isSubmitting = true;

        const dnisChicos = this.chicosDataSource.data.filter(c => c.seleccionado).map(c => c.dni);
        const asientosDisponibles = this.microForm.get('cantidadAsientos')?.value || 0;

        if (dnisChicos.length > asientosDisponibles) {
            this.handleError(`No podés asignar más de ${asientosDisponibles} chicos. Seleccionaste ${dnisChicos.length}.`)
            return; // bloquea el submit
        }

        const patente = this.microForm.get('patente')?.value;
        const microPayload = {
            marca: this.microForm.get('marca')?.value,
            modelo: this.microForm.get('modelo')?.value,
            cantidadAsientos: this.microForm.get('cantidadAsientos')?.value,
        };

        const choferDni = this.choferForm.get('dni')?.value;

        this.microsService.update(patente, microPayload).subscribe({
            next: () => {
                this.microsService.asignarChofer(this.micro?.patente!, choferDni!).subscribe({
                    next: () => {
                        this.microsService.asignarChicos(this.micro?.patente!, dnisChicos).subscribe({
                            next: () => {
                                window.location.reload(); // todo salió bien
                            },
                            error: () => this.handleError('Error al asignar chicos')
                        });
                    },
                    error: () => this.handleError('Error al asignar chofer')
                });
            },
            error: () => this.handleError('Error al actualizar el micro')
        });
    }

    handleError(mensaje: string): void {
        this.isSubmitting = false;
        this.cdr.detectChanges();
        this.snackBar.open(mensaje, 'Cerrar', {
            duration: 5000
        });
    }
}
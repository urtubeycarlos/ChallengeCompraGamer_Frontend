import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddMicroDialogComponent } from '../../components/add-micro-dialog/add-micro-dialog.component';
import { Micro } from '../../models/micro.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MicrosService } from '../../services/micros.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-micros-dashboard',
    templateUrl: './micros-dashboard.component.html',
    styleUrls: ['./micros-dashboard.component.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        MatChipsModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatTooltip],
})
export class MicrosDashboardComponent implements AfterViewInit {
    isLoading = false;
    micros: Micro[] = [];

    displayedColumns: string[] = ['patente', 'marca', 'modelo', 'tiene_chofer', 'tiene_chicos', 'cantidad_asientos', 'esta_completo', 'fecha_alta', 'acciones'];
    @ViewChild(MatTable) table!: MatTable<Micro>;
    dataSource: MatTableDataSource<Micro>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dialog: MatDialog, private router: Router, private microsService: MicrosService, private snackBar: MatSnackBar) {
        this.isLoading = true;
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.loadMicros();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    loadMicros(): void {
        this.isLoading = true;

        this.microsService.getAll().subscribe({
            next: (data) => {
                this.micros = data;
                this.dataSource.data = data;
            },
            error: (err) => {
                console.error('Error al cargar micros:', err);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    deleteMicro(patente: string): void {
        const micro = this.micros.find(m => m.patente === patente);
        if (micro!.tieneChofer || micro!.tieneChicos) {
            this.snackBar.open(
                'No se puede eliminar el micro porque tiene chofer o chicos asignados.',
                'Cerrar',
                { duration: 5000 }
            );
            return;
        }

        this.microsService.delete(patente).subscribe({
            next: () => {
                this.loadMicros(); // recarga la tabla
            },
            error: (err) => {
                console.error('Error al eliminar micro:', err);
            }
        });
    }

    openAddMicroDialog(): void {
        const dialogRef = this.dialog.open(AddMicroDialogComponent, {
            width: '512px'
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            this.refreshMicros();
        });
    }

    confirmDelete(patente: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: '¿Eliminar micro?',
                message: `¿Estás seguro de que querés eliminar al micro con patente ${patente}?`
            }
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) this.deleteMicro(patente);
        });
    }

    refreshMicros(): void {
        this.microsService.getAll().subscribe(data => {
            this.dataSource.data = [...data];
            this.table.renderRows();
        });
    }

    openMicroDetails(patente: string): void {
        this.router.navigate(['micros', patente]);
    }
}
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
import { AddChicoDialogComponent } from '../../components/add-chico-dialog/add-chico-dialog.component';
import { ChicosService } from '../../services/chicos.service';
import { Chico } from '../../models/chico.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { UpdateChicoDialogComponent } from '../../components/update-chico-dialog/update-chico-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'chicos-dashboard',
    templateUrl: './chicos-dashboard.component.html',
    styleUrls: ['./chicos-dashboard.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule, MatProgressSpinnerModule],
})
export class ChicosDashboardComponent implements AfterViewInit {
    isLoading = false;

    displayedColumns: string[] = ['dni', 'nombre', 'apellido', 'esta_asignado', 'fecha_alta', 'acciones'];
    @ViewChild(MatTable) table!: MatTable<Chico>;
    dataSource: MatTableDataSource<Chico>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dialog: MatDialog, private router: Router, private chicosService: ChicosService) {
        this.isLoading = true;
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.loadChicos();
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

    loadChicos(): void {
        this.isLoading = true;

        this.chicosService.getChicos().subscribe({
            next: (data) => {
                this.dataSource.data = data;
            },
            error: (err) => {
                console.error('Error al cargar chicos:', err);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    deleteChico(dni: string): void {
        this.chicosService.deleteChico(dni).subscribe({
            next: () => {
                this.loadChicos(); // recarga la tabla
            },
            error: (err) => {
                console.error('Error al eliminar chico:', err);
            }
        });
    }


    openAddChicoDialog(): void {
        const dialogRef = this.dialog.open(AddChicoDialogComponent, {
            width: '512px'
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            this.refreshChicos();
        });
    }

    // openDetalleDialog(chico: Chico): void {
    //     this.dialog.open(DetalleChicoDialogComponent, {
    //         data: chico,
    //         width: '400px'
    //     });
    // }
    openChicoDetails(dni: string): void {
        this.router.navigate(['chicos', dni]);
    }

    openUpdateDialog(chico: Chico): void {
        const dialogRef = this.dialog.open(UpdateChicoDialogComponent, {
            data: chico,
            width: '400px'
        });

        dialogRef.afterClosed().subscribe((updated) => {
            if (updated) this.refreshChicos();
        });
    }

    confirmDelete(dni: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: '¿Eliminar chico?',
                message: `¿Estás seguro de que querés eliminar al chico con DNI ${dni}?`
            }
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) this.deleteChico(dni);
        });
    }

    refreshChicos(): void {
        this.chicosService.getChicos().subscribe(data => {
            this.dataSource.data = [...data];
            this.table.renderRows();
        });
    }
}
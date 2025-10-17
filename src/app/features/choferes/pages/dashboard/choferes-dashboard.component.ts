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
import { AddChoferDialogComponent } from '../../components/add-chofer-dialog/add-chofer-dialog.component';
import { Chofer } from '../../models/chofer.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { UpdateChoferDialogComponent } from '../../components/update-chofer-dialog/update-chofer-dialog.component';
import { Router } from '@angular/router';
import { ChoferesService } from '../../services/choferes.service';

@Component({
    selector: 'app-choferes-dashboard',
    templateUrl: './choferes-dashboard.component.html',
    styleUrls: ['./choferes-dashboard.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule, MatProgressSpinnerModule],
})
export class ChoferesDashboardComponent implements AfterViewInit {
    isLoading = false;

    displayedColumns: string[] = ['dni', 'nombre', 'apellido', 'telefono', 'clase_licencia', 'esta_asignado', 'fecha_alta', 'acciones'];
    @ViewChild(MatTable) table!: MatTable<Chofer>;
    dataSource: MatTableDataSource<Chofer>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dialog: MatDialog, private router: Router, private choferesService: ChoferesService) {
        this.isLoading = true;
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.loadChoferes();
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

    loadChoferes(): void {
        this.isLoading = true;

        this.choferesService.getAll().subscribe({
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

    deleteChofer(dni: string): void {
        this.choferesService.delete(dni).subscribe({
            next: () => {
                this.loadChoferes(); // recarga la tabla
            },
            error: (err) => {
                console.error('Error al eliminar chico:', err);
            }
        });
    }


    openAddChoferDialog(): void {
        const dialogRef = this.dialog.open(AddChoferDialogComponent, {
            width: '512px'
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            this.refreshChoferes();
        });
    }

    // openDetalleDialog(chico: Chico): void {
    //     this.dialog.open(DetalleChicoDialogComponent, {
    //         data: chico,
    //         width: '400px'
    //     });
    // }
    openChoferDetails(dni: string): void {
        this.router.navigate(['choferes', dni]);
    }

    openUpdateDialog(chofer: Chofer): void {
        const dialogRef = this.dialog.open(UpdateChoferDialogComponent, {
            data: chofer,
            width: '512px'
        });

        dialogRef.afterClosed().subscribe((updated) => {
            if (updated) this.refreshChoferes();
        });
    }

    confirmDelete(dni: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: '¿Eliminar chofer?',
                message: `¿Estás seguro de que querés eliminar al chofer con DNI ${dni}?`
            }
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) this.deleteChofer(dni);
        });
    }

    refreshChoferes(): void {
        this.choferesService.getAll().subscribe(data => {
            this.dataSource.data = [...data];
            this.table.renderRows();
        });
    }
}
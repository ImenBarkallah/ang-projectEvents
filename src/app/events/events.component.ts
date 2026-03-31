import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evenement } from 'src/Models/Evenement';
import { EvenementService } from 'src/Services/evenement.service';
import { EventCreateComponent } from '../event-create/event-create.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';   

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(private ES: EvenementService,
    private dialog:MatDialog
  ) {}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'titre', 'dateDebut', 'dateFin', 'lieu', 'action'];
  dataSource: MatTableDataSource<Evenement> = new MatTableDataSource<Evenement>();

  ngOnInit(): void {
    this.fetch();
  }

    ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetch() {
    this.ES.GetAllEvents().subscribe((res: Evenement[])  => {
      this.dataSource.data = res;
     
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEvent(id: string) {
    this.ES.deleteEvent(id).subscribe(() => {
      this.fetch();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventCreateComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.fetch(); // refresh table
      }
    });
  }

  openEdit(id: String) {  
    const x = new MatDialogConfig();
   // x.width = '600px';
    x.data = id ; // Pass the event ID to the dialog

    let y = this.dialog.open(EventCreateComponent, x)
    y.afterClosed().subscribe(res => {
      if (res) {
        this.ES.update(id, res).subscribe(() => {
          this.fetch(); // refresh table
        });
      }
    });
  }
}

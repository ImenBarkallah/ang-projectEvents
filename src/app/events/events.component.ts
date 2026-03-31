import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evenement } from 'src/Models/Evenement';
import { EvenementService } from 'src/Services/evenement.service';
import { EventCreateComponent } from '../event-create/event-create.component';
import { MatDialog } from '@angular/material/dialog';

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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetch() {
    this.ES.GetAllEvents().subscribe((data) => {
      this.dataSource.data = data;
     
      console.log(this.dataSource.data);
    });
  }

  applyFilter(event: Event) {
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

  open(){
   this.dialog.open(EventCreateComponent); 
  }

}

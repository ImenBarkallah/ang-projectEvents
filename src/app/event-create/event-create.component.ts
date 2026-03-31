import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit{
  constructor(private dialogRef: MatDialogRef<EventCreateComponent>){}

  //declaration de form 
form!:FormGroup;
  //init de form
  ngOnInit(){
    this.form=new FormGroup({
      titre:new FormControl(null),
      dateDebut:new FormControl(null),
      dateFin:new FormControl(null),
      lieu:new FormControl(null)
    })

  }

      save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }


}

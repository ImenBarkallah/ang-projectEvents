import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvenementService } from 'src/Services/evenement.service';
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit{
    //declaration de form 
  form!:FormGroup;
  description = 'Ajouter un événement';

  
  constructor(
    private fb: FormBuilder,
    private ES: EvenementService,
    private dialogRef: MatDialogRef<EventCreateComponent>,//forcer le type => dialogRef est de type MatDialogRef<AddEventComponent>
    @Inject(MAT_DIALOG_DATA)  data: any
  ) {
    if (data){//console.log(data);
     this.ES.getEventById(data).subscribe((E) => {console.log(E);
        this.form = this.fb.group({
          titre: [E.titre, Validators.required],
          dateDebut: [E.dateDebut, Validators.required],
          dateFin: [E.dateFin, Validators.required],
          lieu: [E.lieu, Validators.required]
        });
        
      });
    
    }
    else {
      this.form=new FormGroup({
        titre: this.fb.control(null),
        dateDebut: this.fb.control(null),
        dateFin: this.fb.control(null),
        lieu: this.fb.control(null)
      })
    }
  }

  //init de form
  ngOnInit(): void{

  }

//sauvegarder l'événement
  save(): void {
    if (this.form.valid) {
      this.ES.AddEvents(this.form.value).subscribe(() => {
        this.dialogRef.close(true); // refresh table
      });
    }
  }
//fermer la dialogue sans sauvegarder
  close(): void {
    this.dialogRef.close();
  }
}


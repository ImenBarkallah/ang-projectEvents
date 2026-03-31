import { Component, OnInit } from '@angular/core';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

//pourquoi elle est nommée injection de dépendance ?: 
export class MemberComponent implements OnInit{
  constructor(private MS:MemberService,
    private dialog:MatDialog
  )
  {}

  ngOnInit(): void {
   this.MS.GetAllMembers().subscribe((res)=>{
    this.dataSource=res
   })   
  }
displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7'];
// saisir un tableau de membre
dataSource:Member[]=[]



  deleteMember(id: string) {

    //1 lancer la boite

    let dialogRef = this.dialog.open(ConfirmComponent, {
  height: '400px',
  width: '600px',
});

    //tester le click
    dialogRef.afterClosed().subscribe((res)=>{
  if(res){
  this.MS.deleteMember(id).subscribe(() => {
   // this.GetAllMembers(); // refresh table
    this.MS.GetAllMembers().subscribe(data=>{
      this.dataSource=data;
  }); });
  }
})

}

}

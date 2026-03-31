import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/Services/member.service';
import { Member } from 'src/Models/Member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  constructor(
    private MS: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute 
  ) {}
  form!: FormGroup;
  idcourant: string = '';

  ngOnInit(): void {
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    if (this.idcourant) { // JE SUIS DANS EDIT
      this.MS.getMemberById(this.idcourant).subscribe((res) => {
            this.form = new FormGroup({
      cin: new FormControl(res.cin, Validators.required),
      name: new FormControl(res.name),
      cv: new FormControl(res.cv),
      type: new FormControl(res.type),
      createddate: new FormControl(res.createddate, Validators.required)
    });

      });
    } else {
          this.form = new FormGroup({
      cin: new FormControl(null, Validators.required),
      name: new FormControl(null),
      cv: new FormControl(null),
      type: new FormControl(null),
      createddate: new FormControl(null)
    });
    }
  }




 sub(): void {
    console.log(this.form.value);
    if (this.idcourant) {
      this.MS.update(this.idcourant, this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.MS.AddMember(this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
    
}

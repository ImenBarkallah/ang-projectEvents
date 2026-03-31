import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Models/Member';

//@Injectable c'est un decorateur(dans java il est nommée annotation ) : role : de déclaré que ce service accepte d'etre injecté 
//Observable design pattern il a déclaré sur 3 : subscriber , observbl  , notification (exemple la choose qui tu raconte)
//c quoi Observable : c'est un thread lancé au momemt de l'envoie de la requette  qui repond au pattren de conception observable
//dans angular pattren utilisé
//mode singleton 
//il maintien une seul instance dans chaque service (c'est un avantage)
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient :HttpClient) { }

  GetAllMembers():Observable<Member[]>{
    return this.httpClient.get<Member[]>('http://localhost:3000/members')
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`http://localhost:3000/members/${id}`);
  }

AddMember(m: Member): Observable<void> {
  return this.httpClient.post<void>('http://localhost:3000/members',m);
}

  update(id: string, m: Member): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:3000/members/${id}`, m);
  }

  // DELETE request
 deleteMember(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/members/${id}`);
  }


}

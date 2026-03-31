import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/Models/Evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private httpClient :HttpClient) { }

  GetAllEvents():Observable<Evenement[]>{
    return this.httpClient.get<Evenement[]>('http://localhost:3000/evenements')
  }

  getEventById(id: string): Observable<Evenement> {
    return this.httpClient.get<Evenement>(`http://localhost:3000/evenements/${id}`);
  }

AddEvents(e: Evenement): Observable<void> {
  return this.httpClient.post<void>('http://localhost:3000/evenements',e);
}

  update(id: string, e: Evenement): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:3000/evenements/${id}`, e);
  }

 deleteEvent(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/evenements/${id}`);
  }


}

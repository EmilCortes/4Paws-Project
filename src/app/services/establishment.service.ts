import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener los establecimientos destacados

  getEstablishments(): Observable<any[]> {
    return this.firestore.collection('establishments').valueChanges();
  }

}

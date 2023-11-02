import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any |  null = null; // Inicializa como null
  isSidebarOpen = false
  updatedName: string = '';
  updatedAddress: string = '';
  updatedTelephone: string = '';
  profileUpdated: boolean = false;


  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
    ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    // Obtiene el usuario actualmente autenticado al inicializar el componente
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Si el usuario está autenticado, asigna el objeto de usuario a this.user
        this.user = user;
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe((userData: any) => {
          if (userData) {
            this.updatedName = userData.displayName || '';
            this.updatedAddress = userData.address || '';
            this.updatedTelephone = userData.telephone || '';
          }
        });
      } else {
        // Si el usuario no está autenticado, asigna null a this.user
        this.user = null;
      }
    });
  }

  updateProfile() {
    if (this.user) {
      const updateData: any = {};
      if (this.updatedName) {
        updateData.displayName = this.updatedName;
      }
      if (this.updatedAddress) {
        updateData.address = this.updatedAddress;
      }
      if (this.updatedTelephone) {
        updateData.telephone = this.updatedTelephone;
      }

      this.user
        .updateProfile(updateData)
        .then(() => {
          // Actualización exitosa, muestra un mensaje al usuario
          this.profileUpdated = true;
          console.log('Perfil actualizado con éxito');
          this.firestore.collection('users').doc(this.user.uid).set(updateData, { merge: true });
        })
        .catch((error: any) => {
          // Maneja el error, muestra un mensaje de error al usuario
          console.error('Error al actualizar el perfil:', error);
          // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
          // this.errorMessage = 'Hubo un error al actualizar el perfil, por favor inténtalo de nuevo.';
        });
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

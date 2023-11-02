import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  isSidebarOpen = false;
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
    ) {}

  onSubmit() {
    // Enviamos un correo de restablecimiento de contraseña
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        // Éxito: muestra un mensaje al usuario
        console.log('Se ha enviado un correo de restablecimiento de contraseña.');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Error: maneja el error y muestra un mensaje al usuario
        console.error(error.message);
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

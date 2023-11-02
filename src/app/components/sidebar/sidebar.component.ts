import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;
  @Output() isSidebarOpenChange = new EventEmitter<boolean>();

  constructor(
      public userService: UserService,
      private router: Router
      ){}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarOpenChange.emit(this.isSidebarOpen);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const sidebarElement = document.querySelector('.sidebar');
    const menuButtonElement = document.querySelector('.menu-button');

    if (sidebarElement && menuButtonElement) {
      if (!sidebarElement.contains(event.target as Node) && !menuButtonElement.contains(event.target as Node)) {
        this.isSidebarOpen = false;
        this.isSidebarOpenChange.emit(this.isSidebarOpen);
      }
    }
  }

  logout(){
    this.userService.logout()
    .then(()=> {
      this.router.navigate(['/login']);
      console.log('cuenta cerrada')
    })
    .catch(error => console.log(error))
  }
}

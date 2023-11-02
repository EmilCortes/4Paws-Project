import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../services/establishment.service';
import { Establishment } from '../../models/establishment.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isSidebarOpen = false;
  featuredEstablishments: Establishment[] = [];

  constructor(
    private establishmentService: EstablishmentService,

  ) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    this.establishmentService.getEstablishments().subscribe((establishments) => {
      this.featuredEstablishments = establishments;
      //console.log(establishments); //mostrar los establecimientos de la base de datos
    });
  }
}

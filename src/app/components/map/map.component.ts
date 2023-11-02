import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, config, Marker, Popup } from '@maptiler/sdk';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  isSidebarOpen = false;
  map: Map | undefined
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  firestoreSubscription: Subscription | undefined;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    config.apiKey = 'Z13xUz0m9r3uxpiYgs2r';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngAfterViewInit() {

    const initialState = { lng: 2.177432, lat: 41.382894, zoom: 12 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    this.firestoreSubscription = this.firestore.collection('establishments').valueChanges().subscribe((establecimientos: any[]) => {
      establecimientos.forEach((establecimiento) => {
        const { lat, long, name, adress } = establecimiento;
        console.log(lat, long, name, adress)
        // Crea un marcador para cada establecimiento
        if (this.map) {
          const marker = new Marker({ color: "#FF0000" })
            .setLngLat([long, lat])
            .addTo(this.map);
            //Popup para mostrar info del marcador.
            const popupContent = `
        <div class="custom-popup">
          <h3>${name}</h3>
          <hr>
          <p><strong>Dirección:</strong> ${adress}</p>
        </div>
      `;
            marker.setPopup(new Popup({ closeButton: false }).setHTML(popupContent));
        }
      });
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}


import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, config, Marker, Popup } from '@maptiler/sdk';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { Establishment } from 'src/app/models/establishment.model';
import { EstablishmentModalComponent } from './establishment-modal/establishment-modal.component';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  isSidebarOpen: boolean = false;
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  @ViewChild(EstablishmentModalComponent)
  firestoreSubscription: Subscription | undefined;
  showModal: boolean = false;
  markerInfo: any;
  updatedName: string = '';
  updatedDescription: string = '';
  updatedAddress: string = '';
  timer: any;
  timerDuration: number = 2000;

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
        const { lat, long, name, address, description } = establecimiento;
        console.log(lat, long, name, address)

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
          <p><strong>Descripción:</strong> ${description}</p>
          <hr>
          <p><strong>Dirección:</strong>  ${address}</p>
        </div>
      `;
          marker.setPopup(new Popup({ closeButton: false }).setHTML(popupContent));
        }

      });
    });
  }

  //metodo para registrar establecimiento en Fibrebase
  saveDataInFirebase(Establishment: Establishment) {
    const establishmentsCollection = this.firestore.collection('establishments');
    establishmentsCollection.add(Establishment)
      .then(() => {
        console.log('Datos guardados en Firebase');
      })
      .catch((error) => {
        console.error('Error al guardar los datos en Firebase:', error);
      });
  }


  registerEstablishmet() {

    if (this.map) {
      const mouseupCallback = (event: any) => {
        let clickDuration = Date.now();
        // Verifica si la duración del clic fue mayor a 2 segundos (2000 milisegundos)
        if (clickDuration > 2000) {
          const lat = event.lngLat.lat;
          const long = event.lngLat.lng;

          if (this.map) {
            let marker = new Marker()
              .setLngLat([long, lat])
              .addTo(this.map);

            this.showModal = true;
            this.markerInfo = { lat, long, name: '', address: '', description: '' };
            console.log(this.markerInfo);
          }


          //this.saveDataInFirebase(Establishment);
          this.map!.off('mouseup', mouseupCallback);
        }
      };
      this.map.on('mouseup', mouseupCallback);
    }
  }


  startTimer() {
    this.timer = setTimeout(() => {
      this.registerEstablishmet();
    }, this.timerDuration);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  handleModalClosed() {
    this.showModal = false;
    this.updatedName = '';
    this.updatedDescription = '';
    this.updatedAddress = '';
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}

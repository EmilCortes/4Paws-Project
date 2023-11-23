import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Establishment } from 'src/app/models/establishment.model';

@Component({
  selector: 'app-establishment-modal',
  templateUrl: './establishment-modal.component.html',
  styleUrls: ['./establishment-modal.component.css']
})
export class EstablishmentModalComponent {
  @Input() markerInfo: any;
  @Output() modalClosed = new EventEmitter<any>();
  @Output() dataSaved = new EventEmitter<Establishment>();

  establishmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.establishmentForm = this.fb.group({
      name: '',
      description: '',
      address: '',
      telephone: ''
    });
  }

  closeModal() {
    this.modalClosed.emit();
  }

  saveData() {
    const formData = this.establishmentForm.value;
    const establishmentData: Establishment = {
      ...this.markerInfo,
      ...formData
    };
    this.dataSaved.emit(establishmentData);
    this.closeModal();
  }
}

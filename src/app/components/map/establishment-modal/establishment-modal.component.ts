import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-establishment-modal',
  templateUrl: './establishment-modal.component.html',
  styleUrls: ['./establishment-modal.component.css']
})
export class EstablishmentModalComponent {
  @Input() markerInfo: any;
  @Output() modalClosed = new EventEmitter<any>();
  @Output() dataSaved = new EventEmitter<any>();

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
    // Agregar validaciones u otras lógicas según sea necesario antes de guardar
    this.dataSaved.emit(formData);
  }
}

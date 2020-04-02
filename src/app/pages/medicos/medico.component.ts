import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalesService } from '../../services/services.index';
import { Hospital } from 'src/models/hospital.model';
import { Medico } from '../../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: []
})
export class MedicoComponent implements OnInit {

    hospitales: Hospital[] = [];
    medico: Medico = new Medico('', '', '', '', '');
    hospital: Hospital = new Hospital('');

    constructor(
        // tslint:disable-next-line: variable-name
        public _medicoService: MedicoService,
        // tslint:disable-next-line: variable-name
        public _hospitalesService: HospitalesService,
        // tslint:disable-next-line: variable-name
        public _modalUploadService: ModalUploadService,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) {
        activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            if (id !== 'nuevo') {
                this.cargarMedico(id);
            }
        });
    }

    ngOnInit() {
        this._hospitalesService.cargarHospitales().subscribe((resp: any) => {
            this.hospitales = resp.hospitales;
        });
        this._modalUploadService.notificacion.subscribe((resp: any) => {
            this.medico.img = resp.medicoActualizado.img;
        });
    }

    guardarMedico(f: NgForm) {
        if (f.invalid) {
            return;
        }
        console.log(this.medico);
        this._medicoService.guardarMedico(this.medico).subscribe((medico) => {
            console.log(medico);
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
        });
    }

    cambioHospital(id: string) {
        this._hospitalesService.obtenerHospital(id).subscribe(hospital => {
            this.hospital = hospital;
        });
    }

    cargarMedico(id: string) {
        this._medicoService.cargarMedico(id).subscribe((medico) => {
            console.log(medico);

            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital(this.medico.hospital);
        });
    }

    cambiarFoto() {
        this._modalUploadService.mostrarModal('medicos', this.medico._id);

    }

}

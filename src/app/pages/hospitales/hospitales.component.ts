import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/services.index';
import { Hospital } from 'src/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-hospitales',
    templateUrl: './hospitales.component.html',
    styles: []
})
export class HospitalesComponent implements OnInit {


    hospitales: Hospital[] = [];
    cargando = true;
    totalHospitales: number = 0;

    constructor(
        // tslint:disable-next-line: variable-name
        public _hospitalesService: HospitalesService,
        // tslint:disable-next-line: variable-name
        public _modalUploadService: ModalUploadService
    ) { }

    ngOnInit() {
        this.cargarHospitales();
        this.cargando = false;
    }

    cargarHospitales() {
        this._hospitalesService.cargarHospitales().subscribe((resp: any) => {
            this.hospitales = resp.hospitales;
            this.totalHospitales = resp.total;
        });
    }

    async crearHospital() {
        const { value: nombreHospital } = await Swal.fire({
            title: 'Introduce el nombre del hospital',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return '¡Escribe un nombre!';
                }
            }
        });
        if (nombreHospital) {
            const hospital: Hospital = new Hospital(nombreHospital);

            this._hospitalesService.crearHospital(hospital).subscribe((resp: any) => {
                Swal.fire('Hospital creado', `El Hospital con nombre ${nombreHospital} ha sido creado`, 'success');
                this.cargarHospitales();
            });
        } else {
            return;
        }
    }

    borrarHospital(hospital: Hospital) {
        this._hospitalesService.borrarHospital(hospital._id).subscribe((resp: any) => {
            Swal.fire('Hospital borrado', 'Hospital borrado correctamente', 'success');
            this.cargarHospitales();
        });
    }

    guardarHospital(hospital: Hospital) {
        console.log(hospital);
        this._hospitalesService.actualizarHospital(hospital).subscribe((resp: any) => {
            Swal.fire('Hospital actualizado', 'Eñ nombre del hospital se actualizó correctamente', 'success');
            this.cargarHospitales();
        });
    }

    mostrarModal(hospital: Hospital) {
        console.log(hospital._id);
        this._modalUploadService.mostrarModal('hospitales', hospital._id);
        this._modalUploadService.notificacion.subscribe((resp: any) => {

            this.cargarHospitales();
        });
    }
    buscarHospital(termino: string) {
        this._hospitalesService.buscarHospital(termino).subscribe((resp: any) => {
            console.log(resp);
            this.hospitales = resp;
        });
    }
}

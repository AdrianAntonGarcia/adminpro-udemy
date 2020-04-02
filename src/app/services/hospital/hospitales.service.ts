import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';

@Injectable()
export class HospitalesService {

    public token: string = '';
    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) {
        this.token = this._usuarioService.token;
    }

    cargarHospitales() {
        const url = URL_SERVICIOS + '/hospital';
        return this.http.get(url);
    }

    crearHospital(hospital: Hospital) {
        const url = URL_SERVICIOS + '/hospital?token=' + this.token;
        return this.http.post(url, hospital).map((resp: any) => {
            console.log(resp);
            Swal.fire('Hospital creado', hospital.nombre, 'success');
            return resp.hospitalCreado;
        });
    }

    borrarHospital(id: string) {
        const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
        return this.http.delete(url);
    }

    actualizarHospital(hospital: Hospital) {
        const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
        return this.http.put(url, hospital);
    }

    buscarHospital(termino: string) {
        console.log(termino);
        const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
        return this.http.get(url).map((resp: any) => {
            console.log(resp);
            return resp.hospitales;
        });
    }

    obtenerHospital(id: string) {
        const url = URL_SERVICIOS + '/hospital/' + id;
        return this.http.get(url).map((resp: any) => {
            return resp.hospital;
        });
    }
}

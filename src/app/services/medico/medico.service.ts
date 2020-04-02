import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/models/medico.model';

@Injectable()
export class MedicoService {

    totalMedicos: number = 0;
    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) {
        this.cargarMedicos();
    }
    cargarMedicos() {
        const url = URL_SERVICIOS + '/medico';
        return this.http.get(url).map((resp: any) => {
            this.totalMedicos = resp.total;
            return resp.medicos;
        });
    }

    buscarMedicos(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
        return this.http.get(url).map((resp: any) => {
            return resp.medicos;
        });
    }

    borrarMedico(id: string) {
        let url = URL_SERVICIOS + '/medico/' + id;
        url += '?token=' + this._usuarioService.token;
        return this.http.delete(url).map((resp) => {
            Swal.fire('Médico Borrado', 'Médico borrado correctamente', 'success');
            return resp;
        });
    }

    guardarMedico(medico: Medico) {
        let url = URL_SERVICIOS + '/medico';

        if (medico._id) {
            // Actualizando
            url += '/' + medico._id;
            url += '?token=' + this._usuarioService.token;
            const medicoMod = {
                nombre: medico.nombre,
                hospitalID: medico.hospital
            };
            return this.http.put(url, medicoMod).map((resp: any) => {
                console.log(resp);
                Swal.fire('Médico actualizado', medico.nombre, 'success');
                return resp.medico;
            });
        } else {
            // Creando
            url += '?token=' + this._usuarioService.token;

            const medicoMod = {
                nombre: medico.nombre,
                hospitalID: medico.hospital
            }
            return this.http.post(url, medicoMod).map((resp: any) => {
                Swal.fire('Médico creado', medico.nombre, 'success');
                return resp.medico;
            });
        }
    }

    cargarMedico(id: string) {
        const url = URL_SERVICIOS + '/medico/' + id;
        return this.http.get(url).map((resp: any) => {
            return resp.medico;
        });
    }
}

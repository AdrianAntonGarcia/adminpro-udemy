import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { Usuario } from 'src/models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { HospitalesService } from '../../services/hospital/hospitales.service';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: []
})
export class BusquedaComponent implements OnInit {

    usuarios: Usuario[] = [];
    medicos: Medico[] = [];
    hospitales: Hospital[] = [];
    termino: string = '';
    constructor(
        public activatedRoute: ActivatedRoute,
        public http: HttpClient,
        // tslint:disable-next-line: variable-name
        public _modalUploadService: ModalUploadService,
        // tslint:disable-next-line: variable-name
        public _usuarioService: UsuarioService,
        // tslint:disable-next-line: variable-name
        public _hospitalesService: HospitalesService
    ) {
        activatedRoute.params.subscribe(params => {
            let termino = params['termino'];
            this.termino = termino;
            this.buscar(termino);
        });
    }

    ngOnInit() {
    }

    buscar(termino: string) {
        let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
        this.termino = termino;
        this.http.get(url).subscribe((resp: any) => {
            // console.log(resp);
            this.hospitales = resp.hospitales;
            this.medicos = resp.medicos;
            this.usuarios = resp.usuarios;
        });
    }

    mostrarModal(id: string, tipo: string) {
        this._modalUploadService.mostrarModal(tipo, id);
    }

    borrarUsuario(usuario: Usuario) {
        // console.log(usuario);
        if (usuario._id === this._usuarioService.usuario._id) {
            Swal.fire('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
            return;
        }
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir este cambio.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo.'
        }).then((borrar) => {
            if (borrar.value) {
                this._usuarioService.borrarUsuario(usuario._id).subscribe((borrado: boolean) => {
                    // console.log(borrado);
                    this.buscar(this.termino);
                });
            }
        });
    }

    guardarUsuario(usuario: Usuario) {
        this._usuarioService.actualizarUsuario(usuario).subscribe();
    }
    borrarHospital(hospital: Hospital) {
        this._hospitalesService.borrarHospital(hospital._id).subscribe((resp: any) => {
            Swal.fire('Hospital borrado', 'Hospital borrado correctamente', 'success');
            this.buscar(this.termino);
        });
    }

    guardarHospital(hospital: Hospital) {
        // console.log(hospital);
        this._hospitalesService.actualizarHospital(hospital).subscribe((resp: any) => {
            Swal.fire('Hospital actualizado', 'Eñ nombre del hospital se actualizó correctamente', 'success');
            this.buscar(this.termino);
        });
    }


}

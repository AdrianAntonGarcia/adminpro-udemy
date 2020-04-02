import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../../models/usuario.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';
import 'rxjs/add/operator/map';
@Injectable()
export class UsuarioService {

    usuario: Usuario;
    token: string;

    constructor(
        public http: HttpClient,
        public router: Router,
        // tslint:disable-next-line: variable-name
        public _subirArchivoService: SubirArchivoService
    ) {
        this.cargarStorage();
    }

    estaLogueado() {
        return (this.token.length > 5) ? true : false;
    }

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        } else {
            this.token = '';
            this.usuario = null;
        }
    }

    guardarStorage(id: string, token: string, usuario: Usuario) {

        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        /**
         * No podemos guardar en el local storage un objeto, por lo que
         * hay que transformarlo a string.
         */
        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
    }


    logout() {
        this.usuario = null;
        this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
    }

    loginGoogle(token: string, recordar: boolean = false) {
        const url = URL_SERVICIOS + '/login/google';

        return this.http.post(url, { token }).map((resp: any) => {
            console.log(resp);
            /**
             * Guardamos el email si el usuario ha selccionado el recuerdame
             */
            if (recordar) {
                localStorage.setItem('email', resp.usuario.email);
            } else {
                localStorage.removeItem('email');
            }
            this.guardarStorage(resp.id, resp.token, resp.usuario);
            return true;
        });
    }

    login(usuario: Usuario, recordar: boolean = false) {
        /**
         * Guardamos el email si el usuario ha selccionado el recuerdame
         */
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }
        const url = URL_SERVICIOS + '/login';
        return this.http.post(url, usuario).map((resp: any) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario);
            return true;
        });
    }

    crearUsuario(usuario: Usuario) {
        const url = URL_SERVICIOS + '/usuario';
        return this.http.post(url, usuario).map((resp: any) => {
            Swal.fire('Usuario creado', usuario.email, 'success');
            return resp.usuario;
        });
    }

    actualizarUsuario(usuario: Usuario) {
        let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url += '?token=' + this.token;

        return this.http.put(url, usuario).map((resp: any) => {
            /**
             * Solo actualizamos el local storage si estamos modificando
             * nuestro propio usuario
             */
            if (usuario._id === this.usuario._id) {
                const usuarioDB: Usuario = resp.usuario;
                this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
            }
            Swal.fire('Usuario actualizado', usuario.nombre, 'success');
            return true;
        });
    }

    cambiarImagen(archivo: File, id: string) {
        this._subirArchivoService.subirArchivo(archivo, 'usuarios', id).then((resp: any) => {
            console.log(resp);
            this.usuario.img = resp.usuarioActualizado.img;
            Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
            this.guardarStorage(id, this.token, this.usuario);
            console.log(resp);
        }).catch(resp => {
            console.log(resp);
        });
    }

    cargarUsuarios(desde: number = 0) {
        const url = URL_SERVICIOS + '/usuario?desde=' + desde;
        return this.http.get(url);
    }

    buscarUsuarios(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
        return this.http.get(url).map((resp: any) => {
            return resp.usuarios;
        });
    }
    borrarUsuario(id: string) {
        let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
        // http://localhost:3000/usuario/5e6d0ec2286a2931f4e42fb6?token=
        return this.http.delete(url).map((resp: any) => {
            Swal.fire(
                '¡Borrado!',
                'El usuario ha sido borrado.',
                'success'
            );
            return true;
        });
    }
}

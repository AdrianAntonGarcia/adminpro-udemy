import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';

import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styles: []
})
export class ModalUploadComponent implements OnInit {



    usuario: Usuario;

    imagenSubir: File;
    imagenTemp: string;

    constructor(
        // tslint:disable-next-line: variable-name
        public _subirArchivoService: SubirArchivoService,
        // tslint:disable-next-line: variable-name
        public _modalUploadService: ModalUploadService
    ) {

    }

    ngOnInit() {
    }

    seleccionImagen(archivo: File) {
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }
        if (archivo.type.indexOf('image') < 0) {
            Swal.fire('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubir = null;
            return;
        }
        this.imagenSubir = archivo;
        const reader = new FileReader();
        let urlImagenTemp = reader.readAsDataURL(archivo);

        reader.onloadend = () => {
            this.imagenTemp = reader.result.toString();
        };
    }

    subirImagen() {
        this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id).then(resp => {
            this._modalUploadService.notificacion.emit(resp);
            this.cerrarModal();
        }).catch(err => {
            console.log('Error en la carga...');
        });
    }

    cerrarModal() {
        this.imagenTemp = null;
        this.imagenSubir = null;
        this._modalUploadService.ocultarModal();
    }
}

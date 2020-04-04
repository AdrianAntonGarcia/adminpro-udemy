import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    HospitalesService,
    MedicoService,
    AdminGuard,
    VerificaTokenGuard
} from './services.index';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SettingsService,
        SharedService,
        SidebarService,
        UsuarioService,
        LoginGuardGuard,
        SubirArchivoService,
        ModalUploadService,
        HospitalesService,
        MedicoService,
        AdminGuard,
        VerificaTokenGuard
    ]
})
export class ServiceModule { }

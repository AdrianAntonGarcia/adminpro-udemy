import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

    constructor(
        // tslint:disable-next-line: variable-name
        public _usuarioService: UsuarioService,
        public router: Router
    ) {

    }

    canActivate(): Promise<boolean> | boolean {

        const token = this._usuarioService.token;
        // atob decodifica string codificados en base64
        const payload = JSON.parse(atob(token.split('.')[1]));


        const expirado = this.expirado(payload.exp);

        if (expirado) {
            this.router.navigate(['/login']);
            return false;
        }


        return this.verficaRenuva(payload.exp);
    }

    verficaRenuva(fechaExp: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // Lo volvemos a poner en milisegundos
            const tokenExp = new Date(fechaExp * 1000);

            // Estamos usando la fecha del navegador, habría que usar la del server con un servicio
            const ahora = new Date();

            // Incrementamos en 4 horas
            ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

            if (tokenExp.getTime() > ahora.getTime()) {
                resolve(true);
            } else {
                this._usuarioService.renuevaToken().subscribe(() => {
                    resolve(true);
                }, () => {
                    this.router.navigate(['/login']);
                    reject(false);
                });
            }
        });
    }

    expirado(fechaExp: number) {
        const ahoraEnSegundos = new Date().getTime() / 1000;
        if (fechaExp < ahoraEnSegundos) {
            return true;
        } else {
            return false;
        }
    }
}

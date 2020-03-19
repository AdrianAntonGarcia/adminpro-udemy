import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  // tslint:disable-next-line: variable-name
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) {

  }
  canActivate(): boolean {
    if (this._usuarioService.estaLogueado()) {
      console.log('Paso el login guard');
      return true;
    } else {
      console.log('Bloqueado por el login guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

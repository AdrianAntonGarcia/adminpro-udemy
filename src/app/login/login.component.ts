import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';


declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    // tslint:disable-next-line:variable-name
    public _usuarioService: UsuarioService) {

  }

  ngOnInit() {

    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  googleInit() {
    /**
     * Cargamos el auth2 de google
     */
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '99449547660-t5kfi7legjtdeeiabbcc50f3cgu02pdq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        /**
         * Especificamos lo que queremos del login de google
         */
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token, this.recuerdame).subscribe(resp => {
        window.location.href = '#/dashboard';
      });
      console.log(token);
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(correcto => this.router.navigate(['/dashboard']));
  }

}

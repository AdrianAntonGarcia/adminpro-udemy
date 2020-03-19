import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/services.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    // tslint:disable-next-line: variable-name
    public _sidebar: SidebarService,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService) {
  }

  ngOnInit() {
  }

}

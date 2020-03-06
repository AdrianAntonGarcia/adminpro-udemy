import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: indent
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styles: []
})
export class ProgressComponent implements OnInit {

    progreso1: number = 20;
    progreso2: number = 30;

    constructor() { }

    ngOnInit() {
    }

    // actualizar(event: number) {
    //     console.log('Evento: ', event);
    // }

}

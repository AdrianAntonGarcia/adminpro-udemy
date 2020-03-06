import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-incrementador',
    templateUrl: './incrementador.component.html',
    styles: []
})
export class IncrementadorComponent implements OnInit {

    /**
     * Nos permite hacer referencias a elementos html
     */
    @ViewChild('txtProgress', { static: false }) txtProgress: ElementRef;

    @Input('nombre') leyenda: string = 'Leyenda';
    @Input() progreso: number = 50;

    //Podemos cambiar el nombre

    @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();
    // @Output() cambioValor: EventEmitter<number> = new EventEmitter();
    constructor() {
        // console.log('Leyenda', this.leyenda);
        // console.log('Progreso', this.progreso);
    }

    ngOnInit() {
        // console.log('Progreso', this.progreso);
        // console.log('Leyenda', this.leyenda);
    }

    onChanges(newValue: number) {
        // console.log(newValue);

        /**
         * Con el documento estamos viendo todo el documento html, por lque vemos todos
         * los componentes que se visualizan en la pagina.
         * En el viewChild solo vemos el html del componente
         */
        // let elemHTML: any = document.getElementsByName('progreso')[0];
        let elemHTML: any = this.txtProgress.nativeElement;
        // console.log(this.txtProgress);

        if (newValue >= 100) {
            this.progreso = 100;
        } else if (newValue <= 0) {
            this.progreso = 0;
        } else {
            this.progreso = newValue;
        }

        elemHTML.value = this.progreso;
        this.txtProgress.nativeElement.focus();

        this.cambioValor.emit(this.progreso);
    }

    cambiarValor(valor) {

        if (this.progreso + valor > 100) {
            return;
        }
        if (this.progreso + valor < 0) {
            return;
        }
        this.progreso = this.progreso + valor;
        this.txtProgress.nativeElement.focus();
        this.cambioValor.emit(this.progreso);
    }
}

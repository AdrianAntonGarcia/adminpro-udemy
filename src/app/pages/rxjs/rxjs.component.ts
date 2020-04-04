import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor() {
        // this.regresaObservable().pipe(retry(2)).subscribe(
        this.subscription = this.regresaObservable().subscribe(
            (numero) => {
                console.log('Subs', numero);
            }, (error) => {
                console.log(error);
            }, () => {
                console.log('El observador termino');
            });
    }

    ngOnInit() {
    }

    /** Cada vez que salgamos de la página */
    ngOnDestroy(): void {
        console.log('La página se va a cerrar');
        this.subscription.unsubscribe();
    }
    regresaObservable(): Observable<any> {
        const obs = new Observable<any>(observer => {
            let contador = 0;


            let intervalo = setInterval(() => {
                contador++;
                const salida = {
                    valor: contador
                };

                observer.next(salida);
                // if (contador === 3) {
                //   clearInterval(intervalo);
                //   observer.complete();
                // }
                /**
                 * Si queremos mandar el error
                 */
                // if (contador === 2) {
                //   // clearInterval(intervalo);
                //   observer.error('Auxilio');
                // }
            }, 1000);
            /** Podemos enviar cuantos operadores queramos */
        }).pipe(
            map(resp => {
                return resp.valor;
            }), filter((resp, index) => {
                /** Index, las veces que se ha llamado al filter */
                // console.log('Filter', resp, index);
                if ((resp % 2) === 1) {
                    // impar
                    return true;
                } else {
                    // par
                    return false;
                }
            })
        );
        /**
         * Tienen 3 callbacks, el primero la información del next, el segundo
         * si recibimos un error y el tercero se lanza cuando
         * el observador termina (Es decir, cuando le mandamos el complete())
         * Con el pipe retry, si falla se vuelve a lanzar, cuando falla el número de intentos
         * que este definido ya es cuando lanza el error
         */
        // obs.pipe(retry()).subscribe(
        //   (numero) => {
        //     console.log('Subs', numero);
        //   }, (error) => {
        //     console.log(error);
        //   }, () => {
        //     console.log('El observador termino');
        //   });
        return obs;
    }
}

import { Hospital } from './hospital.model';
export class Medico {

    constructor(
        public nombre?: string,
        public img?: string,
        public usuario?: any,
        public hospital?: string,
        public _id?: string
    ) { }
}

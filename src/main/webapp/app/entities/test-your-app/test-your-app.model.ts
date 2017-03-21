import { Application } from '../application';
import { Plateform } from '../plateform';
export class TestYourApp {
    constructor(
        public id?: number,
        public link?: string,
        public application?: Application,
        public plateform?: Plateform,
    ) {
    }
}

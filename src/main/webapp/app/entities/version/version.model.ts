import { Application } from '../application';
import { Deployment } from '../deployment';
export class Version {
    constructor(
        public id?: number,
        public number?: string,
        public application?: Application,
        public deployment?: Deployment,
    ) {
    }
}

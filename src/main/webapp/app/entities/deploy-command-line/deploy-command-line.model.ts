import { Application } from '../application';
import { Plateform } from '../plateform';
export class DeployCommandLine {
    constructor(
        public id?: number,
        public pattern?: string,
        public application?: Application,
        public plateform?: Plateform,
    ) {
    }
}

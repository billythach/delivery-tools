import { Deployment } from '../deployment';
import { TestYourApp } from '../test-your-app';
import { DeployCommandLine } from '../deploy-command-line';
export class Plateform {
    constructor(
        public id?: number,
        public name?: string,
        public deployment?: Deployment,
        public testYourApp?: TestYourApp,
        public deployCommandLine?: DeployCommandLine,
    ) {
    }
}

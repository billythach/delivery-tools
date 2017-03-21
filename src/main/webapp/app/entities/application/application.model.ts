import { Version } from '../version';
import { TestYourApp } from '../test-your-app';
import { DeployCommandLine } from '../deploy-command-line';
export class Application {
    constructor(
        public id?: number,
        public name?: string,
        public roadmapPattern?: string,
        public ticketDelivery?: string,
        public version?: Version,
        public testYourApp?: TestYourApp,
        public deployCommandLine?: DeployCommandLine,
    ) {
    }
}

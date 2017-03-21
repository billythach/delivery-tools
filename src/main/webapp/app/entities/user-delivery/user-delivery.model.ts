
const enum UserDeliveryType {
    'DEVELOPER',
    'EXPLOITATION'

};
import { Deployment } from '../deployment';
export class UserDelivery {
    constructor(
        public id?: number,
        public name?: string,
        public type?: UserDeliveryType,
        public deploymentAsDev?: Deployment,
        public deploymentAsExploitation?: Deployment,
    ) {
    }
}

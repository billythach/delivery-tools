import { Issue } from '../issue';
import { UserDelivery } from '../user-delivery';
import { Plateform } from '../plateform';
import { Version } from '../version';
export class Deployment {
    constructor(
        public id?: number,
        public date?: any,
        public issue?: Issue,
        public deliveryDev?: UserDelivery,
        public deliveryExploitation?: UserDelivery,
        public plateform?: Plateform,
        public version?: Version,
    ) {
    }
}

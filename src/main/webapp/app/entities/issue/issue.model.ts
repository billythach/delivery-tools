
const enum IssueStatus {
    'TODO',
    'DOING',
    'DONE',
    'REJECTED'

};
import { Deployment } from '../deployment';
export class Issue {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public status?: IssueStatus,
        public deployment?: Deployment,
    ) {
    }
}

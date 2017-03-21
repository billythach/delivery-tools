import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    IssueService,
    IssuePopupService,
    IssueComponent,
    IssueDetailComponent,
    IssueDialogComponent,
    IssuePopupComponent,
    IssueDeletePopupComponent,
    IssueDeleteDialogComponent,
    issueRoute,
    issuePopupRoute,
} from './';

let ENTITY_STATES = [
    ...issueRoute,
    ...issuePopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IssueComponent,
        IssueDetailComponent,
        IssueDialogComponent,
        IssueDeleteDialogComponent,
        IssuePopupComponent,
        IssueDeletePopupComponent,
    ],
    entryComponents: [
        IssueComponent,
        IssueDialogComponent,
        IssuePopupComponent,
        IssueDeleteDialogComponent,
        IssueDeletePopupComponent,
    ],
    providers: [
        IssueService,
        IssuePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsIssueModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    DeploymentService,
    DeploymentPopupService,
    DeploymentComponent,
    DeploymentDetailComponent,
    DeploymentDialogComponent,
    DeploymentPopupComponent,
    DeploymentDeletePopupComponent,
    DeploymentDeleteDialogComponent,
    deploymentRoute,
    deploymentPopupRoute,
} from './';

let ENTITY_STATES = [
    ...deploymentRoute,
    ...deploymentPopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DeploymentComponent,
        DeploymentDetailComponent,
        DeploymentDialogComponent,
        DeploymentDeleteDialogComponent,
        DeploymentPopupComponent,
        DeploymentDeletePopupComponent,
    ],
    entryComponents: [
        DeploymentComponent,
        DeploymentDialogComponent,
        DeploymentPopupComponent,
        DeploymentDeleteDialogComponent,
        DeploymentDeletePopupComponent,
    ],
    providers: [
        DeploymentService,
        DeploymentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsDeploymentModule {}

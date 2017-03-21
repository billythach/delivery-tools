import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    DeployCommandLineService,
    DeployCommandLinePopupService,
    DeployCommandLineComponent,
    DeployCommandLineDetailComponent,
    DeployCommandLineDialogComponent,
    DeployCommandLinePopupComponent,
    DeployCommandLineDeletePopupComponent,
    DeployCommandLineDeleteDialogComponent,
    deployCommandLineRoute,
    deployCommandLinePopupRoute,
} from './';

let ENTITY_STATES = [
    ...deployCommandLineRoute,
    ...deployCommandLinePopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DeployCommandLineComponent,
        DeployCommandLineDetailComponent,
        DeployCommandLineDialogComponent,
        DeployCommandLineDeleteDialogComponent,
        DeployCommandLinePopupComponent,
        DeployCommandLineDeletePopupComponent,
    ],
    entryComponents: [
        DeployCommandLineComponent,
        DeployCommandLineDialogComponent,
        DeployCommandLinePopupComponent,
        DeployCommandLineDeleteDialogComponent,
        DeployCommandLineDeletePopupComponent,
    ],
    providers: [
        DeployCommandLineService,
        DeployCommandLinePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsDeployCommandLineModule {}

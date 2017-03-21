import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    ApplicationService,
    ApplicationPopupService,
    ApplicationComponent,
    ApplicationDetailComponent,
    ApplicationDialogComponent,
    ApplicationPopupComponent,
    ApplicationDeletePopupComponent,
    ApplicationDeleteDialogComponent,
    applicationRoute,
    applicationPopupRoute,
} from './';

let ENTITY_STATES = [
    ...applicationRoute,
    ...applicationPopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ApplicationComponent,
        ApplicationDetailComponent,
        ApplicationDialogComponent,
        ApplicationDeleteDialogComponent,
        ApplicationPopupComponent,
        ApplicationDeletePopupComponent,
    ],
    entryComponents: [
        ApplicationComponent,
        ApplicationDialogComponent,
        ApplicationPopupComponent,
        ApplicationDeleteDialogComponent,
        ApplicationDeletePopupComponent,
    ],
    providers: [
        ApplicationService,
        ApplicationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsApplicationModule {}

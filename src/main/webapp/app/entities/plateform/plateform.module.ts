import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    PlateformService,
    PlateformPopupService,
    PlateformComponent,
    PlateformDetailComponent,
    PlateformDialogComponent,
    PlateformPopupComponent,
    PlateformDeletePopupComponent,
    PlateformDeleteDialogComponent,
    plateformRoute,
    plateformPopupRoute,
} from './';

let ENTITY_STATES = [
    ...plateformRoute,
    ...plateformPopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PlateformComponent,
        PlateformDetailComponent,
        PlateformDialogComponent,
        PlateformDeleteDialogComponent,
        PlateformPopupComponent,
        PlateformDeletePopupComponent,
    ],
    entryComponents: [
        PlateformComponent,
        PlateformDialogComponent,
        PlateformPopupComponent,
        PlateformDeleteDialogComponent,
        PlateformDeletePopupComponent,
    ],
    providers: [
        PlateformService,
        PlateformPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsPlateformModule {}

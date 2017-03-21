import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    UserDeliveryService,
    UserDeliveryPopupService,
    UserDeliveryComponent,
    UserDeliveryDetailComponent,
    UserDeliveryDialogComponent,
    UserDeliveryPopupComponent,
    UserDeliveryDeletePopupComponent,
    UserDeliveryDeleteDialogComponent,
    userDeliveryRoute,
    userDeliveryPopupRoute,
} from './';

let ENTITY_STATES = [
    ...userDeliveryRoute,
    ...userDeliveryPopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserDeliveryComponent,
        UserDeliveryDetailComponent,
        UserDeliveryDialogComponent,
        UserDeliveryDeleteDialogComponent,
        UserDeliveryPopupComponent,
        UserDeliveryDeletePopupComponent,
    ],
    entryComponents: [
        UserDeliveryComponent,
        UserDeliveryDialogComponent,
        UserDeliveryPopupComponent,
        UserDeliveryDeleteDialogComponent,
        UserDeliveryDeletePopupComponent,
    ],
    providers: [
        UserDeliveryService,
        UserDeliveryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsUserDeliveryModule {}

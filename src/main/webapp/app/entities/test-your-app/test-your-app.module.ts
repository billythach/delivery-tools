import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    TestYourAppService,
    TestYourAppPopupService,
    TestYourAppComponent,
    TestYourAppDetailComponent,
    TestYourAppDialogComponent,
    TestYourAppPopupComponent,
    TestYourAppDeletePopupComponent,
    TestYourAppDeleteDialogComponent,
    testYourAppRoute,
    testYourAppPopupRoute,
} from './';

let ENTITY_STATES = [
    ...testYourAppRoute,
    ...testYourAppPopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TestYourAppComponent,
        TestYourAppDetailComponent,
        TestYourAppDialogComponent,
        TestYourAppDeleteDialogComponent,
        TestYourAppPopupComponent,
        TestYourAppDeletePopupComponent,
    ],
    entryComponents: [
        TestYourAppComponent,
        TestYourAppDialogComponent,
        TestYourAppPopupComponent,
        TestYourAppDeleteDialogComponent,
        TestYourAppDeletePopupComponent,
    ],
    providers: [
        TestYourAppService,
        TestYourAppPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsTestYourAppModule {}

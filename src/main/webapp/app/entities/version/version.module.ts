import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryToolsSharedModule } from '../../shared';

import {
    VersionService,
    VersionPopupService,
    VersionComponent,
    VersionDetailComponent,
    VersionDialogComponent,
    VersionPopupComponent,
    VersionDeletePopupComponent,
    VersionDeleteDialogComponent,
    versionRoute,
    versionPopupRoute,
} from './';

let ENTITY_STATES = [
    ...versionRoute,
    ...versionPopupRoute,
];

@NgModule({
    imports: [
        DeliveryToolsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VersionComponent,
        VersionDetailComponent,
        VersionDialogComponent,
        VersionDeleteDialogComponent,
        VersionPopupComponent,
        VersionDeletePopupComponent,
    ],
    entryComponents: [
        VersionComponent,
        VersionDialogComponent,
        VersionPopupComponent,
        VersionDeleteDialogComponent,
        VersionDeletePopupComponent,
    ],
    providers: [
        VersionService,
        VersionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsVersionModule {}

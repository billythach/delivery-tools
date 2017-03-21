import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeliveryToolsApplicationModule } from './application/application.module';
import { DeliveryToolsDeployCommandLineModule } from './deploy-command-line/deploy-command-line.module';
import { DeliveryToolsDeploymentModule } from './deployment/deployment.module';
import { DeliveryToolsIssueModule } from './issue/issue.module';
import { DeliveryToolsPlateformModule } from './plateform/plateform.module';
import { DeliveryToolsTestYourAppModule } from './test-your-app/test-your-app.module';
import { DeliveryToolsUserDeliveryModule } from './user-delivery/user-delivery.module';
import { DeliveryToolsVersionModule } from './version/version.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DeliveryToolsApplicationModule,
        DeliveryToolsDeployCommandLineModule,
        DeliveryToolsDeploymentModule,
        DeliveryToolsIssueModule,
        DeliveryToolsPlateformModule,
        DeliveryToolsTestYourAppModule,
        DeliveryToolsUserDeliveryModule,
        DeliveryToolsVersionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryToolsEntityModule {}

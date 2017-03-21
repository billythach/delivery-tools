import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DeploymentComponent } from './deployment.component';
import { DeploymentDetailComponent } from './deployment-detail.component';
import { DeploymentPopupComponent } from './deployment-dialog.component';
import { DeploymentDeletePopupComponent } from './deployment-delete-dialog.component';

import { Principal } from '../../shared';


export const deploymentRoute: Routes = [
  {
    path: 'deployment',
    component: DeploymentComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployment.home.title'
    }
  }, {
    path: 'deployment/:id',
    component: DeploymentDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployment.home.title'
    }
  }
];

export const deploymentPopupRoute: Routes = [
  {
    path: 'deployment-new',
    component: DeploymentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployment.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'deployment/:id/edit',
    component: DeploymentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployment.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'deployment/:id/delete',
    component: DeploymentDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployment.home.title'
    },
    outlet: 'popup'
  }
];

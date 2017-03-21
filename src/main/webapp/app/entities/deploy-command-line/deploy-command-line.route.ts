import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DeployCommandLineComponent } from './deploy-command-line.component';
import { DeployCommandLineDetailComponent } from './deploy-command-line-detail.component';
import { DeployCommandLinePopupComponent } from './deploy-command-line-dialog.component';
import { DeployCommandLineDeletePopupComponent } from './deploy-command-line-delete-dialog.component';

import { Principal } from '../../shared';


export const deployCommandLineRoute: Routes = [
  {
    path: 'deploy-command-line',
    component: DeployCommandLineComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployCommandLine.home.title'
    }
  }, {
    path: 'deploy-command-line/:id',
    component: DeployCommandLineDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployCommandLine.home.title'
    }
  }
];

export const deployCommandLinePopupRoute: Routes = [
  {
    path: 'deploy-command-line-new',
    component: DeployCommandLinePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployCommandLine.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'deploy-command-line/:id/edit',
    component: DeployCommandLinePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployCommandLine.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'deploy-command-line/:id/delete',
    component: DeployCommandLineDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.deployCommandLine.home.title'
    },
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { VersionComponent } from './version.component';
import { VersionDetailComponent } from './version-detail.component';
import { VersionPopupComponent } from './version-dialog.component';
import { VersionDeletePopupComponent } from './version-delete-dialog.component';

import { Principal } from '../../shared';


export const versionRoute: Routes = [
  {
    path: 'version',
    component: VersionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.version.home.title'
    }
  }, {
    path: 'version/:id',
    component: VersionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.version.home.title'
    }
  }
];

export const versionPopupRoute: Routes = [
  {
    path: 'version-new',
    component: VersionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.version.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'version/:id/edit',
    component: VersionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.version.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'version/:id/delete',
    component: VersionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.version.home.title'
    },
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PlateformComponent } from './plateform.component';
import { PlateformDetailComponent } from './plateform-detail.component';
import { PlateformPopupComponent } from './plateform-dialog.component';
import { PlateformDeletePopupComponent } from './plateform-delete-dialog.component';

import { Principal } from '../../shared';


export const plateformRoute: Routes = [
  {
    path: 'plateform',
    component: PlateformComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.plateform.home.title'
    }
  }, {
    path: 'plateform/:id',
    component: PlateformDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.plateform.home.title'
    }
  }
];

export const plateformPopupRoute: Routes = [
  {
    path: 'plateform-new',
    component: PlateformPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.plateform.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'plateform/:id/edit',
    component: PlateformPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.plateform.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'plateform/:id/delete',
    component: PlateformDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.plateform.home.title'
    },
    outlet: 'popup'
  }
];

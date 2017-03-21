import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { UserDeliveryComponent } from './user-delivery.component';
import { UserDeliveryDetailComponent } from './user-delivery-detail.component';
import { UserDeliveryPopupComponent } from './user-delivery-dialog.component';
import { UserDeliveryDeletePopupComponent } from './user-delivery-delete-dialog.component';

import { Principal } from '../../shared';


export const userDeliveryRoute: Routes = [
  {
    path: 'user-delivery',
    component: UserDeliveryComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.userDelivery.home.title'
    }
  }, {
    path: 'user-delivery/:id',
    component: UserDeliveryDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.userDelivery.home.title'
    }
  }
];

export const userDeliveryPopupRoute: Routes = [
  {
    path: 'user-delivery-new',
    component: UserDeliveryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.userDelivery.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'user-delivery/:id/edit',
    component: UserDeliveryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.userDelivery.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'user-delivery/:id/delete',
    component: UserDeliveryDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.userDelivery.home.title'
    },
    outlet: 'popup'
  }
];

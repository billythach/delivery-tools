import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TestYourAppComponent } from './test-your-app.component';
import { TestYourAppDetailComponent } from './test-your-app-detail.component';
import { TestYourAppPopupComponent } from './test-your-app-dialog.component';
import { TestYourAppDeletePopupComponent } from './test-your-app-delete-dialog.component';

import { Principal } from '../../shared';


export const testYourAppRoute: Routes = [
  {
    path: 'test-your-app',
    component: TestYourAppComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.testYourApp.home.title'
    }
  }, {
    path: 'test-your-app/:id',
    component: TestYourAppDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.testYourApp.home.title'
    }
  }
];

export const testYourAppPopupRoute: Routes = [
  {
    path: 'test-your-app-new',
    component: TestYourAppPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.testYourApp.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'test-your-app/:id/edit',
    component: TestYourAppPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.testYourApp.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'test-your-app/:id/delete',
    component: TestYourAppDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.testYourApp.home.title'
    },
    outlet: 'popup'
  }
];

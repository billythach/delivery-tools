import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { IssueComponent } from './issue.component';
import { IssueDetailComponent } from './issue-detail.component';
import { IssuePopupComponent } from './issue-dialog.component';
import { IssueDeletePopupComponent } from './issue-delete-dialog.component';

import { Principal } from '../../shared';


export const issueRoute: Routes = [
  {
    path: 'issue',
    component: IssueComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.issue.home.title'
    }
  }, {
    path: 'issue/:id',
    component: IssueDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.issue.home.title'
    }
  }
];

export const issuePopupRoute: Routes = [
  {
    path: 'issue-new',
    component: IssuePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.issue.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'issue/:id/edit',
    component: IssuePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.issue.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'issue/:id/delete',
    component: IssueDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'deliveryToolsApp.issue.home.title'
    },
    outlet: 'popup'
  }
];

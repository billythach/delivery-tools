import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Issue } from './issue.model';
import { IssuePopupService } from './issue-popup.service';
import { IssueService } from './issue.service';
import { Deployment, DeploymentService } from '../deployment';
@Component({
    selector: 'jhi-issue-dialog',
    templateUrl: './issue-dialog.component.html'
})
export class IssueDialogComponent implements OnInit {

    issue: Issue;
    authorities: any[];
    isSaving: boolean;

    deployments: Deployment[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private issueService: IssueService,
        private deploymentService: DeploymentService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['issue', 'issueStatus']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.deploymentService.query().subscribe(
            (res: Response) => { this.deployments = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.issue.id !== undefined) {
            this.issueService.update(this.issue)
                .subscribe((res: Issue) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.issueService.create(this.issue)
                .subscribe((res: Issue) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Issue) {
        this.eventManager.broadcast({ name: 'issueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackDeploymentById(index: number, item: Deployment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-issue-popup',
    template: ''
})
export class IssuePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private issuePopupService: IssuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.issuePopupService
                    .open(IssueDialogComponent, params['id']);
            } else {
                this.modalRef = this.issuePopupService
                    .open(IssueDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

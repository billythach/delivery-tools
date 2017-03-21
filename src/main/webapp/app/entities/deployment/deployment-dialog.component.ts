import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Deployment } from './deployment.model';
import { DeploymentPopupService } from './deployment-popup.service';
import { DeploymentService } from './deployment.service';
import { Issue, IssueService } from '../issue';
import { UserDelivery, UserDeliveryService } from '../user-delivery';
import { Plateform, PlateformService } from '../plateform';
import { Version, VersionService } from '../version';
@Component({
    selector: 'jhi-deployment-dialog',
    templateUrl: './deployment-dialog.component.html'
})
export class DeploymentDialogComponent implements OnInit {

    deployment: Deployment;
    authorities: any[];
    isSaving: boolean;

    issues: Issue[];

    userdeliveries: UserDelivery[];

    plateforms: Plateform[];

    versions: Version[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private deploymentService: DeploymentService,
        private issueService: IssueService,
        private userDeliveryService: UserDeliveryService,
        private plateformService: PlateformService,
        private versionService: VersionService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['deployment']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.issueService.query().subscribe(
            (res: Response) => { this.issues = res.json(); }, (res: Response) => this.onError(res.json()));
        this.userDeliveryService.query().subscribe(
            (res: Response) => { this.userdeliveries = res.json(); }, (res: Response) => this.onError(res.json()));
        this.plateformService.query().subscribe(
            (res: Response) => { this.plateforms = res.json(); }, (res: Response) => this.onError(res.json()));
        this.versionService.query().subscribe(
            (res: Response) => { this.versions = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.deployment.id !== undefined) {
            this.deploymentService.update(this.deployment)
                .subscribe((res: Deployment) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.deploymentService.create(this.deployment)
                .subscribe((res: Deployment) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Deployment) {
        this.eventManager.broadcast({ name: 'deploymentListModification', content: 'OK'});
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

    trackIssueById(index: number, item: Issue) {
        return item.id;
    }

    trackUserDeliveryById(index: number, item: UserDelivery) {
        return item.id;
    }

    trackPlateformById(index: number, item: Plateform) {
        return item.id;
    }

    trackVersionById(index: number, item: Version) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-deployment-popup',
    template: ''
})
export class DeploymentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private deploymentPopupService: DeploymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.deploymentPopupService
                    .open(DeploymentDialogComponent, params['id']);
            } else {
                this.modalRef = this.deploymentPopupService
                    .open(DeploymentDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

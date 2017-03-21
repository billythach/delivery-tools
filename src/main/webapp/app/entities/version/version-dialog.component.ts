import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Version } from './version.model';
import { VersionPopupService } from './version-popup.service';
import { VersionService } from './version.service';
import { Application, ApplicationService } from '../application';
import { Deployment, DeploymentService } from '../deployment';
@Component({
    selector: 'jhi-version-dialog',
    templateUrl: './version-dialog.component.html'
})
export class VersionDialogComponent implements OnInit {

    version: Version;
    authorities: any[];
    isSaving: boolean;

    applications: Application[];

    deployments: Deployment[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private versionService: VersionService,
        private applicationService: ApplicationService,
        private deploymentService: DeploymentService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['version']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.applicationService.query().subscribe(
            (res: Response) => { this.applications = res.json(); }, (res: Response) => this.onError(res.json()));
        this.deploymentService.query().subscribe(
            (res: Response) => { this.deployments = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.version.id !== undefined) {
            this.versionService.update(this.version)
                .subscribe((res: Version) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.versionService.create(this.version)
                .subscribe((res: Version) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Version) {
        this.eventManager.broadcast({ name: 'versionListModification', content: 'OK'});
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

    trackApplicationById(index: number, item: Application) {
        return item.id;
    }

    trackDeploymentById(index: number, item: Deployment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-version-popup',
    template: ''
})
export class VersionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private versionPopupService: VersionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.versionPopupService
                    .open(VersionDialogComponent, params['id']);
            } else {
                this.modalRef = this.versionPopupService
                    .open(VersionDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Plateform } from './plateform.model';
import { PlateformPopupService } from './plateform-popup.service';
import { PlateformService } from './plateform.service';
import { Deployment, DeploymentService } from '../deployment';
import { TestYourApp, TestYourAppService } from '../test-your-app';
import { DeployCommandLine, DeployCommandLineService } from '../deploy-command-line';
@Component({
    selector: 'jhi-plateform-dialog',
    templateUrl: './plateform-dialog.component.html'
})
export class PlateformDialogComponent implements OnInit {

    plateform: Plateform;
    authorities: any[];
    isSaving: boolean;

    deployments: Deployment[];

    testyourapps: TestYourApp[];

    deploycommandlines: DeployCommandLine[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private plateformService: PlateformService,
        private deploymentService: DeploymentService,
        private testYourAppService: TestYourAppService,
        private deployCommandLineService: DeployCommandLineService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['plateform']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.deploymentService.query().subscribe(
            (res: Response) => { this.deployments = res.json(); }, (res: Response) => this.onError(res.json()));
        this.testYourAppService.query().subscribe(
            (res: Response) => { this.testyourapps = res.json(); }, (res: Response) => this.onError(res.json()));
        this.deployCommandLineService.query().subscribe(
            (res: Response) => { this.deploycommandlines = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.plateform.id !== undefined) {
            this.plateformService.update(this.plateform)
                .subscribe((res: Plateform) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.plateformService.create(this.plateform)
                .subscribe((res: Plateform) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Plateform) {
        this.eventManager.broadcast({ name: 'plateformListModification', content: 'OK'});
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

    trackTestYourAppById(index: number, item: TestYourApp) {
        return item.id;
    }

    trackDeployCommandLineById(index: number, item: DeployCommandLine) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-plateform-popup',
    template: ''
})
export class PlateformPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private plateformPopupService: PlateformPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.plateformPopupService
                    .open(PlateformDialogComponent, params['id']);
            } else {
                this.modalRef = this.plateformPopupService
                    .open(PlateformDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

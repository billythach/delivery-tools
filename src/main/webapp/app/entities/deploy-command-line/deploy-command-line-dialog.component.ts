import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { DeployCommandLine } from './deploy-command-line.model';
import { DeployCommandLinePopupService } from './deploy-command-line-popup.service';
import { DeployCommandLineService } from './deploy-command-line.service';
import { Application, ApplicationService } from '../application';
import { Plateform, PlateformService } from '../plateform';
@Component({
    selector: 'jhi-deploy-command-line-dialog',
    templateUrl: './deploy-command-line-dialog.component.html'
})
export class DeployCommandLineDialogComponent implements OnInit {

    deployCommandLine: DeployCommandLine;
    authorities: any[];
    isSaving: boolean;

    applications: Application[];

    plateforms: Plateform[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private deployCommandLineService: DeployCommandLineService,
        private applicationService: ApplicationService,
        private plateformService: PlateformService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['deployCommandLine']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.applicationService.query().subscribe(
            (res: Response) => { this.applications = res.json(); }, (res: Response) => this.onError(res.json()));
        this.plateformService.query().subscribe(
            (res: Response) => { this.plateforms = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.deployCommandLine.id !== undefined) {
            this.deployCommandLineService.update(this.deployCommandLine)
                .subscribe((res: DeployCommandLine) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.deployCommandLineService.create(this.deployCommandLine)
                .subscribe((res: DeployCommandLine) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: DeployCommandLine) {
        this.eventManager.broadcast({ name: 'deployCommandLineListModification', content: 'OK'});
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

    trackPlateformById(index: number, item: Plateform) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-deploy-command-line-popup',
    template: ''
})
export class DeployCommandLinePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private deployCommandLinePopupService: DeployCommandLinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.deployCommandLinePopupService
                    .open(DeployCommandLineDialogComponent, params['id']);
            } else {
                this.modalRef = this.deployCommandLinePopupService
                    .open(DeployCommandLineDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

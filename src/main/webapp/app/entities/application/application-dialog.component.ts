import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Application } from './application.model';
import { ApplicationPopupService } from './application-popup.service';
import { ApplicationService } from './application.service';
import { Version, VersionService } from '../version';
import { TestYourApp, TestYourAppService } from '../test-your-app';
import { DeployCommandLine, DeployCommandLineService } from '../deploy-command-line';
@Component({
    selector: 'jhi-application-dialog',
    templateUrl: './application-dialog.component.html'
})
export class ApplicationDialogComponent implements OnInit {

    application: Application;
    authorities: any[];
    isSaving: boolean;

    versions: Version[];

    testyourapps: TestYourApp[];

    deploycommandlines: DeployCommandLine[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private applicationService: ApplicationService,
        private versionService: VersionService,
        private testYourAppService: TestYourAppService,
        private deployCommandLineService: DeployCommandLineService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['application']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.versionService.query().subscribe(
            (res: Response) => { this.versions = res.json(); }, (res: Response) => this.onError(res.json()));
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
        if (this.application.id !== undefined) {
            this.applicationService.update(this.application)
                .subscribe((res: Application) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.applicationService.create(this.application)
                .subscribe((res: Application) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Application) {
        this.eventManager.broadcast({ name: 'applicationListModification', content: 'OK'});
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

    trackVersionById(index: number, item: Version) {
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
    selector: 'jhi-application-popup',
    template: ''
})
export class ApplicationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private applicationPopupService: ApplicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.applicationPopupService
                    .open(ApplicationDialogComponent, params['id']);
            } else {
                this.modalRef = this.applicationPopupService
                    .open(ApplicationDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

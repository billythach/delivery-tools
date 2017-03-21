import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TestYourApp } from './test-your-app.model';
import { TestYourAppPopupService } from './test-your-app-popup.service';
import { TestYourAppService } from './test-your-app.service';
import { Application, ApplicationService } from '../application';
import { Plateform, PlateformService } from '../plateform';
@Component({
    selector: 'jhi-test-your-app-dialog',
    templateUrl: './test-your-app-dialog.component.html'
})
export class TestYourAppDialogComponent implements OnInit {

    testYourApp: TestYourApp;
    authorities: any[];
    isSaving: boolean;

    applications: Application[];

    plateforms: Plateform[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private testYourAppService: TestYourAppService,
        private applicationService: ApplicationService,
        private plateformService: PlateformService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['testYourApp']);
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
        if (this.testYourApp.id !== undefined) {
            this.testYourAppService.update(this.testYourApp)
                .subscribe((res: TestYourApp) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.testYourAppService.create(this.testYourApp)
                .subscribe((res: TestYourApp) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: TestYourApp) {
        this.eventManager.broadcast({ name: 'testYourAppListModification', content: 'OK'});
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
    selector: 'jhi-test-your-app-popup',
    template: ''
})
export class TestYourAppPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private testYourAppPopupService: TestYourAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.testYourAppPopupService
                    .open(TestYourAppDialogComponent, params['id']);
            } else {
                this.modalRef = this.testYourAppPopupService
                    .open(TestYourAppDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

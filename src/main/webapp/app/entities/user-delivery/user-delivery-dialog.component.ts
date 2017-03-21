import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { UserDelivery } from './user-delivery.model';
import { UserDeliveryPopupService } from './user-delivery-popup.service';
import { UserDeliveryService } from './user-delivery.service';
import { Deployment, DeploymentService } from '../deployment';
@Component({
    selector: 'jhi-user-delivery-dialog',
    templateUrl: './user-delivery-dialog.component.html'
})
export class UserDeliveryDialogComponent implements OnInit {

    userDelivery: UserDelivery;
    authorities: any[];
    isSaving: boolean;

    deployments: Deployment[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private userDeliveryService: UserDeliveryService,
        private deploymentService: DeploymentService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['userDelivery', 'userDeliveryType']);
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
        if (this.userDelivery.id !== undefined) {
            this.userDeliveryService.update(this.userDelivery)
                .subscribe((res: UserDelivery) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.userDeliveryService.create(this.userDelivery)
                .subscribe((res: UserDelivery) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: UserDelivery) {
        this.eventManager.broadcast({ name: 'userDeliveryListModification', content: 'OK'});
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
    selector: 'jhi-user-delivery-popup',
    template: ''
})
export class UserDeliveryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private userDeliveryPopupService: UserDeliveryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.userDeliveryPopupService
                    .open(UserDeliveryDialogComponent, params['id']);
            } else {
                this.modalRef = this.userDeliveryPopupService
                    .open(UserDeliveryDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

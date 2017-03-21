import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Deployment } from './deployment.model';
import { DeploymentPopupService } from './deployment-popup.service';
import { DeploymentService } from './deployment.service';

@Component({
    selector: 'jhi-deployment-delete-dialog',
    templateUrl: './deployment-delete-dialog.component.html'
})
export class DeploymentDeleteDialogComponent {

    deployment: Deployment;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deploymentService: DeploymentService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['deployment']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.deploymentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deploymentListModification',
                content: 'Deleted an deployment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-deployment-delete-popup',
    template: ''
})
export class DeploymentDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private deploymentPopupService: DeploymentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.deploymentPopupService
                .open(DeploymentDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

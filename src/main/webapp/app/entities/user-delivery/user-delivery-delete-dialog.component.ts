import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { UserDelivery } from './user-delivery.model';
import { UserDeliveryPopupService } from './user-delivery-popup.service';
import { UserDeliveryService } from './user-delivery.service';

@Component({
    selector: 'jhi-user-delivery-delete-dialog',
    templateUrl: './user-delivery-delete-dialog.component.html'
})
export class UserDeliveryDeleteDialogComponent {

    userDelivery: UserDelivery;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private userDeliveryService: UserDeliveryService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['userDelivery', 'userDeliveryType']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.userDeliveryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userDeliveryListModification',
                content: 'Deleted an userDelivery'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-delivery-delete-popup',
    template: ''
})
export class UserDeliveryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private userDeliveryPopupService: UserDeliveryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.userDeliveryPopupService
                .open(UserDeliveryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

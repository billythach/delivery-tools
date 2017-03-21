import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Plateform } from './plateform.model';
import { PlateformPopupService } from './plateform-popup.service';
import { PlateformService } from './plateform.service';

@Component({
    selector: 'jhi-plateform-delete-dialog',
    templateUrl: './plateform-delete-dialog.component.html'
})
export class PlateformDeleteDialogComponent {

    plateform: Plateform;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private plateformService: PlateformService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['plateform']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.plateformService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'plateformListModification',
                content: 'Deleted an plateform'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plateform-delete-popup',
    template: ''
})
export class PlateformDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private plateformPopupService: PlateformPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.plateformPopupService
                .open(PlateformDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

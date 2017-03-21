import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Version } from './version.model';
import { VersionPopupService } from './version-popup.service';
import { VersionService } from './version.service';

@Component({
    selector: 'jhi-version-delete-dialog',
    templateUrl: './version-delete-dialog.component.html'
})
export class VersionDeleteDialogComponent {

    version: Version;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private versionService: VersionService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['version']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.versionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'versionListModification',
                content: 'Deleted an version'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-version-delete-popup',
    template: ''
})
export class VersionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private versionPopupService: VersionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.versionPopupService
                .open(VersionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

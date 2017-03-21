import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TestYourApp } from './test-your-app.model';
import { TestYourAppPopupService } from './test-your-app-popup.service';
import { TestYourAppService } from './test-your-app.service';

@Component({
    selector: 'jhi-test-your-app-delete-dialog',
    templateUrl: './test-your-app-delete-dialog.component.html'
})
export class TestYourAppDeleteDialogComponent {

    testYourApp: TestYourApp;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private testYourAppService: TestYourAppService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['testYourApp']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.testYourAppService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'testYourAppListModification',
                content: 'Deleted an testYourApp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-test-your-app-delete-popup',
    template: ''
})
export class TestYourAppDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private testYourAppPopupService: TestYourAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.testYourAppPopupService
                .open(TestYourAppDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

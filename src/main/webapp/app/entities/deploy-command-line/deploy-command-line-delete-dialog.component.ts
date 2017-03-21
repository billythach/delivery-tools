import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { DeployCommandLine } from './deploy-command-line.model';
import { DeployCommandLinePopupService } from './deploy-command-line-popup.service';
import { DeployCommandLineService } from './deploy-command-line.service';

@Component({
    selector: 'jhi-deploy-command-line-delete-dialog',
    templateUrl: './deploy-command-line-delete-dialog.component.html'
})
export class DeployCommandLineDeleteDialogComponent {

    deployCommandLine: DeployCommandLine;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deployCommandLineService: DeployCommandLineService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['deployCommandLine']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.deployCommandLineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deployCommandLineListModification',
                content: 'Deleted an deployCommandLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-deploy-command-line-delete-popup',
    template: ''
})
export class DeployCommandLineDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private deployCommandLinePopupService: DeployCommandLinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.deployCommandLinePopupService
                .open(DeployCommandLineDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

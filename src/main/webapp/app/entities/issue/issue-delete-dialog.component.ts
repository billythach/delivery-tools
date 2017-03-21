import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Issue } from './issue.model';
import { IssuePopupService } from './issue-popup.service';
import { IssueService } from './issue.service';

@Component({
    selector: 'jhi-issue-delete-dialog',
    templateUrl: './issue-delete-dialog.component.html'
})
export class IssueDeleteDialogComponent {

    issue: Issue;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private issueService: IssueService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['issue', 'issueStatus']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.issueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'issueListModification',
                content: 'Deleted an issue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-issue-delete-popup',
    template: ''
})
export class IssueDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private issuePopupService: IssuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.issuePopupService
                .open(IssueDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TestYourApp } from './test-your-app.model';
import { TestYourAppService } from './test-your-app.service';
@Injectable()
export class TestYourAppPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private testYourAppService: TestYourAppService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.testYourAppService.find(id).subscribe(testYourApp => {
                this.testYourAppModalRef(component, testYourApp);
            });
        } else {
            return this.testYourAppModalRef(component, new TestYourApp());
        }
    }

    testYourAppModalRef(component: Component, testYourApp: TestYourApp): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.testYourApp = testYourApp;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}

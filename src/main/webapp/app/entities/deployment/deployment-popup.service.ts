import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Deployment } from './deployment.model';
import { DeploymentService } from './deployment.service';
@Injectable()
export class DeploymentPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private deploymentService: DeploymentService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.deploymentService.find(id).subscribe(deployment => {
                deployment.date = this.datePipe
                    .transform(deployment.date, 'yyyy-MM-ddThh:mm');
                this.deploymentModalRef(component, deployment);
            });
        } else {
            return this.deploymentModalRef(component, new Deployment());
        }
    }

    deploymentModalRef(component: Component, deployment: Deployment): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.deployment = deployment;
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

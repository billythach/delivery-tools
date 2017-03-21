import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeployCommandLine } from './deploy-command-line.model';
import { DeployCommandLineService } from './deploy-command-line.service';
@Injectable()
export class DeployCommandLinePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private deployCommandLineService: DeployCommandLineService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.deployCommandLineService.find(id).subscribe(deployCommandLine => {
                this.deployCommandLineModalRef(component, deployCommandLine);
            });
        } else {
            return this.deployCommandLineModalRef(component, new DeployCommandLine());
        }
    }

    deployCommandLineModalRef(component: Component, deployCommandLine: DeployCommandLine): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.deployCommandLine = deployCommandLine;
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

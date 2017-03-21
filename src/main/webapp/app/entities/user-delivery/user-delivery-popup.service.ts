import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserDelivery } from './user-delivery.model';
import { UserDeliveryService } from './user-delivery.service';
@Injectable()
export class UserDeliveryPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private userDeliveryService: UserDeliveryService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.userDeliveryService.find(id).subscribe(userDelivery => {
                this.userDeliveryModalRef(component, userDelivery);
            });
        } else {
            return this.userDeliveryModalRef(component, new UserDelivery());
        }
    }

    userDeliveryModalRef(component: Component, userDelivery: UserDelivery): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userDelivery = userDelivery;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { UserDelivery } from './user-delivery.model';
import { UserDeliveryService } from './user-delivery.service';

@Component({
    selector: 'jhi-user-delivery-detail',
    templateUrl: './user-delivery-detail.component.html'
})
export class UserDeliveryDetailComponent implements OnInit, OnDestroy {

    userDelivery: UserDelivery;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private userDeliveryService: UserDeliveryService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['userDelivery', 'userDeliveryType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.userDeliveryService.find(id).subscribe(userDelivery => {
            this.userDelivery = userDelivery;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

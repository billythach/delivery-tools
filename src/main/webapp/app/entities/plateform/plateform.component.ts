import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Plateform } from './plateform.model';
import { PlateformService } from './plateform.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-plateform',
    templateUrl: './plateform.component.html'
})
export class PlateformComponent implements OnInit, OnDestroy {
plateforms: Plateform[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private plateformService: PlateformService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['plateform']);
    }

    loadAll() {
        this.plateformService.query().subscribe(
            (res: Response) => {
                this.plateforms = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPlateforms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Plateform) {
        return item.id;
    }



    registerChangeInPlateforms() {
        this.eventSubscriber = this.eventManager.subscribe('plateformListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

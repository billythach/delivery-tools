import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { TestYourApp } from './test-your-app.model';
import { TestYourAppService } from './test-your-app.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-test-your-app',
    templateUrl: './test-your-app.component.html'
})
export class TestYourAppComponent implements OnInit, OnDestroy {
testYourApps: TestYourApp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private testYourAppService: TestYourAppService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['testYourApp']);
    }

    loadAll() {
        this.testYourAppService.query().subscribe(
            (res: Response) => {
                this.testYourApps = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTestYourApps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: TestYourApp) {
        return item.id;
    }



    registerChangeInTestYourApps() {
        this.eventSubscriber = this.eventManager.subscribe('testYourAppListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

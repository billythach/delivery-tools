import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { DeployCommandLine } from './deploy-command-line.model';
import { DeployCommandLineService } from './deploy-command-line.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-deploy-command-line',
    templateUrl: './deploy-command-line.component.html'
})
export class DeployCommandLineComponent implements OnInit, OnDestroy {
deployCommandLines: DeployCommandLine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deployCommandLineService: DeployCommandLineService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['deployCommandLine']);
    }

    loadAll() {
        this.deployCommandLineService.query().subscribe(
            (res: Response) => {
                this.deployCommandLines = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDeployCommandLines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: DeployCommandLine) {
        return item.id;
    }



    registerChangeInDeployCommandLines() {
        this.eventSubscriber = this.eventManager.subscribe('deployCommandLineListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

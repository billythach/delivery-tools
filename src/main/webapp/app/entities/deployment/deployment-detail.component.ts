import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Deployment } from './deployment.model';
import { DeploymentService } from './deployment.service';

@Component({
    selector: 'jhi-deployment-detail',
    templateUrl: './deployment-detail.component.html'
})
export class DeploymentDetailComponent implements OnInit, OnDestroy {

    deployment: Deployment;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deploymentService: DeploymentService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['deployment']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.deploymentService.find(id).subscribe(deployment => {
            this.deployment = deployment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

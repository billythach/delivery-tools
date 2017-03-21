import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { DeployCommandLine } from './deploy-command-line.model';
import { DeployCommandLineService } from './deploy-command-line.service';

@Component({
    selector: 'jhi-deploy-command-line-detail',
    templateUrl: './deploy-command-line-detail.component.html'
})
export class DeployCommandLineDetailComponent implements OnInit, OnDestroy {

    deployCommandLine: DeployCommandLine;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deployCommandLineService: DeployCommandLineService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['deployCommandLine']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.deployCommandLineService.find(id).subscribe(deployCommandLine => {
            this.deployCommandLine = deployCommandLine;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TestYourApp } from './test-your-app.model';
import { TestYourAppService } from './test-your-app.service';

@Component({
    selector: 'jhi-test-your-app-detail',
    templateUrl: './test-your-app-detail.component.html'
})
export class TestYourAppDetailComponent implements OnInit, OnDestroy {

    testYourApp: TestYourApp;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private testYourAppService: TestYourAppService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['testYourApp']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.testYourAppService.find(id).subscribe(testYourApp => {
            this.testYourApp = testYourApp;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

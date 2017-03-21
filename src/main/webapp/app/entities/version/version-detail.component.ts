import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Version } from './version.model';
import { VersionService } from './version.service';

@Component({
    selector: 'jhi-version-detail',
    templateUrl: './version-detail.component.html'
})
export class VersionDetailComponent implements OnInit, OnDestroy {

    version: Version;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private versionService: VersionService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['version']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.versionService.find(id).subscribe(version => {
            this.version = version;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

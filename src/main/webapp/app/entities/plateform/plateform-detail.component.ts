import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Plateform } from './plateform.model';
import { PlateformService } from './plateform.service';

@Component({
    selector: 'jhi-plateform-detail',
    templateUrl: './plateform-detail.component.html'
})
export class PlateformDetailComponent implements OnInit, OnDestroy {

    plateform: Plateform;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private plateformService: PlateformService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['plateform']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.plateformService.find(id).subscribe(plateform => {
            this.plateform = plateform;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

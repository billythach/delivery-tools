import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Issue } from './issue.model';
import { IssueService } from './issue.service';

@Component({
    selector: 'jhi-issue-detail',
    templateUrl: './issue-detail.component.html'
})
export class IssueDetailComponent implements OnInit, OnDestroy {

    issue: Issue;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private issueService: IssueService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['issue', 'issueStatus']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.issueService.find(id).subscribe(issue => {
            this.issue = issue;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

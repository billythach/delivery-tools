import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IssueDetailComponent } from '../../../../../../main/webapp/app/entities/issue/issue-detail.component';
import { IssueService } from '../../../../../../main/webapp/app/entities/issue/issue.service';
import { Issue } from '../../../../../../main/webapp/app/entities/issue/issue.model';

describe('Component Tests', () => {

    describe('Issue Management Detail Component', () => {
        let comp: IssueDetailComponent;
        let fixture: ComponentFixture<IssueDetailComponent>;
        let service: IssueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [IssueDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    IssueService
                ]
            }).overrideComponent(IssueDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IssueDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IssueService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Issue(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.issue).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

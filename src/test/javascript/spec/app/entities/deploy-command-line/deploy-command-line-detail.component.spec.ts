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
import { DeployCommandLineDetailComponent } from '../../../../../../main/webapp/app/entities/deploy-command-line/deploy-command-line-detail.component';
import { DeployCommandLineService } from '../../../../../../main/webapp/app/entities/deploy-command-line/deploy-command-line.service';
import { DeployCommandLine } from '../../../../../../main/webapp/app/entities/deploy-command-line/deploy-command-line.model';

describe('Component Tests', () => {

    describe('DeployCommandLine Management Detail Component', () => {
        let comp: DeployCommandLineDetailComponent;
        let fixture: ComponentFixture<DeployCommandLineDetailComponent>;
        let service: DeployCommandLineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DeployCommandLineDetailComponent],
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
                    DeployCommandLineService
                ]
            }).overrideComponent(DeployCommandLineDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeployCommandLineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeployCommandLineService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DeployCommandLine(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.deployCommandLine).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

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
import { DeploymentDetailComponent } from '../../../../../../main/webapp/app/entities/deployment/deployment-detail.component';
import { DeploymentService } from '../../../../../../main/webapp/app/entities/deployment/deployment.service';
import { Deployment } from '../../../../../../main/webapp/app/entities/deployment/deployment.model';

describe('Component Tests', () => {

    describe('Deployment Management Detail Component', () => {
        let comp: DeploymentDetailComponent;
        let fixture: ComponentFixture<DeploymentDetailComponent>;
        let service: DeploymentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DeploymentDetailComponent],
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
                    DeploymentService
                ]
            }).overrideComponent(DeploymentDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeploymentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeploymentService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Deployment(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.deployment).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

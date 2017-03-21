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
import { TestYourAppDetailComponent } from '../../../../../../main/webapp/app/entities/test-your-app/test-your-app-detail.component';
import { TestYourAppService } from '../../../../../../main/webapp/app/entities/test-your-app/test-your-app.service';
import { TestYourApp } from '../../../../../../main/webapp/app/entities/test-your-app/test-your-app.model';

describe('Component Tests', () => {

    describe('TestYourApp Management Detail Component', () => {
        let comp: TestYourAppDetailComponent;
        let fixture: ComponentFixture<TestYourAppDetailComponent>;
        let service: TestYourAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TestYourAppDetailComponent],
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
                    TestYourAppService
                ]
            }).overrideComponent(TestYourAppDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestYourAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestYourAppService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TestYourApp(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.testYourApp).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

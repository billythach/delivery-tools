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
import { UserDeliveryDetailComponent } from '../../../../../../main/webapp/app/entities/user-delivery/user-delivery-detail.component';
import { UserDeliveryService } from '../../../../../../main/webapp/app/entities/user-delivery/user-delivery.service';
import { UserDelivery } from '../../../../../../main/webapp/app/entities/user-delivery/user-delivery.model';

describe('Component Tests', () => {

    describe('UserDelivery Management Detail Component', () => {
        let comp: UserDeliveryDetailComponent;
        let fixture: ComponentFixture<UserDeliveryDetailComponent>;
        let service: UserDeliveryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [UserDeliveryDetailComponent],
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
                    UserDeliveryService
                ]
            }).overrideComponent(UserDeliveryDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserDeliveryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserDeliveryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserDelivery(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userDelivery).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

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
import { PlateformDetailComponent } from '../../../../../../main/webapp/app/entities/plateform/plateform-detail.component';
import { PlateformService } from '../../../../../../main/webapp/app/entities/plateform/plateform.service';
import { Plateform } from '../../../../../../main/webapp/app/entities/plateform/plateform.model';

describe('Component Tests', () => {

    describe('Plateform Management Detail Component', () => {
        let comp: PlateformDetailComponent;
        let fixture: ComponentFixture<PlateformDetailComponent>;
        let service: PlateformService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [PlateformDetailComponent],
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
                    PlateformService
                ]
            }).overrideComponent(PlateformDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlateformDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlateformService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Plateform(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.plateform).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

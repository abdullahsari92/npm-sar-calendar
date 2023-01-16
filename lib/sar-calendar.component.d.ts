import { DatePipe } from '@angular/common';
import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SarCalendarComponent implements OnInit {
    datepipe: DatePipe;
    private elRef;
    startDate: EventEmitter<any>;
    activeMount: number;
    activeDay: number;
    activeYear: number;
    scrolllX: number;
    myDays: ElementRef;
    yearScroll: ElementRef;
    myCalendar: ElementRef;
    monthNames: any[];
    daysNames: any;
    IsYearUse: boolean;
    constructor(datepipe: DatePipe, elRef: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    scrollChange(deger: number): void;
    gunler: any[];
    days: any[];
    getDays(mount: number): void;
    getYear(year: any): void;
    yearAll: any[];
    getListYears(): void;
    getTodo(day: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SarCalendarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SarCalendarComponent, "sar-calendar", never, { "monthNames": "monthNames"; "daysNames": "daysNames"; "IsYearUse": "IsYearUse"; }, { "startDate": "startDate"; }, never, never>;
}

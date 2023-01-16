import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Output, ViewChild, Input, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class SarCalendarService {
    constructor() { }
}
SarCalendarService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SarCalendarService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class SarCalendarComponent {
    constructor(datepipe, elRef) {
        this.datepipe = datepipe;
        this.elRef = elRef;
        this.startDate = new EventEmitter();
        this.activeMount = new Date().getMonth() + 1;
        this.activeDay = new Date().getDate();
        this.activeYear = new Date().getFullYear();
        this.scrolllX = 0;
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.daysNames = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday ', Sat: 'Saturday', Sun: 'Sunday' };
        this.IsYearUse = true;
        this.gunler = [];
        this.days = [];
        this.yearAll = [];
    }
    ngOnInit() {
        this.getDays(this.activeMount);
        this.getTodo(this.activeDay);
        this.getListYears();
    }
    ngAfterViewInit() {
        var yearActive = this.elRef.nativeElement.querySelector('.yearActive');
        var dayActive = this.elRef.nativeElement.querySelector('.dayActive');
        var calendarWidth = this.myCalendar.nativeElement.offsetWidth;
        var calendarLeft = this.myCalendar.nativeElement.offsetLeft;
        this.myDays.nativeElement.scrollTo(dayActive.offsetLeft - calendarLeft - calendarWidth / 2, 0);
        if (this.IsYearUse) {
            this.scrolllX = yearActive.offsetLeft - calendarWidth / 4;
            this.yearScroll.nativeElement.scrollTo(this.scrolllX, 0);
        }
    }
    scrollChange(deger) {
        this.scrolllX = this.scrolllX + deger;
        this.yearScroll.nativeElement.scrollTo(this.scrolllX, 0);
    }
    getDays(mount) {
        this.days = [];
        var gunSayisi = new Date(this.activeYear, mount, 0).getDate(); // bir ayın içinde kaç gün olduğunu buluyor  
        this.activeMount = mount;
        for (let i = 1; i <= gunSayisi; i++) {
            var ta = mount.toString() + "/" + i.toString() + "/" + this.activeYear;
            let gunAdi = this.datepipe.transform(ta, "E");
            var day = { dayNumber: i, dayName: gunAdi };
            this.days.push(day);
        }
    }
    getYear(year) {
        this.activeYear = year;
        this.getDays(1);
    }
    getListYears() {
        for (let i = 1900; i < 2101; i++) {
            this.yearAll.push(i);
        }
    }
    getTodo(day) {
        this.activeDay = day;
        var tarih = new Date(this.activeYear, this.activeMount, day);
        this.startDate.emit(tarih);
    }
}
SarCalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarComponent, deps: [{ token: i1.DatePipe }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
SarCalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SarCalendarComponent, selector: "sar-calendar", inputs: { monthNames: "monthNames", daysNames: "daysNames", IsYearUse: "IsYearUse" }, outputs: { startDate: "startDate" }, viewQueries: [{ propertyName: "myDays", first: true, predicate: ["myDays"], descendants: true }, { propertyName: "yearScroll", first: true, predicate: ["yearsScroll"], descendants: true }, { propertyName: "myCalendar", first: true, predicate: ["myCalendar"], descendants: true }], ngImport: i0, template: "\n<div>\n    <div class=\"calender\"  #myCalendar>\n        <div style=\"position: relative;\" *ngIf=\"IsYearUse\" >\n            <span (click)=\"scrollChange(-100);\"   style=\"position: absolute; top: 5px; right:85%;cursor: pointer;\">\n                <img src=\"/assets/left.png\">\n\n                </span>\n        <div style=\"margin: 3px 15%;\"class=\"yearsNames\" #yearsScroll>\n            <div *ngFor=\"let year of yearAll let i=index\" class=\"year\" [class.yearActive]=\"year==this.activeYear\"> \n                            <span (click)=\"getYear(year)\">{{year}}</span>\n                        </div>\n\n        </div>         \n            <span (click)=\"scrollChange(100);\" style=\"position: absolute; top: 5px; right:8%; cursor: pointer;\">   \n                              <img src=\"/assets/right.png\">\n            </span>\n        </div>\n        <div class=\"mountHeader\">\n            <div *ngFor=\"let ay of monthNames let i=index\" class=\"mount\" [class.mountActive]=\"this.activeMount ==i+1\"> \n                <span (click)=\"getDays(i+1)\" >{{(ay )?.substring(0,3)}}</span>\n             </div>\n        </div>\n         <div style=\"clear: left;\"></div>\n\n         <div class=\"mountDays\" id=\"mountDays\" #myDays>\n            <div *ngFor=\"let day of days let i=index\" class=\"day\">\n                              \n                  <div [class.dayActive]=\"this.activeDay == day.dayNumber\" (click)=\"getTodo(day.dayNumber)\" > {{day.dayNumber}}  </div> \n                    <br>\n                   <!-- {{ day.dayName }} -->\n                    {{daysNames[day.dayName]?.substring(0,3)}}                          \n            \n             </div>      \n         </div>\n    </div>\n</div>\n\n", styles: [".calender{background:hsl(0,0%,100%)!important;box-shadow:0 2px 4px #bdbdbd;border-radius:10px;max-width:1000px;min-width:425px;margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Noto Sans,Liberation Sans,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\";font-weight:400;line-height:1.8;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;padding:10px}.mountHeader{--bs-gutter-x: 1.5rem;--bs-gutter-y: 0;display:flex;flex-wrap:wrap;margin-top:calc(-1 * var(--bs-gutter-y));margin-right:calc(-.5 * var(--bs-gutter-x));margin-left:calc(-.5 * var(--bs-gutter-x));padding:20px}.mount{cursor:pointer;flex:0 0 auto;width:8.33333333%}.mount:hover{font-size:16px;color:#000;font-weight:700;cursor:pointer;flex:0 0 auto;width:8.33333333%}.mountActive{font-size:16px;color:#000;font-weight:700}.mountDays{overflow-y:scroll;overflow-y:hidden;height:auto;white-space:nowrap;padding:0;vertical-align:middle;display:flex;flex-wrap:nowrap;overflow:auto}.day{padding:10px 20px;cursor:pointer;font-style:normal;font-size:14px;color:#000;width:35px;display:inline-block;vertical-align:middle;height:96px;margin-right:-4px;flex:0 0 auto;text-align:center}.day div{border-radius:100%;padding:2px;background-color:#f2f2f2;width:28px;height:28px;text-align:center}.yearsNames{overflow-y:scroll;overflow-y:hidden;height:auto;white-space:nowrap;padding:0;vertical-align:middle;display:flex;flex-wrap:nowrap;overflow:hidden;position:relative}.yearActive{font-size:18px!important;color:#000;font-weight:700;padding:5px!important;text-shadow:3px -3px 2px #bbb3b3}.year{padding:10px 20px;cursor:pointer;font-style:normal;font-size:14px;color:#000;width:35px;display:inline-block;vertical-align:middle;height:30px;margin-right:-4px;flex:0 0 auto;text-align:center}.dayActive{background-color:#1ee18d!important}.calender ::-webkit-scrollbar{width:5px;height:5px;border-radius:30px;text-align:center;top:0;right:30px}::-webkit-scrollbar-track{background:#f1f1f1}::-webkit-scrollbar-thumb{background:rgb(218,218,218)}::-webkit-scrollbar-thumb:hover{background:rgb(218,218,218)}:before,:after .calender{box-sizing:content-box!important}select{word-wrap:normal;margin:0;font-family:inherit;font-size:inherit;line-height:inherit}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'sar-calendar', template: "\n<div>\n    <div class=\"calender\"  #myCalendar>\n        <div style=\"position: relative;\" *ngIf=\"IsYearUse\" >\n            <span (click)=\"scrollChange(-100);\"   style=\"position: absolute; top: 5px; right:85%;cursor: pointer;\">\n                <img src=\"/assets/left.png\">\n\n                </span>\n        <div style=\"margin: 3px 15%;\"class=\"yearsNames\" #yearsScroll>\n            <div *ngFor=\"let year of yearAll let i=index\" class=\"year\" [class.yearActive]=\"year==this.activeYear\"> \n                            <span (click)=\"getYear(year)\">{{year}}</span>\n                        </div>\n\n        </div>         \n            <span (click)=\"scrollChange(100);\" style=\"position: absolute; top: 5px; right:8%; cursor: pointer;\">   \n                              <img src=\"/assets/right.png\">\n            </span>\n        </div>\n        <div class=\"mountHeader\">\n            <div *ngFor=\"let ay of monthNames let i=index\" class=\"mount\" [class.mountActive]=\"this.activeMount ==i+1\"> \n                <span (click)=\"getDays(i+1)\" >{{(ay )?.substring(0,3)}}</span>\n             </div>\n        </div>\n         <div style=\"clear: left;\"></div>\n\n         <div class=\"mountDays\" id=\"mountDays\" #myDays>\n            <div *ngFor=\"let day of days let i=index\" class=\"day\">\n                              \n                  <div [class.dayActive]=\"this.activeDay == day.dayNumber\" (click)=\"getTodo(day.dayNumber)\" > {{day.dayNumber}}  </div> \n                    <br>\n                   <!-- {{ day.dayName }} -->\n                    {{daysNames[day.dayName]?.substring(0,3)}}                          \n            \n             </div>      \n         </div>\n    </div>\n</div>\n\n", styles: [".calender{background:hsl(0,0%,100%)!important;box-shadow:0 2px 4px #bdbdbd;border-radius:10px;max-width:1000px;min-width:425px;margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Noto Sans,Liberation Sans,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\";font-weight:400;line-height:1.8;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;padding:10px}.mountHeader{--bs-gutter-x: 1.5rem;--bs-gutter-y: 0;display:flex;flex-wrap:wrap;margin-top:calc(-1 * var(--bs-gutter-y));margin-right:calc(-.5 * var(--bs-gutter-x));margin-left:calc(-.5 * var(--bs-gutter-x));padding:20px}.mount{cursor:pointer;flex:0 0 auto;width:8.33333333%}.mount:hover{font-size:16px;color:#000;font-weight:700;cursor:pointer;flex:0 0 auto;width:8.33333333%}.mountActive{font-size:16px;color:#000;font-weight:700}.mountDays{overflow-y:scroll;overflow-y:hidden;height:auto;white-space:nowrap;padding:0;vertical-align:middle;display:flex;flex-wrap:nowrap;overflow:auto}.day{padding:10px 20px;cursor:pointer;font-style:normal;font-size:14px;color:#000;width:35px;display:inline-block;vertical-align:middle;height:96px;margin-right:-4px;flex:0 0 auto;text-align:center}.day div{border-radius:100%;padding:2px;background-color:#f2f2f2;width:28px;height:28px;text-align:center}.yearsNames{overflow-y:scroll;overflow-y:hidden;height:auto;white-space:nowrap;padding:0;vertical-align:middle;display:flex;flex-wrap:nowrap;overflow:hidden;position:relative}.yearActive{font-size:18px!important;color:#000;font-weight:700;padding:5px!important;text-shadow:3px -3px 2px #bbb3b3}.year{padding:10px 20px;cursor:pointer;font-style:normal;font-size:14px;color:#000;width:35px;display:inline-block;vertical-align:middle;height:30px;margin-right:-4px;flex:0 0 auto;text-align:center}.dayActive{background-color:#1ee18d!important}.calender ::-webkit-scrollbar{width:5px;height:5px;border-radius:30px;text-align:center;top:0;right:30px}::-webkit-scrollbar-track{background:#f1f1f1}::-webkit-scrollbar-thumb{background:rgb(218,218,218)}::-webkit-scrollbar-thumb:hover{background:rgb(218,218,218)}:before,:after .calender{box-sizing:content-box!important}select{word-wrap:normal;margin:0;font-family:inherit;font-size:inherit;line-height:inherit}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe }, { type: i0.ElementRef }]; }, propDecorators: { startDate: [{
                type: Output
            }], myDays: [{
                type: ViewChild,
                args: ['myDays']
            }], yearScroll: [{
                type: ViewChild,
                args: ['yearsScroll']
            }], myCalendar: [{
                type: ViewChild,
                args: ['myCalendar']
            }], monthNames: [{
                type: Input
            }], daysNames: [{
                type: Input
            }], IsYearUse: [{
                type: Input
            }] } });

class SarCalendarModule {
}
SarCalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SarCalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarModule, bootstrap: [SarCalendarComponent], declarations: [SarCalendarComponent], imports: [BrowserAnimationsModule,
        BrowserModule], exports: [SarCalendarComponent] });
SarCalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarModule, providers: [DatePipe], imports: [[
            BrowserAnimationsModule,
            BrowserModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SarCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SarCalendarComponent
                    ],
                    imports: [
                        BrowserAnimationsModule,
                        BrowserModule,
                    ],
                    bootstrap: [SarCalendarComponent],
                    exports: [
                        SarCalendarComponent
                    ],
                    providers: [DatePipe]
                }]
        }] });

/*
 * Public API Surface of sar-calendar
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SarCalendarComponent, SarCalendarModule, SarCalendarService };
//# sourceMappingURL=sar-calendar.mjs.map

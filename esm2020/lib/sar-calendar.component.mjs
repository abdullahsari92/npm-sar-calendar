import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SarCalendarComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FyLWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3Nhci1jYWxlbmRhci9zcmMvbGliL3Nhci1jYWxlbmRhci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zYXItY2FsZW5kYXIvc3JjL2xpYi9zYXItY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVF0RyxNQUFNLE9BQU8sb0JBQW9CO0lBaUI3QixZQUFtQixRQUFrQixFQUMxQixLQUFnQjtRQURSLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQWhCbkIsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVELGdCQUFXLEdBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDNUMsY0FBUyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsZUFBVSxHQUFVLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0MsYUFBUSxHQUFRLENBQUMsQ0FBQztRQU9ULGVBQVUsR0FBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0ksY0FBUyxHQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLFVBQVUsRUFB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WUFBWTtRQUVSLEtBQUksSUFBSSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsR0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQzNCO1lBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVU7UUFFZCxJQUFJLENBQUMsU0FBUyxHQUFFLEdBQUcsQ0FBQztRQUVwQixJQUFJLEtBQUssR0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0IsQ0FBQzs7aUhBcEZRLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHdjQ1RqQyx1dERBc0NBOzJGRDdCYSxvQkFBb0I7a0JBTmhDLFNBQVM7K0JBQ0UsY0FBYzt3SEFPZCxTQUFTO3NCQUFsQixNQUFNO2dCQU1jLE1BQU07c0JBQTFCLFNBQVM7dUJBQUMsUUFBUTtnQkFDTyxVQUFVO3NCQUFuQyxTQUFTO3VCQUFDLGFBQWE7Z0JBQ0MsVUFBVTtzQkFBbEMsU0FBUzt1QkFBQyxZQUFZO2dCQUdkLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Nhci1jYWxlbmRhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zYXItY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLCBcbiAgc3R5bGVVcmxzOiBbJy4vc2FyLWNhbGVuZGFyLmNvbXBvbmVudC5jc3MnXVxuXG59KVxuZXhwb3J0IGNsYXNzIFNhckNhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAT3V0cHV0KCkgc3RhcnREYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgYWN0aXZlTW91bnQ6bnVtYmVyPW5ldyBEYXRlKCkuZ2V0TW9udGgoKSArMTtcbiAgYWN0aXZlRGF5Om51bWJlcj0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gIGFjdGl2ZVllYXI6bnVtYmVyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICBzY3JvbGxsWDpudW1iZXI9MDtcblxuICBAVmlld0NoaWxkKCdteURheXMnKSBteURheXMhOiBFbGVtZW50UmVmOyBcbiAgQFZpZXdDaGlsZCgneWVhcnNTY3JvbGwnKSB5ZWFyU2Nyb2xsITogRWxlbWVudFJlZjsgXG4gIEBWaWV3Q2hpbGQoJ215Q2FsZW5kYXInKSBteUNhbGVuZGFyITogRWxlbWVudFJlZjsgXG5cblxuICBASW5wdXQoKSBtb250aE5hbWVzOiBhbnlbXSA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuICBASW5wdXQoKSBkYXlzTmFtZXM6IGFueSA9IHtNb246J01vbmRheScsVHVlOidUdWVzZGF5JyxXZWQ6J1dlZG5lc2RheScsVGh1OidUaHVyc2RheScsRnJpOidGcmlkYXkgJyxTYXQ6J1NhdHVyZGF5JyxTdW46J1N1bmRheSd9O1xuICBASW5wdXQoKSBJc1llYXJVc2U6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlXG4gICAgICAscHJpdmF0ZSBlbFJlZjpFbGVtZW50UmVmXG4gICAgICApIHsgfVxuICBcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuZ2V0RGF5cyh0aGlzLmFjdGl2ZU1vdW50KTtcbiAgICAgIHRoaXMuZ2V0VG9kbyggdGhpcy5hY3RpdmVEYXkpO1xuICAgICAgdGhpcy5nZXRMaXN0WWVhcnMoKTtcbiAgICB9XG4gIFxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuICAgICAgdmFyIHllYXJBY3RpdmUgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnllYXJBY3RpdmUnKTtcbiAgICAgIHZhciBkYXlBY3RpdmUgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRheUFjdGl2ZScpO1xuICAgICAgdmFyIGNhbGVuZGFyV2lkdGggPSB0aGlzLm15Q2FsZW5kYXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgIHZhciBjYWxlbmRhckxlZnQgPSB0aGlzLm15Q2FsZW5kYXIubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgICAgdGhpcy5teURheXMubmF0aXZlRWxlbWVudC5zY3JvbGxUbyhkYXlBY3RpdmUub2Zmc2V0TGVmdC1jYWxlbmRhckxlZnQgLSBjYWxlbmRhcldpZHRoLzIsMClcbiAgICAgIGlmKHRoaXMuSXNZZWFyVXNlKVxuICAgICAge1xuICAgICAgICB0aGlzLnNjcm9sbGxYID0geWVhckFjdGl2ZS5vZmZzZXRMZWZ0IC1jYWxlbmRhcldpZHRoLzQ7XG5cbiAgICAgICAgICAgdGhpcy55ZWFyU2Nyb2xsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8odGhpcy5zY3JvbGxsWCwwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2Nyb2xsQ2hhbmdlKGRlZ2VyOm51bWJlcilcbiAgICB7XG4gICAgICB0aGlzLnNjcm9sbGxYID0gdGhpcy5zY3JvbGxsWCArIGRlZ2VyO1xuICAgICAgdGhpcy55ZWFyU2Nyb2xsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8odGhpcy5zY3JvbGxsWCwwKVxuICAgIH1cbiAgICBndW5sZXI6IGFueVtdID0gW107ICBcbiAgICBkYXlzOiBhbnlbXSA9IFtdO1xuICAgIGdldERheXMobW91bnQ6IG51bWJlcikge1xuICBcbiAgICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgICAgdmFyIGd1blNheWlzaSA9IG5ldyBEYXRlKHRoaXMuYWN0aXZlWWVhciwgbW91bnQsIDApLmdldERhdGUoKTsvLyBiaXIgYXnEsW4gacOnaW5kZSBrYcOnIGfDvG4gb2xkdcSfdW51IGJ1bHV5b3IgIFxuICAgICAgdGhpcy5hY3RpdmVNb3VudD1tb3VudDtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGd1blNheWlzaTsgaSsrKSB7ICAgIFxuICAgICAgICB2YXIgdGEgPW1vdW50LnRvU3RyaW5nKCkrXCIvXCIraS50b1N0cmluZygpKyBcIi9cIiArdGhpcy5hY3RpdmVZZWFyO1xuICAgICAgICBcbiAgICAgICAgbGV0IGd1bkFkaT0gdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0odGEsIFwiRVwiKTsgICAgIFxuICAgICAgICB2YXIgZGF5ID17ZGF5TnVtYmVyOmkgLGRheU5hbWU6Z3VuQWRpfTsgIFxuICAgICAgICB0aGlzLmRheXMucHVzaChkYXkpOyAgICAgXG4gIFxuICAgICAgfSBcbiAgXG4gICAgfVxuICAgIGdldFllYXIoeWVhcjphbnkpXG4gICAge1xuICAgICAgdGhpcy5hY3RpdmVZZWFyID0geWVhcjtcbiAgICAgIHRoaXMuZ2V0RGF5cygxKTtcbiAgICB9ICAgIFxuXG4gICAgeWVhckFsbDphbnlbXT1bXTtcbiAgICBnZXRMaXN0WWVhcnMoKVxuICAgIHsgICAgICAgXG4gICAgICAgIGZvcihsZXQgaT0xOTAwOyBpPDIxMDE7IGkrKylcbiAgICAgICAgeyAgICAgXG4gICAgICAgICAgdGhpcy55ZWFyQWxsLnB1c2goaSlcbiAgICAgICAgfSAgXG4gICAgfVxuICBcbiAgICBnZXRUb2RvKGRheTpudW1iZXIpXG4gICAgeyAgICAgICAgIFxuICAgICAgICB0aGlzLmFjdGl2ZURheSA9ZGF5O1xuXG4gICAgICAgIHZhciB0YXJpaD1uZXcgRGF0ZSh0aGlzLmFjdGl2ZVllYXIsIHRoaXMuYWN0aXZlTW91bnQsIGRheSk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlLmVtaXQodGFyaWgpO1xuICBcbiAgICB9XG59XG5cbiIsIlxuPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kZXJcIiAgI215Q2FsZW5kYXI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgKm5nSWY9XCJJc1llYXJVc2VcIiA+XG4gICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwic2Nyb2xsQ2hhbmdlKC0xMDApO1wiICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNXB4OyByaWdodDo4NSU7Y3Vyc29yOiBwb2ludGVyO1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9sZWZ0LnBuZ1wiPlxuXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luOiAzcHggMTUlO1wiY2xhc3M9XCJ5ZWFyc05hbWVzXCIgI3llYXJzU2Nyb2xsPlxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyQWxsIGxldCBpPWluZGV4XCIgY2xhc3M9XCJ5ZWFyXCIgW2NsYXNzLnllYXJBY3RpdmVdPVwieWVhcj09dGhpcy5hY3RpdmVZZWFyXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJnZXRZZWFyKHllYXIpXCI+e3t5ZWFyfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj4gICAgICAgICBcbiAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJzY3JvbGxDaGFuZ2UoMTAwKTtcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA1cHg7IHJpZ2h0OjglOyBjdXJzb3I6IHBvaW50ZXI7XCI+ICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvcmlnaHQucG5nXCI+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW91bnRIZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGF5IG9mIG1vbnRoTmFtZXMgbGV0IGk9aW5kZXhcIiBjbGFzcz1cIm1vdW50XCIgW2NsYXNzLm1vdW50QWN0aXZlXT1cInRoaXMuYWN0aXZlTW91bnQgPT1pKzFcIj4gXG4gICAgICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cImdldERheXMoaSsxKVwiID57eyhheSApPy5zdWJzdHJpbmcoMCwzKX19PC9zcGFuPlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDxkaXYgc3R5bGU9XCJjbGVhcjogbGVmdDtcIj48L2Rpdj5cblxuICAgICAgICAgPGRpdiBjbGFzcz1cIm1vdW50RGF5c1wiIGlkPVwibW91bnREYXlzXCIgI215RGF5cz5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzIGxldCBpPWluZGV4XCIgY2xhc3M9XCJkYXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBbY2xhc3MuZGF5QWN0aXZlXT1cInRoaXMuYWN0aXZlRGF5ID09IGRheS5kYXlOdW1iZXJcIiAoY2xpY2spPVwiZ2V0VG9kbyhkYXkuZGF5TnVtYmVyKVwiID4ge3tkYXkuZGF5TnVtYmVyfX0gIDwvZGl2PiBcbiAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgIDwhLS0ge3sgZGF5LmRheU5hbWUgfX0gLS0+XG4gICAgICAgICAgICAgICAgICAgIHt7ZGF5c05hbWVzW2RheS5kYXlOYW1lXT8uc3Vic3RyaW5nKDAsMyl9fSAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICA8L2Rpdj4gICAgICBcbiAgICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbiJdfQ==
# angular-calendar-library
Angular da kullanabileceğiniz Takvim kütüphanesi

<div align="center">

# sar-calendar
</div>

## Installation

```
npm i @sar-calendar
```

## Usage

Import `SarCalendarModule` in `AppModule` `imports` array
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SarCalendarModule } from 'sar-calendar';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SarCalendarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```


After that you can use parameter definition in `AppComponent`  
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dayDate:Date= new Date();
  monthValues: any[] = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağus','Eylül', 'Ekim', 'Kasım','Aralık'];
  dayValues: any = {Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday ',Sat:'Saturday',Sun:'Sunday'};

  getDate(date:Date)
  {
  
    this.dayDate = date;
  
  }
}

```

After that you can use `sar-calendar` component in template

```html
<div style="width: 700px; margin: 20px;">

  
  <sar-calendar (startDate)="getDate($event)" [monthNames]="monthValues" [daysNames]="dayValues"> </sar-calendar>

  Tarih = {{this.dayDate}}


</div>
```


Or

```html
<div style="width: 700px; margin: 20px;">

  
  <sar-calendar (startDate)="getDate($event)" [IsYearUse]="true" > </sar-calendar>

  Tarih = {{this.dayDate}}


</div>
```

![sar-calendar](https://raw.githubusercontent.com/abdullahsari92/angular-sar-calendar-use/main/src/assets/designer/sarCalendar.png)
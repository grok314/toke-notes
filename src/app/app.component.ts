import { Component } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  incidentList: SmokeBehavior[] = [];
  maxListLength = 20;

  constructor() { }

  addUrge() {
    this.addIncident('Urge');
    this.purgeHead();
  }

  addToke() {
    this.addIncident('Toke');
    this.purgeHead();
  }

  deleteIncident(e: SmokeBehavior) {
    const index = this.incidentList.findIndex(el => el.time === e.time);
    if (index > -1) {
      this.incidentList.splice(index, 1);
    }
  }

  addIncident(type: string) {
    const now = moment();
    const b = new SmokeBehavior(type, now, now.format('LLL'));

    b.minutesSinceLastToke = this.getMinutesSinceLastToke(now);

    this.incidentList.push(b);
  }

  getMinutesSinceLastToke(now: moment.Moment): number {
    // get the last toke
    let lastTokeIndex = this.incidentList.map(r => r.type).reverse().findIndex(s => s === 'Toke');

    if (lastTokeIndex > -1) {
      lastTokeIndex = (this.incidentList.length - 1) - lastTokeIndex;
      const incident = this.incidentList[lastTokeIndex];

      // if there is one, get the span between times
      return now.diff(incident.time, 'minutes');
    }

    return -1;
  }

  purgeHead() {
    if (this.incidentList.length > this.maxListLength) {
      this.incidentList.splice(0, 1);
    }
  }
}

export class SmokeBehavior {
  public minutesSinceLastToke = -1;

  constructor(
    public type: string,
    public time: moment.Moment,
    public timeDisplay: string,
    ) {}
}

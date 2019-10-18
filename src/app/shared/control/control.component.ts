import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStopwatch, faUndoAlt, faShoePrints } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  @Input()
  set started(time: number) {
    if(time !== undefined && this._timer === undefined) {
      this._timer = setInterval(() => {
        this.time += 1000;
      }, 1000);
    }
  }
  @Input() steps: number;
  @Output() outReset: EventEmitter<any> = new EventEmitter();

  private _timer: any;
  time: number = 0;
  faStopwatch = faStopwatch;
  faUndoAlt = faUndoAlt;
  faShoePrints = faShoePrints;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this._timer);
  }

  onReset() {
    this.outReset.emit();
  }
}

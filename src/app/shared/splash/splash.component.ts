import { Component, OnInit, Input } from '@angular/core';
import { faUndoAlt, faThumbsUp, faMedal, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Symbol } from 'src/app/board/shared/mission.model';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  @Input() title: string;
  @Input() symbol: Symbol;

  private _timer: any;
  private _visible: boolean;
  @Input()
  set visible(visible: boolean) {
    this._visible = visible;
    clearTimeout(this._timer);
    if (this.icon !== undefined)
      this._timer = setTimeout(() => { this.dismiss() }, 700);
  }

  get icon(): IconDefinition {
    switch (this.symbol) {
      case Symbol.Reset:
        return faUndoAlt;
      case Symbol.Nice:
        return faThumbsUp;
      case Symbol.Excellent:
        return faMedal;
      default:
        return undefined;
    }
  }

  get visibility() {
    throw new Error('NotImplementedException');
  }

  constructor() { }

  ngOnInit() {
  }

  dismiss() {
    this._visible = false;
  }
}

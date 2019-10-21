import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rotor } from '../rotor.model';

@Component({
  selector: 'app-rotor',
  templateUrl: './rotor.component.html',
  styleUrls: ['./rotor.component.css']
})
export class RotorComponent implements OnInit {
  @Input() rotor: Rotor;
  @Output() outDial = new EventEmitter<string>();

  static readonly ROTOR_SIZE: number = 86;
  static readonly TICK_SIZE: number = 4;
  readonly RADIUS: number = 35;
  private _tickTheta: number;
  private _tickDegree: number;

  constructor() { }

  ngOnInit() {
    this._tickTheta = 2 * Math.PI / this.rotor.ticks;
    this._tickDegree = Math.floor(360 / this.rotor.ticks);
  }

  get points(): any[] {
    let points = [];
    for (let i = 0; i < this.rotor.ticks; i++) {
      let t = (i * this._tickTheta) - Math.PI / 2;
      let pos = {
        x: RotorComponent.ROTOR_SIZE / 2 + (this.RADIUS * Math.cos(t)),
        y: RotorComponent.ROTOR_SIZE / 2 + (this.RADIUS * Math.sin(t))
      }
      points.push({ left: pos.x - RotorComponent.TICK_SIZE / 2, top: pos.y - RotorComponent.TICK_SIZE / 2 });
    }
    return points;
  }

  get degree(): number {
    return (this.rotor.steps * this._tickDegree) + 45;
  }

  dial() {
    this.outDial.emit(this.rotor.id);
  }
}

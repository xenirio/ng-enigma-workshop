import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionScoreService {
  $level = new ReplaySubject<number>();
  
  level: number = 0;
  time: number = 0;
  steps: number = 0;
  answer: number = 0;

  constructor() { }
}

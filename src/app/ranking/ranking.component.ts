import { ScoreService } from './../shared/score/score.service';
import { Component, OnInit } from '@angular/core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Score } from '../shared/score/score.model';
import { MissionScoreService } from '../mission-score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  private _scores: { [id: string]: Score } = {};

  faTrophy = faTrophy

  get scores(): Score[] {
    return Object.keys(this._scores).map(k => { return this._scores[k]; });
  }
  get ranking(): number {
    return this.scores.findIndex(s => s.player === localStorage.getItem("player")) + 1;
  }

  constructor(
    private _missionScoreService: MissionScoreService,
    private _router: Router) { }

  ngOnInit() {
  }

  onContinue() {
    let level = this._missionScoreService.level;
    if(level === undefined)
      level = 1;
    this._router.navigate(['/mission', level]);
  }

}

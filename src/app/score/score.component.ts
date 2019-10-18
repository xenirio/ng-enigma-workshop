import { ScoreService } from './../shared/score/score.service';
import { Component, OnInit } from '@angular/core';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStopwatch, faShoePrints, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { MissionScoreService } from '../mission-score.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  faStopwatch = faStopwatch;
  faShoePrints = faShoePrints;
  farStar = farStar;
  fasStar = fasStar;

  time: number;
  steps: number;
  compliment: string;

  constructor(
    private _missionScoreService: MissionScoreService,
    private _scoreService: ScoreService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.time = this._missionScoreService.time;
    this.steps = this._missionScoreService.steps;

    let level = this._missionScoreService.level;
    if (level !== undefined) {
      level++;
      this._missionScoreService.level = level;
    }
  }

  get stars(): number[] {
    let boundary = this._missionScoreService.answer;
    let score = Math.floor((boundary/this.steps) * 5);
    if (score > 5)
      score = 5;
    if (score < 1)
      score = 1;
    let stars = [];
    for (var i = 0; i < score; i++) {
      stars.push(1);
    }

    switch (score) {
      case 5:
        this.compliment = "Excellent!";
        break;
      case 4:
        this.compliment = "Great!";
        break;
      case 3:
        this.compliment = "Nice";
        break;
      case 2:
        this.compliment = "Good";
        break;
      case 1:
        this.compliment = "Fine";
        break;
      default:
        this.compliment = "";
        break;
    }
    return stars;
  }

  onSubmit() {
    let name = localStorage.getItem("player");
    if (name === null)
      name = "";
    do {
      name = prompt("Player Name:");
    } while (name === "")
    if (name == null)
      return;
    localStorage.setItem("player", name);
    let level = this._missionScoreService.level;
    if (level === undefined || this.time === undefined || this.steps === undefined)
      return;
    this._scoreService.submit.score(name, level, Math.floor(this.time / 1000), this.steps)
      .subscribe((success) => {
        if (success === true) {
          this._router.navigate(['/ranking']);
        }
      });
  }

  onContinue() {
    let level = this._missionScoreService.level;
    if (level === undefined)
      level = 1;
    this._router.navigate(['/mission', level]);
  }
}

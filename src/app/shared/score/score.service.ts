import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';
import { Score } from './score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  submit: {
    score(player: string, level: number, time: number, step: number): Observable<boolean>
  }
  get: {
    score: {
      list(): Observable<Score[]>
    }
  }

  constructor(private _apiService: ApiService) {
    this.submit = {
      score: (player: string, level: number, time: number, step: number) => {
        return this._apiService.postRequest('/score/submit', {
          "player": player,
          "level": level,
          "time": time,
          "step": step
        })
          .pipe(
            map(() => {
              return true;
            })
          );
      }
    };

    this.get = {
      score: {
        list: () => {
          return this._apiService.getRequest('/score/rank')
            .pipe(
              map((results) => {
                let scores: Score[] = [];
                for (let score of <any[]>results) {
                  scores.push(new Score({
                    player: score.player,
                    score: score.score
                  }));
                }
                return scores;
              })
            );
        }
      }
    }
  }
}

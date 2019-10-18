import { Circuit } from './circuit.model';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Observable } from 'rxjs';
import { Mission } from './mission.model';
import { map } from 'rxjs/operators';
import { Rotor } from './rotor.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  get: {
    mission: {
      list(level: string): Observable<Mission[]>
    }
  }

  constructor(private _apiService: ApiService) {
    this.get = {
      mission: {
        list: (level: string) => {
          return this._apiService.pathRequest('/mission', level)
            .pipe(
              map(results => {
                let missions: Mission[] = [];
                for (let mission of <any[]>results) {
                  let rotors: { [id: string]: Rotor } = {};
                  mission.rotors.map(r => {
                    return new Rotor({
                      id: r.id,
                      ticks: r.ticks,
                      state: r.state
                    })
                  }).forEach(r => {
                    rotors[r.id] = r;
                  });

                  let circuits: { [id: string]: Circuit } = {};
                  mission.circuits.map(c => {
                    return new Circuit({
                      dial: rotors[c.switch],
                      rotors: c.rotors
                        .filter(r => {
                          return r !== c.switch;
                        })
                        .map(r => {
                        return rotors[r];
                      })
                    })
                  }).forEach(c => {
                    circuits[c.dial.id] = c;
                  });
                  missions.push(
                    new Mission({
                      major: mission.major,
                      minor: mission.minor,
                      cover: "",
                      layout: mission.layout,
                      rotors: rotors,
                      circuits: circuits,
                      answer: mission.answer
                    })
                  )
                }
                return missions;
              })
            );
        }
      }
    }
  }
}

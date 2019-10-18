import { ScoreService } from './shared/score/score.service';
import { MissionService } from './board/shared/mission.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Routings } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ControlComponent } from './shared/control/control.component';
import { BoardComponent } from './board/board.component';
import { RotorComponent } from './board/shared/rotor/rotor.component';
import { SplashComponent } from './shared/splash/splash.component';
import { ScoreComponent } from './score/score.component';
import { ApiService } from './shared/api/api.service';
import { ProxyConfigService } from './shared/api/proxy.config.service';
import { HttpModule } from '@angular/http';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ControlComponent,
    BoardComponent,
    RotorComponent,
    SplashComponent,
    ScoreComponent,
    RankingComponent
  ],
  imports: [
    HttpModule,
    Routings,
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [
    ApiService,
    MissionService,
    ProxyConfigService,
    ScoreService,
    { provide: APP_INITIALIZER, useFactory: (config: ProxyConfigService) => () => config.load(), deps: [ProxyConfigService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

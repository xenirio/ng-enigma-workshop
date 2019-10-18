import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board/board.component';
import { ScoreComponent } from './score/score.component';
import { RankingComponent } from './ranking/ranking.component';

const appRoutes: Routes = [
    { 
        path: '', 
        component: BoardComponent
    },
    { 
        path: 'mission/:level', 
        component: BoardComponent
    },
    {
        path: 'score',
        component: ScoreComponent
    },
    {
        path: 'ranking',
        component: RankingComponent
    }
];
export const Routings: ModuleWithProviders = RouterModule.forRoot(appRoutes);
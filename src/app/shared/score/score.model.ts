export class Score {
    player: string;
    level: number;
    score: number;

    constructor(attrs?: {
        player: string,
        score: number
    }) {
        if (attrs) Object.assign(this, attrs);
    }
}
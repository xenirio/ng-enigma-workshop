export class Rotor {
    readonly STEP: number = 1;
    readonly KEY: number = 0;
    private _initialState: number;

    id: string;
    ticks: number;
    state: number;
    steps: number = 0;

    constructor(attrs?: {
        id: string,
        ticks: number,
        state: number
    }) {
        if (attrs) {
            Object.assign(this, attrs);
            this.steps = this.state;
            this._initialState = this.state;
        };
    }

    get isUnlock(): boolean {
        return this.state === this.KEY;
    }

    rotate() {
        this.steps += this.STEP;
        this.state = this.steps%this.ticks;
    }

    reset() {
        this.state = this._initialState;
        this.steps = this.state;
    }
}
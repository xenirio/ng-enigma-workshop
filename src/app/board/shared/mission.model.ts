import { Circuit } from "./circuit.model";
import { Rotor } from "./rotor.model";

export enum Symbol {
    Reset = 0,
    Nice = 1,
    Excellent = 2
}

export class Mission {
    major: number;
    minor: number;
    cover: string;
    layout: string[][];
    rotors: { [id: string]: Rotor } = {};
    circuits: { [id: string]: Circuit } = {};
    steps: string[] = [];
    answer: number;

    constructor(attrs?: {
        major: number,
        minor: number,
        cover: string,
        layout: string[][],
        rotors: { [id: string]: Rotor },
        circuits: { [id: string]: Circuit },
        answer: number
    }) {
        if (attrs) Object.assign(this, attrs);
    }

    get unlocked() {
        return Object.keys(this.rotors).filter(k => !this.rotors[k].isUnlock).length === 0;
    }

    dial(id: string) {
        let circuit = this.circuits[id];
        circuit.dial.rotate();
        circuit.rotors.forEach(r => { r.rotate(); });
    }

    reset() {
        Object.keys(this.rotors).forEach(k => this.rotors[k].reset());
    }
}
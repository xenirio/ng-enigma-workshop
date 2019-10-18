import { Rotor } from "./rotor.model";

export class Circuit {
    dial: Rotor;
    rotors: Rotor[];

    constructor(attrs?: {
        dial: Rotor,
        rotors: Rotor[]
    }) {
        if (attrs) Object.assign(this, attrs);
    }
}
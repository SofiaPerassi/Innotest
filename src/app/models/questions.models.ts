export interface QuestionsResponse {
    questions: Array<Questions>
}

export interface Questions {
    id : number;
    content : string;
    bloque : Bloque;
    oposicion : Array<Oposicion>;
    test : Array<Test>;
}

export interface Test {
    id: number;
    name: string;
    isselected: boolean;
}

export interface Oposicion {
    id: number;
    name: string;
    isselected: boolean;
}

export interface Bloque {
    id: number;
    name: string;
}
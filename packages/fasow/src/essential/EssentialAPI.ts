
export default class EssentialAPI {
    private tickStep : number;

    constructor() {
        this.tickStep = 1;
    }


    onStart() : void {

    }

    onStep() : void {

    }

    onExit() : void {

    }

    getTick() : number {
        return -1;
    }

    setTickStep(tickStep: number) : void {
        this.tickStep = tickStep;
    }
}
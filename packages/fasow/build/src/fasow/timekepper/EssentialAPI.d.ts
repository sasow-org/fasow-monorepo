export default class EssentialAPI {
    private tick;
    private maxTick;
    private repetition;
    private maxRepetition;
    constructor();
    setTick(tick: number): number;
    getTick(): number;
    nextTick(): number;
    canNextTick(): boolean;
    setMaxTick(maxTick: number): void;
    getMaxTick(): number;
    setRepetition(repetition: number): void;
    getRepetition(): number;
    nextRepetition(): number;
    canNextRepetition(): boolean;
    setMaxRepetition(maxRepetition: number): void;
    getMaxRepetition(): number;
}

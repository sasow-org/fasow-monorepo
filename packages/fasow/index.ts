/* eslint-disable import/prefer-default-export */
import FASOW from "./src/fasow/FASOW";
import { loadJSON } from "./src/main";

export const fasowInstance = new FASOW();
export const PruebaExport = "Prueba";

export { loadJSON };

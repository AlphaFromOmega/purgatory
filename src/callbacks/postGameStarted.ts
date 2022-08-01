import { restartAcedia } from "../items/acedia";
import { restartGula } from "../items/gula";
import { restartInvidia } from "../items/invidia";
import { restartIra } from "../items/ira";
import { restartSuperbia } from "../items/superbia";

export function postGameEnd(isContinued : boolean): void
{
    restartSuperbia();
    restartInvidia();
    restartIra();
    restartAcedia();
    restartGula();
}
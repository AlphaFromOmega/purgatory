import { updateAcedia } from "../items/acedia";
import { updateAvaritia } from "../items/avaritia";
import { updateGula } from "../items/gula";
import { updateIra } from "../items/ira";
import { updateMemoryLeak } from "../items/memory_leak";
import { updateSprinklerHead } from "../items/sprinkler_head";

export function postUpdate(): void
{
    updateIra();
    updateAcedia();
    updateAvaritia();
    updateGula();
    updateSprinklerHead();
    updateMemoryLeak();
}
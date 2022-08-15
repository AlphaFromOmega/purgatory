import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as superbia from "../items/superbia";
import * as weightedD7 from "../items/weighted_d7";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.PRE_SPAWN_CLEAN_AWARD, main);
}

export function main(seed : RNG, spawn_pos : Vector): boolean | undefined
{
    superbia.completeRoom();
    weightedD7.completeRoom(seed, spawn_pos);
    return undefined;
}
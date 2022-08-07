import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as superbia from "../items/superbia";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.PRE_SPAWN_CLEAN_AWARD, main);
}

export function main(seed : RNG, spawn_pos : Vector): boolean | undefined
{
    superbia.completeRoom();
    return undefined;
}
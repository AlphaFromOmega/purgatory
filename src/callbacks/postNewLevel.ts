import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as memoryLeak from "../items/memory_leak";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.POST_NEW_LEVEL, main);
}

export function main(): void
{
    memoryLeak.postNewLevel();
}
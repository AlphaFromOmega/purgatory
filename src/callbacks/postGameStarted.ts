import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as acedia from "../items/acedia";
import * as gula from "../items/gula";
import * as invidia from "../items/invidia";
import * as ira from "../items/ira";
import * as memoryLeak from "../items/memory_leak";
import * as superbia from "../items/superbia";


export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

export function main(isContinued : boolean): void
{
    superbia.restart();
    invidia.restart();
    ira.restart();
    acedia.restart();
    gula.restart();
    memoryLeak.restart();
}
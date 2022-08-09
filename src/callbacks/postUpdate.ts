import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as acedia from "../items/acedia";
import * as avaritia from "../items/avaritia";
import * as gula from "../items/gula";
import * as ira from "../items/ira";
import * as memoryLeak from "../items/memory_leak";
import * as sprinklerHead from "../items/sprinkler_head";
import * as wakeMeUp from "../items/wake_me_up";
import * as tissueBox from "../items/tissue_box";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.POST_UPDATE, main);
}

export function main(): void
{
    ira.update();
    acedia.update();
    avaritia.update();
    gula.update();
    sprinklerHead.update();
    memoryLeak.update();
    tissueBox.update();
    wakeMeUp.update();
}
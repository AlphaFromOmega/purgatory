import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";

import * as acedia from "../items/acedia";
import * as avaritia from "../items/avaritia";
import * as gula from "../items/gula";
import * as invidia from "../items/invidia";
import * as ira from "../items/ira";
import * as sprinklerHead from "../items/sprinkler_head";
import * as superbia from "../items/superbia";
import * as tissueBox from "../items/tissue_box";
import * as weightedD8 from "../items/weighted_d8";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.EVALUATE_CACHE, main);
}

export function main(player : EntityPlayer, flag : CacheFlag): void
{
    superbia.evaluateCache(player, flag);
    invidia.evaluateCache(player, flag);
    ira.evaluateCache(player, flag);
    acedia.evaluateCache(player, flag);
    avaritia.evaluateCache(player, flag);
    gula.evaluateCache(player, flag);
    sprinklerHead.evaluateCache(player, flag);
    weightedD8.evaluateCache(player, flag);


    tissueBox.evaluateCache(player, flag);
}
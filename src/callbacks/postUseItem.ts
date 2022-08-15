import { ActiveSlot, CollectibleType, ModCallback, UseFlag } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";

import * as weightedD1 from "../items/weighted_d1"
import * as weightedD4 from "../items/weighted_d4"
import * as weightedD6 from "../items/weighted_d6"
import * as weightedD7 from "../items/weighted_d7"

export function init(mod : ModUpgraded): void {
  mod.AddCallback(ModCallback.POST_USE_ITEM, main);
}

export function main(type : CollectibleType, seed : RNG,  player : EntityPlayer, flags : UseFlag, activeSlot : ActiveSlot, customVarData : int): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined
{
    let ret : boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined;
    ret = (weightedD1.postUseItem(type, seed, player, flags, activeSlot, customVarData) ?? ret);
    ret = (weightedD4.postUseItem(type, seed, player, flags, activeSlot, customVarData) ?? ret);
    ret = (weightedD6.postUseItem(type, seed, player, flags, activeSlot, customVarData) ?? ret);
    ret = (weightedD7.postUseItem(type, seed, player, flags, activeSlot, customVarData) ?? ret);
    return ret;
}
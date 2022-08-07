import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as sprinklerHead from "../items/sprinkler_head";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.POST_LASER_INIT, main);
}

export function main(laser : EntityLaser) : void
{
    sprinklerHead.laserInit(laser)
}
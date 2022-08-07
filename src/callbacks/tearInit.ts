import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as sprinklerHead from "../items/sprinkler_head";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.POST_TEAR_INIT, main);
}

export function main(tear : EntityTear): void
{
    sprinklerHead.tearInit(tear)
}
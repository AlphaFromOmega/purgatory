import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as invidia from "../items/invidia";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.POST_PICKUP_INIT, main);
}

export function main(entity : EntityPickup): void
{
    invidia.initPickup(entity);
}
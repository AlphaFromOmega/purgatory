import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as gula from "../items/gula";
import * as invidia from "../items/invidia";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.PRE_PICKUP_COLLISION, main);
}

export function main(pickup : EntityPickup, collider : Entity, low : boolean): boolean | undefined
{
    invidia.pickup(pickup, collider);
    gula.pickup(pickup, collider);
    return undefined;
}
import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as wakeMeUp from "../items/wake_me_up";

export function init(mod : ModUpgraded): void {
    mod.AddCallbackCustom(ModCallbackCustom.POST_PICKUP_INIT_LATE, main);
}

export function main(pickup : EntityPickup) : void
{
    wakeMeUp.postPickupInitLate(pickup);
}
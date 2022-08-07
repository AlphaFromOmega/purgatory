import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as wakeMeUp from "../items/wake_me_up";

export function init(mod : ModUpgraded): void {
    mod.AddCallbackCustom(ModCallbackCustom.POST_NPC_INIT_LATE, main);
}

export function main(npc : EntityNPC) : void
{
    wakeMeUp.postNPCInitLate(npc);
}
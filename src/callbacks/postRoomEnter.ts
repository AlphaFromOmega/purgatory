import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import * as acedia from "../items/acedia";
import * as invidia from "../items/invidia";
import * as superbia from "../items/superbia";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

export function main(): void
{
    superbia.newRoom();
    invidia.newRoom();
    acedia.newRoom();
}
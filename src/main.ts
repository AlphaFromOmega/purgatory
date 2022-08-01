import { ModCallback } from "isaac-typescript-definitions";
import { evaluateCache } from "./callbacks/evaluateCache";
import { fireTear } from "./callbacks/fireTear";
import { laserInit } from "./callbacks/laserInit";
import { postDamage } from "./callbacks/postDamage";
import { postGameEnd } from "./callbacks/postGameStarted";
import { postInitPickup } from "./callbacks/postInitPickup";
import { postRoomEnter } from "./callbacks/postRoomEnter";
import { postUpdate } from "./callbacks/postUpdate";
import { preCollidePickup } from "./callbacks/preCollidePickup";
import { preRoomReward } from "./callbacks/preRoomReward";
import { tearInit } from "./callbacks/tearInit";
import { eid } from "./eid";
import { stageAPI } from "./stageapi";

const MOD_NAME = "Purgatory";

export function main(): void {
    // Instantiate a new mod object, which grants the ability to add callback functions that
    // correspond to in-game events.
    const mod = RegisterMod(MOD_NAME, 1);

    mod.AddCallback(ModCallback.ENTITY_TAKE_DMG, postDamage); // Set a callback function that corresponds to when an entity (Player or Enemy) takes damage
    mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // Set a callback function that corresponds to after the update cycle

    mod.AddCallback(ModCallback.PRE_SPAWN_CLEAN_AWARD, preRoomReward); // Set a callback function that corresponds to when a new run is started
    mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameEnd); // Set a callback function that corresponds to when a new run is started

    mod.AddCallback(ModCallback.POST_NEW_ROOM, postRoomEnter); // Set a callback function that corresponds to when a new run is started

    mod.AddCallback(ModCallback.EVALUATE_CACHE, evaluateCache); // Set a callback function that corresponds to when a new run is started

    mod.AddCallback(ModCallback.PRE_PICKUP_COLLISION, preCollidePickup); // Set a callback function that corresponds to when a new run is started
    mod.AddCallback(ModCallback.POST_PICKUP_INIT, postInitPickup); // Set a callback function that corresponds to when a new run is started

    mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted); // Set a callback function that corresponds to when a new run is started

    mod.AddCallback(ModCallback.POST_FIRE_TEAR, fireTear); // Set a callback function that corresponds to when a new run is started

    mod.AddCallback(ModCallback.POST_TEAR_INIT, tearInit); // Set a callback function that corresponds to when a new run is started
    mod.AddCallback(ModCallback.POST_LASER_INIT, laserInit); // Set a callback function that corresponds to when a new run is started

    Isaac.DebugString(`${MOD_NAME} initialized.`);
}

// Check for EID and then run all stuff that requires EID.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (EID !== null) {
    eid()
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (StageAPI !== null)
{
    stageAPI()
}
else
{
    // Warn
}

function postGameStarted() {
    Isaac.DebugString("Callback triggered: MC_POST_GAME_STARTED");
}
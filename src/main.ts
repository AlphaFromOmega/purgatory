import { Keyboard, ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom, registerHotkey, reloadRoom, setCustomStage, upgradeMod } from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as laserInit  from "./callbacks/laserInit";
import * as postDamage  from "./callbacks/postDamage";
import * as postGameStarted  from "./callbacks/postGameStarted";
import * as postInitPickup  from "./callbacks/postInitPickup";
import * as postNewLevel  from "./callbacks/postNewLevel";
import * as postRoomEnter  from "./callbacks/postRoomEnter";
import * as postUpdate  from "./callbacks/postUpdate";
import * as preCollidePickup  from "./callbacks/preCollidePickup";
import * as postNpcSpawn  from "./callbacks/postNpcSpawn";
import * as preRoomReward  from "./callbacks/preRoomReward";
import * as tearInit  from "./callbacks/tearInit";
import * as postPickupSpawn  from "./callbacks/postPickupSpawn";
import * as getShaderParameters  from "./callbacks/getShaderParameters";
import * as postUseItem  from "./callbacks/postUseItem";
import { eid } from "./eid";
import { purgatoryDataInit } from "./dataManager";

const MOD_NAME = "Purgatory";

export function main(): void {
    // Instantiate a new mod object, which grants the ability to add callback functions that
    // correspond to in-game events.
    const mod = RegisterMod(MOD_NAME, 1);
    const umod = upgradeMod(mod);
    purgatoryDataInit();

    evaluateCache.init(umod);
    laserInit.init(umod);
    postDamage.init(umod);
    postGameStarted.init(umod);
    postInitPickup.init(umod);
    postNewLevel.init(umod);
    postRoomEnter.init(umod);
    postUpdate.init(umod);
    preCollidePickup.init(umod);
    postNpcSpawn.init(umod);
    preRoomReward.init(umod);
    tearInit.init(umod);
    postPickupSpawn.init(umod);
    postUseItem.init(umod);
    getShaderParameters.init(umod);


    Isaac.DebugString(`${MOD_NAME} initialized.`);
    registerHotkey(Keyboard.F5, () => {
        setCustomStage("Limbo");
        reloadRoom();
    });
}

// Check for EID and then run all stuff that requires EID.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (EID !== null) {
    eid()
}
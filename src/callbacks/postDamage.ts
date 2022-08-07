import { DamageFlag, ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";

import * as ira from "../items/ira";
import * as superbia from "../items/superbia";
import * as luxuria from "../items/luxuria";

export function init(mod : ModUpgraded): void {
    mod.AddCallback(ModCallback.ENTITY_TAKE_DMG, main);
}

export function main(entity : Entity, damage : float, flags : BitFlags<DamageFlag>, source : EntityRef, countdown : int): boolean
{
    superbia.entityTakeDamage(entity, flags);
    ira.entityTakeDamage(entity);

    let canDamage = true;

    canDamage = luxuria.entityTakeDamage(entity, source, damage, flags, countdown);
    return canDamage;
}
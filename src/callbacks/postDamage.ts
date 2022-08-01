import { DamageFlag } from "isaac-typescript-definitions";
import { damageIra } from "../items/ira";
import { damageSuperbia } from "../items/superbia";
import { damageLuxuria } from "../items/luxuria";

export function postDamage(entity : Entity, damage : float, flags : BitFlags<DamageFlag>, source : EntityRef, countdown : int): boolean
{
    damageSuperbia(entity, flags);
    damageIra(entity);

    let canDamage = true;

    canDamage = damageLuxuria(entity, source, damage, flags, countdown);
    return canDamage;
}
import { ActiveSlot, CollectibleType, DamageFlag, UseFlag } from "isaac-typescript-definitions";
import { addFlag, bitFlags, getNPCs } from "isaacscript-common";

export function postUseItem(type : CollectibleType, seed : RNG, player : EntityPlayer, flags : UseFlag, activeSlot : ActiveSlot, customVarData : int): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined
{
    if (type === CollectibleTypePurgatory.WEIGHTED_D10)
    {
        const npcs = getNPCs();
        const multi = player.HasCollectible(CollectibleType.CAR_BATTERY) ? 0.75 : 0.5;
        if (npcs.length > 0)
        {
            npcs.forEach(npc => {
                npc.TakeDamage(npc.HitPoints * (1 - multi), DamageFlag.NO_MODIFIERS, EntityRef(player), 0);
            });
            player.TakeDamage((player.GetEternalHearts() + player.GetSoulHearts() + player.GetHearts() + player.GetBoneHearts() + player.GetRottenHearts() + player.GetBlackHearts()) * (1 - multi), addFlag(DamageFlag.NO_KILL, DamageFlag.NO_PENALTIES, DamageFlag.INVINCIBLE), EntityRef(player), 1);
            return {Discharge : true, Remove : false, ShowAnim : true};
        }
        return {Discharge : false, Remove : false, ShowAnim : false};
    }
    return undefined;
}
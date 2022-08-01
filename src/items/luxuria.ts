import { CacheFlag, DamageFlag, TearFlag } from "isaac-typescript-definitions";
import { bitFlags } from "isaacscript-common";
import "../enum/CollectibleTypePurgatory";

export function damageLuxuria(entity : Entity, source : EntityRef, damage : float, flags : BitFlags<DamageFlag>, countdown : float): boolean
{
    const e = source.Entity
    if (e !== undefined)
    {
        let player = e.ToPlayer()
        if (player === undefined)
        {
            player = e.Parent?.ToPlayer();
        }
        if (((flags & DamageFlag.NO_MODIFIERS) !== DamageFlag.NO_MODIFIERS) && player !== undefined && player.HasCollectible(CollectibleTypePurgatory.LUXURIA))
        {
            const multi = player.GetCollectibleNum(CollectibleTypePurgatory.LUXURIA) + 1
            if (EntityRef(entity).IsCharmed)
            {
                damage /= multi;
            }
            else
            {
                damage *= multi;
            }
            flags = bitFlags(DamageFlag.NO_MODIFIERS)
            entity.TakeDamage(damage,  flags,  source, countdown);
            return false;
        }
    }
    return true;
}

export function cacheLuxuria(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.LUXURIA))
    {
        if ((flag & CacheFlag.TEAR_FLAG) === CacheFlag.TEAR_FLAG)
        {
            player.TearFlags.bor(TearFlag.CHARM);
        }
    }
}
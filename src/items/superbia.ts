import { CacheFlag, DamageFlag } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";
import "../enum/CollectibleTypePurgatory"

const returnDamage:number[] = [0, 0, 0, 0, 0, 0, 0, 0];
const superbiaDamage:number[] = [0, 0, 0, 0, 0, 0, 0, 0];

export function restart(): void
{
    for (const player of getPlayers()) {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        returnDamage[index] = 0;
        superbiaDamage[index]  = 0;
        player.AddCacheFlags(CacheFlag.DAMAGE);
        player.EvaluateItems();
    }
}

export function entityTakeDamage(entity : Entity, flags : int): void
{
    const player = entity.ToPlayer()
    if (player !== undefined && player.HasCollectible(CollectibleTypePurgatory.SUPERBIA) && ((flags & DamageFlag.NO_PENALTIES) !== DamageFlag.NO_PENALTIES))
    {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if (index > -1)
        {
            returnDamage[index] -= 0.25;
            superbiaDamage[index] = (returnDamage[index] ?? 0);
            player.AddCacheFlags(CacheFlag.DAMAGE);
            player.EvaluateItems();
        }
    }
}

export function completeRoom(): void
{
    for (const player of getPlayers()) {
        if (player.HasCollectible(CollectibleTypePurgatory.SUPERBIA)) {
            const index = getPlayers().findIndex(p => p.Index === player.Index);
            superbiaDamage[index] += 0.25 * player.GetCollectibleNum(CollectibleTypePurgatory.SUPERBIA)
            player.AddCacheFlags(CacheFlag.DAMAGE);
            player.EvaluateItems();
        }
    }
}

export function newRoom(): void
{
    for (const player of getPlayers()) {
        if (player.HasCollectible(CollectibleTypePurgatory.SUPERBIA)) {
            player.AddCacheFlags(CacheFlag.DAMAGE);
            player.EvaluateItems();
        }
    }
}
export function evaluateCache(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.SUPERBIA))
    {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
        {
            player.Damage = math.max(player.Damage + (superbiaDamage[index] ?? 0), 0.5);
        }
    }
}
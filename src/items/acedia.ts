import { CacheFlag } from "isaac-typescript-definitions";
import { getPlayers, lerp } from "isaacscript-common";
import "../enum/CollectibleTypePurgatory";

const multi:number[] = [1, 1, 1, 1, 1, 1, 1, 1];

export function newRoom(): void
{
    multiReset()
}

export function restart(): void
{
    multiReset()
}

function multiReset()
{
    getPlayers().forEach(player => {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if (player.HasCollectible(CollectibleTypePurgatory.ACEDIA))
        {
            multi[index] = 1 + player.GetCollectibleNum(CollectibleTypePurgatory.ACEDIA)
        }
        else
        {
            multi[index] = 1;
        }
        player.AddCacheFlags(CacheFlag.DAMAGE);
        player.EvaluateItems();
    });
}

export function update(): void
{
    getPlayers().forEach(player => {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if (player.HasCollectible(CollectibleTypePurgatory.ACEDIA))
        {
            const m = player.Velocity
            if (m.X !== 0 || m.Y !== 0)
            {
                multi[index] = lerp((multi[index] ?? 1), 0.5, 0.001 * player.Velocity.Length())
                player.AddCacheFlags(CacheFlag.DAMAGE);
                player.EvaluateItems();
            }
        }
    });
}

export function evaluateCache(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.ACEDIA))
    {
        if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
        {
            const index = getPlayers().findIndex(p => p.Index === player.Index);
            player.Damage *= (multi[index] ?? 1);
        }
        if ((flag & CacheFlag.SPEED) === CacheFlag.SPEED)
        {
            player.MoveSpeed -= 0.3;
        }
    }
}
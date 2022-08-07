import { CacheFlag } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";
import "../enum/CollectibleTypePurgatory";

export function restart(): void
{
    getPlayers().forEach(player => {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        lastCoins[index] = 0;
        lastBombs[index] = 0;
        lastKeys[index] = 0;
        player.AddCacheFlags(CacheFlag.DAMAGE);
        player.AddCacheFlags(CacheFlag.FIRE_DELAY);
        player.AddCacheFlags(CacheFlag.LUCK);
        player.EvaluateItems();
    });
}

const lastCoins:number[] = [1, 1, 1, 1, 1, 1, 1, 1];
const lastBombs:number[] = [1, 1, 1, 1, 1, 1, 1, 1];
const lastKeys:number[] = [1, 1, 1, 1, 1, 1, 1, 1];

export function update(): void
{
    getPlayers().forEach(player => {
        if (player.HasCollectible(CollectibleTypePurgatory.AVARITIA))
        {
            let flagged = false;
            const index = getPlayers().findIndex(p => p.Index === player.Index);
            if (lastCoins[index] !== player.GetNumCoins())
            {
                player.AddCacheFlags(CacheFlag.LUCK);
                lastCoins[index] = player.GetNumCoins();
                flagged = true;
            }
            if (lastBombs[index] !== player.GetNumBombs())
            {
                player.AddCacheFlags(CacheFlag.DAMAGE);
                lastBombs[index] = player.GetNumBombs();
                flagged = true;
            }
            if (lastKeys[index] !== player.GetNumKeys())
            {
                player.AddCacheFlags(CacheFlag.FIRE_DELAY);
                lastKeys[index] = player.GetNumKeys();
                flagged = true;
            }
            if (flagged)
            {
                player.EvaluateItems();
            }
        }
    });
}

export function evaluateCache(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.AVARITIA))
    {
        if ((flag & CacheFlag.LUCK) === CacheFlag.LUCK)
        {
            player.Luck /= 2;
            player.Luck += player.GetNumCoins();
        }
        if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
        {
            player.Damage /= 2;
            player.Damage += player.GetNumBombs() * 0.25 * (player.HasGoldenBomb() ? 2 : 1);
        }
        if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
        {
            player.MaxFireDelay *= 2;
            player.MaxFireDelay *= math.sqrt((100 - player.GetNumKeys())/100);
        }
    }
}
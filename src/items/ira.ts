import { CacheFlag, CollectibleType, SoundEffect } from "isaac-typescript-definitions";
import { COLORS, getPlayers, getRandomFloat, sfxManager } from "isaacscript-common";
import "../enum/CollectibleTypePurgatory";

const iraBerserk = [0, 0, 0, 0, 0, 0, 0, 0];
const delay = [0, 0, 0, 0, 0, 0, 0, 0];
const berserk = [false, false, false, false, false, false, false, false];

export function restart(): void
{
    for (const player of getPlayers()) {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        delay[index] = 0;
        iraBerserk[index] = 0;
        berserk[index] = false;
        player.AddCacheFlags(CacheFlag.FIRE_DELAY);
        player.EvaluateItems();
    }
}

export function entityTakeDamage(entity : Entity): void
{
    const player = entity.ToPlayer()
    if (player !== undefined && player.HasCollectible(CollectibleTypePurgatory.IRA) )
    {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if (!(berserk[index] ?? false) && getRandomFloat(0, 1) < 0.25)
        {
            berserk[index] = true;
            player.UseActiveItem(CollectibleType.BERSERK);
            player.GetEntityFlags();
        }
    }
}

export function update(): void
{
    getPlayers().forEach(player => {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if (player.HasCollectible(CollectibleTypePurgatory.IRA))
        {
            if ((iraBerserk[index] ?? 0) > 0)
            {
                iraBerserk[index]--;
                if (iraBerserk[index] === 0)
                {
                    sfxManager.Play(SoundEffect.WEIRD_WORM_SPIT)
                    delay[index] = 0;
                    player.FireDelay = 0;
                    player.AddCacheFlags(CacheFlag.FIRE_DELAY);
                    player.EvaluateItems();
                }
                player.SetShootingCooldown(2);
            }
            if (sfxManager.IsPlaying(SoundEffect.BERSERK_END) && (berserk[index] ?? false))
            {
                berserk[index] = false;
                iraBerserk[index] = 150;
                player.SetShootingCooldown(2);
                delay[index] = 1000000;
                player.AddCacheFlags(CacheFlag.FIRE_DELAY);
                player.EvaluateItems();
                player.SetColor(COLORS.Red, 150, 0, true);
            }
        }
        else
        {
            delay[index] = 0;
            iraBerserk[index] = 0;
            berserk[index] = false;
        }
    })
}
export function evaluateCache(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.IRA))
    {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
        {
            player.MaxFireDelay += (delay[index] ?? 0);
        }
    }
}
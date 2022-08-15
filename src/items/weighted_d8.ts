import { ActiveSlot, CacheFlag, CollectibleType, UseFlag } from "isaac-typescript-definitions";
import { findFreePosition, getPlayers, getRandomFloat, getRoomData, spawnPickup } from "isaacscript-common";
import { v } from "../dataManager";

const betterReward = 0;
const extraRewards = 3;

export function postUseItem(type : CollectibleType, seed : RNG, player : EntityPlayer, flags : UseFlag, activeSlot : ActiveSlot, customVarData : int): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined
{
    if (type === CollectibleTypePurgatory.WEIGHTED_D8)
    {
        const ptrHash = GetPtrHash(player)
        const data = v.run.purgatoryData.getAndSetDefault(ptrHash);

        const amount = player.HasCollectible(CollectibleType.CAR_BATTERY) ? 2 : 1
        for (let i = 0; i < amount; i++)
        {
            player.AddBrokenHearts(1);
            data.weigthedD8Stats.damage += getRandomFloat(0, 2.5);
            data.weigthedD8Stats.tears += getRandomFloat(0, 2);
            data.weigthedD8Stats.range += getRandomFloat(0, 2);
            data.weigthedD8Stats.speed += getRandomFloat(0, 1);
        }

        player.AddCacheFlags(CacheFlag.DAMAGE);
        player.AddCacheFlags(CacheFlag.FIRE_DELAY);
        player.AddCacheFlags(CacheFlag.RANGE);
        player.AddCacheFlags(CacheFlag.SPEED);
        player.EvaluateItems();
        return {Discharge : true, Remove : false, ShowAnim : true};
    }
    return undefined;
}

export function evaluateCache(player : EntityPlayer, flag : CacheFlag): void
{
    const ptrHash = GetPtrHash(player);
    const data = v.run.purgatoryData.getAndSetDefault(ptrHash);
    if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
    {
        player.Damage += data.weigthedD8Stats.damage;
    }
    if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
    {
        player.MaxFireDelay /= math.sqrt(data.weigthedD8Stats.tears + 1);
    }
    if ((flag & CacheFlag.RANGE) === CacheFlag.RANGE)
    {
        player.TearRange += data.weigthedD8Stats.range;
    }
    if ((flag & CacheFlag.SPEED) === CacheFlag.SPEED)
    {
        player.MoveSpeed += data.weigthedD8Stats.speed;
    }
}
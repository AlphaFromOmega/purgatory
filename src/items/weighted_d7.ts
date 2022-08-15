import { ActiveSlot, CollectibleType, UseFlag } from "isaac-typescript-definitions";
import { findFreePosition, getRoomData, spawnPickup } from "isaacscript-common";

let betterReward = 0;
const extraRewards = 3;

export function postUseItem(type : CollectibleType, seed : RNG, player : EntityPlayer, flags : UseFlag, activeSlot : ActiveSlot, customVarData : int): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined
{
    if (type === CollectibleTypePurgatory.WEIGHTED_D7)
    {
        if ((getRoomData()?.SpawnCount ?? 0) > 0)
        {
            player.UseActiveItem(CollectibleType.D7);
            player.UseActiveItem(CollectibleType.D10);
            betterReward = player.HasCollectible(CollectibleType.CAR_BATTERY) ? 2 : 0;
            return {Discharge : true, Remove : false, ShowAnim : true};
        }
        return {Discharge : false, Remove : false, ShowAnim : false};
    }
    return undefined;
}

export function completeRoom(seed : RNG, spawn_pos : Vector) : void
{
    if (betterReward > 0)
    {
        for (let i = 0; i < extraRewards * betterReward; i++)
        {
            spawnPickup(0, 0, findFreePosition(spawn_pos));
            if (seed.RandomInt(4) > 0)
            {
                break;
            }
        }
        betterReward = 0;
    }
}

export function newRoom() : void
{
    betterReward = 0;
}
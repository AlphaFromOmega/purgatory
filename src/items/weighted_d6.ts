import { ActiveSlot, CollectibleType, EntityFlag, ItemConfigTag, UseFlag } from "isaac-typescript-definitions";
import { colorEquals, findFreePosition, getCollectibles, getPlayers, getRoomGridIndex, spawnPickup } from "isaacscript-common";
import { v } from "../dataManager";

export function postUseItem(type : CollectibleType, seed : RNG,  player : EntityPlayer, flags : UseFlag, activeSlot : ActiveSlot, customVarData : int): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined
{
    if (type === CollectibleTypePurgatory.WEIGHTED_D6)
    {
        const collectibles = getCollectibles();

        const ptrHash = GetPtrHash(player)
        const data = v.run.purgatoryData.getAndSetDefault(ptrHash);

        if (collectibles.length > 0 && data.weightedD6RoomIgnore < 0)
        {
            data.weightedD6RoomIgnore = getRoomGridIndex();
            const dupe = player.HasCollectible(CollectibleType.CAR_BATTERY);
            for (const c of collectibles)
            {
                const pickup2 = spawnPickup(c.Variant, c.SubType, findFreePosition(c.Position.add(Vector(40, 0))), c.Velocity, c);
                pickup2.AddEntityFlags(c.GetEntityFlags());
                if (dupe)
                {
                    const pickup3 = spawnPickup(c.Variant, c.SubType, c.Position, c.Velocity, c);
                    pickup3.AddEntityFlags(c.GetEntityFlags());
                }
                c.Position = findFreePosition(c.Position.add(Vector(-40, 0)));
                c.TargetPosition = c.Position;
            }
            return {Discharge : true, Remove : false, ShowAnim : true};
        }
        return {Discharge : false, Remove : false, ShowAnim : false};
    }
    return undefined;
}

export function update() : void
{
    for (const player of getPlayers())
    {
        const ptrHash = GetPtrHash(player)
        const data = v.run.purgatoryData.getAndSetDefault(ptrHash);
        if (data.weightedD6RoomIgnore >= 0 && data.weightedD6RoomIgnore !== getRoomGridIndex())
        {
            for (const c of getCollectibles())
            {
                if (!((Isaac.GetItemConfig().GetCollectible(c.SubType)?.HasTags(ItemConfigTag.QUEST)) ?? false))
                {
                    c.Remove();
                }
            }
        }
    }
}

export function postNewLevel() : void
{
    for (const player of getPlayers())
    {
        const ptrHash = GetPtrHash(player)
        const data = v.run.purgatoryData.getAndSetDefault(ptrHash);
        data.weightedD6RoomIgnore = -1;
    }
}
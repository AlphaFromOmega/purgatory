import { ActiveSlot, CollectibleType, PickupVariant, UseFlag } from "isaac-typescript-definitions";
import { findFreePosition, getPickups, getRandomInt, spawnPickup } from "isaacscript-common";

const blacklistedPickups = [PickupVariant.BED, PickupVariant.MOMS_CHEST, PickupVariant.COLLECTIBLE]

export function postUseItem(type : CollectibleType, seed : RNG, player : EntityPlayer, flags : UseFlag, activeSlot : ActiveSlot, customVarData : int): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined
{
    if (type === CollectibleTypePurgatory.WEIGHTED_D1)
    {
        const pickups = getPickups().filter(i => blacklistedPickups.findIndex(j => i.Variant === j) < 0);

        if (pickups.length > 0)
        {
            const chosenPickup = pickups[getRandomInt(0, pickups.length - 1, seed)]
            for (const c of pickups)
            {
                if (c !== chosenPickup)
                {
                    c.Remove()
                }
            }
            if (chosenPickup !== undefined)
            {
                spawnPickup(chosenPickup.Variant, chosenPickup.SubType, findFreePosition(chosenPickup.Position));
                if (player.HasCollectible(CollectibleType.CAR_BATTERY))
                {
                    spawnPickup(chosenPickup.Variant, chosenPickup.SubType, findFreePosition(chosenPickup.Position));
                }
            }
            return {Discharge : true, Remove : false, ShowAnim : true};
        }
        return {Discharge : false, Remove : false, ShowAnim : false};
    }
    return undefined;
}
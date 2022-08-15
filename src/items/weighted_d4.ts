import { ActiveSlot, CollectibleType, ItemConfigTag, ItemPoolType, ItemType, PlayerForm, UseFlag } from "isaac-typescript-definitions";
import { getCollectibleItemPoolType, getCollectibles, getCollectiblesInItemPool, getPlayerInventory, getRandomInt, runInNGameFrames } from "isaacscript-common";

const maxRerolls = 3;

export function itemBlacklist() : int[]
{
    const ib = [ 0 ]
    const collectibles = Isaac.GetItemConfig().GetCollectibles();
    for (let i = 0; i < collectibles.Size; i++)
    {
        const ic = Isaac.GetItemConfig().GetCollectible(i);
        if (ic !== undefined)
        {
            if (ic.HasTags(ItemConfigTag.QUEST) || ic.HasTags(ItemConfigTag.NO_EDEN) || ic.Type === ItemType.ACTIVE)
            {
                ib.push(i);
            }
        }
    }
    return ib;
}

export function postUseItem(type : CollectibleType, seed : RNG, player : EntityPlayer, flags : UseFlag, activeSlot : ActiveSlot, customVarData : int): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean; } | undefined
{
    if (type === CollectibleTypePurgatory.WEIGHTED_D4)
    {
        const inventory = getPlayerInventory(player, false);
        let quality = 0;
        let items = 0;
        for (const i of inventory)
        {
            const ic = Isaac.GetItemConfig().GetCollectible(i);
            if (ic !== undefined)
            {
                if (!ic.HasTags(ItemConfigTag.QUEST) && !ic.HasTags(ItemConfigTag.NO_EDEN))
                {
                    quality += ic.Quality;
                    items++;
                }
            }
        }

        if (items > 0)
        {
            const averageQuality = math.floor(quality / items);
            Isaac.ConsoleOutput(`AQ ${averageQuality}\n`)
            for (const i of inventory)
            {
                const ic = Isaac.GetItemConfig().GetCollectible(i);
                if (ic !== undefined)
                {
                    if (!ic.HasTags(ItemConfigTag.QUEST) && !ic.HasTags(ItemConfigTag.NO_EDEN))
                    {
                        player.RemoveCollectible(i);
                        let addedCollectible = -1;
                        for (let j = 0; j < maxRerolls; j++)
                        {
                            addedCollectible = getRandomInt(1, Isaac.GetItemConfig().GetCollectibles().Size, undefined, itemBlacklist())
                            // eslint-disable-next-line isaacscript/strict-enums
                            const acic = Isaac.GetItemConfig().GetCollectible(addedCollectible)
                            Isaac.ConsoleOutput(`${addedCollectible} - Quality ${(acic?.Quality ?? -1)}\n`)
                            if ((acic?.Quality ?? -1) >= averageQuality)
                            {
                                break;
                            }
                            else
                            {
                                addedCollectible = -1;
                            }
                        }
                        if (addedCollectible > 0)
                        {
                            // eslint-disable-next-line isaacscript/strict-enums
                            runInNGameFrames(() => {player.AddCollectible(addedCollectible)}, 2);
                        }

                        items++;
                        player.RemoveCollectible(i);
                    }
                }
            }
            return {Discharge : true, Remove : false, ShowAnim : true};
        }
        return {Discharge : false, Remove : false, ShowAnim : false};
    }
    return undefined;
}
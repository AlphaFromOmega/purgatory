import { CacheFlag, EntityType, PickupPrice, PickupVariant, RoomType } from "isaac-typescript-definitions";
import { getPlayers, getRandomFloat, getRandomInt } from "isaacscript-common";
import "../enum/CollectibleTypePurgatory";


const invidiaModifierAttack = [0, 0, 0, 0, 0, 0, 0, 0];
const invidiaModifierTears = [0, 0, 0, 0, 0, 0, 0, 0];
const invidiaModifierSpeed = [0, 0, 0, 0, 0, 0, 0, 0];
const invidiaModifierRange = [0, 0, 0, 0, 0, 0, 0, 0];
const invidiaModifierLuck = [0, 0, 0, 0, 0, 0, 0, 0];

export function restartInvidia(): void
{
    for (const player of getPlayers()) {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        invidiaModifierAttack[index] = 0;
        invidiaModifierTears[index] = 0;
        invidiaModifierSpeed[index] = 0;
        invidiaModifierRange[index] = 0;
        invidiaModifierLuck[index] = 0;
        player.AddCacheFlags(CacheFlag.DAMAGE);
        player.AddCacheFlags(CacheFlag.FIRE_DELAY);
        player.AddCacheFlags(CacheFlag.SPEED);
        player.AddCacheFlags(CacheFlag.RANGE);
        player.AddCacheFlags(CacheFlag.LUCK);
        player.EvaluateItems();
    }
}

export function newRoomInvidia() : void
{
    getPlayers().forEach(player => {
        if (player.HasCollectible(CollectibleTypePurgatory.INVIDIA))
        {
            const room = Game().GetRoom()
            if (room.GetType() === RoomType.SHOP)
            {
                const pickups = Isaac.FindByType(EntityType.PICKUP);
                if (pickups.length > 0)
                {
                    pickups.forEach(i => {
                        const pickup = i.ToPickup()
                        if (pickup !== undefined && pickup.IsShopItem())
                        {
                            pickup.AutoUpdatePrice = false;
                            pickup.Price = PickupPrice.FREE;
                        }
                    });
                }
                player.AddCacheFlags(CacheFlag.DAMAGE);
            }
        }
    });
}

export function pickupInvidia(pickup : EntityPickup, collider : Entity) : void
{
    const colliderPlayer: EntityPlayer | undefined = collider.ToPlayer();
    if (colliderPlayer !== undefined)
    {
        if (colliderPlayer.HasCollectible(CollectibleTypePurgatory.INVIDIA) && pickup.Variant === PickupVariant.COLLECTIBLE && colliderPlayer.QueuedItem.Item === undefined && colliderPlayer.CanPickupItem())
        {
            const index = getPlayers().findIndex(p => p.Index === colliderPlayer.Index);

            switch (getRandomInt(0, 4))
            {
                case 0:
                    invidiaModifierAttack[index] -= 0.5;
                    colliderPlayer.AddCacheFlags(CacheFlag.DAMAGE);
                    break;
                case 1:
                    invidiaModifierTears[index] += 0.25;
                    colliderPlayer.AddCacheFlags(CacheFlag.FIRE_DELAY);
                    break;
                case 2:
                    invidiaModifierSpeed[index] -= 0.2;
                    colliderPlayer.AddCacheFlags(CacheFlag.SPEED);
                    break;
                case 3:
                    invidiaModifierRange[index] -= 5;
                    colliderPlayer.AddCacheFlags(CacheFlag.RANGE);
                    break;
                case 4:
                    invidiaModifierLuck[index]--;
                    colliderPlayer.AddCacheFlags(CacheFlag.LUCK);
                    break;
            }
            colliderPlayer.EvaluateItems();
        }
    }

}

export function cacheInvidia(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.INVIDIA))
    {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
        {
            player.Damage = math.max(player.Damage + (invidiaModifierAttack[index] ?? 0), 0.5);
        }
        if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
        {
            player.MaxFireDelay += invidiaModifierTears[index] ?? 0;
        }
        if ((flag & CacheFlag.SPEED) === CacheFlag.SPEED)
        {
            player.MoveSpeed = math.max(player.MoveSpeed + (invidiaModifierSpeed[index] ?? 0), 0.2);
        }
        if ((flag & CacheFlag.RANGE) === CacheFlag.RANGE)
        {
            player.TearRange = math.max(player.TearRange + (invidiaModifierRange[index] ?? 0), 0.5);
        }
        if ((flag & CacheFlag.LUCK) === CacheFlag.LUCK)
        {
            player.Luck += invidiaModifierLuck[index] ?? 0;
        }
    }
}

export function initPickupInvidia(entity : EntityPickup): void
{
    getPlayers().forEach(player => {
        if (player.HasCollectible(CollectibleTypePurgatory.INVIDIA))
        {
            const pickup = entity.ToPickup();
            if (pickup !== undefined && getRandomFloat(0, 1) < 0.25 && pickup.Variant !== PickupVariant.COLLECTIBLE)
            {
                pickup.Remove();
            }
        }
    });
}
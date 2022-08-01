/* eslint-disable isaacscript/strict-enums */
import { ActiveSlot, BatterySubType, BombSubType, CacheFlag, CoinSubType, CollectibleType, HeartSubType, KeySubType, PickupVariant, SoundEffect, UseFlag } from "isaac-typescript-definitions";
import { game, getPlayers, getRandomInt, repeat, sfxManager } from "isaacscript-common";
import "../enum/CollectibleTypePurgatory";

const gulaModifierAttack = [0, 0, 0, 0, 0, 0, 0, 0];
const gulaModifierTears = [0, 0, 0, 0, 0, 0, 0, 0];
const gulaModifierSpeed = [0, 0, 0, 0, 0, 0, 0, 0];
const gulaModifierRange = [0, 0, 0, 0, 0, 0, 0, 0];
const gulaModifierLuck = [0, 0, 0, 0, 0, 0, 0, 0];

export function restartGula(): void
{
    for (const player of getPlayers()) {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        gulaModifierAttack[index] = 0;
        gulaModifierTears[index] = 0;
        gulaModifierSpeed[index] = 0;
        gulaModifierRange[index] = 0;
        gulaModifierLuck[index] = 0;
        player.AddCacheFlags(CacheFlag.DAMAGE);
        player.AddCacheFlags(CacheFlag.FIRE_DELAY);
        player.AddCacheFlags(CacheFlag.SPEED);
        player.AddCacheFlags(CacheFlag.RANGE);
        player.AddCacheFlags(CacheFlag.LUCK);
        player.EvaluateItems();
    }
}

export function pickupGula(pickup : EntityPickup, collider : Entity) : void
{
    const colliderPlayer: EntityPlayer | undefined = collider.ToPlayer();
    if (colliderPlayer !== undefined)
    {
        if (colliderPlayer.HasCollectible(CollectibleTypePurgatory.GULA))
        {
            let del = false;
            let rolls = 0;
            const multi = colliderPlayer.GetCollectibleNum(CollectibleTypePurgatory.GULA);
            switch(pickup.Variant)
            {
                case PickupVariant.HEART:
                {
                    const hm = (Number(colliderPlayer.HasCollectible(CollectibleType.MAGGYS_BOW)) + 1) * (colliderPlayer.GetCollectibleNum(CollectibleType.CANDY_HEART) + 1);
                    switch (pickup.SubType)
                    {
                        case HeartSubType.FULL: case HeartSubType.SCARED:
                        {
                            rolls = 2 * hm - (colliderPlayer.GetEffectiveMaxHearts() - colliderPlayer.GetHearts())
                            del = rolls === 2 * hm
                            break;
                        }
                        case HeartSubType.HALF:
                        {
                            rolls = hm - (colliderPlayer.GetEffectiveMaxHearts() - colliderPlayer.GetHearts())
                            del = rolls === hm
                            break;
                        }
                        case HeartSubType.SOUL: case HeartSubType.BLACK:
                        {
                            rolls = 2 - (colliderPlayer.GetHeartLimit() - (colliderPlayer.GetEffectiveMaxHearts() + colliderPlayer.GetSoulHearts() + colliderPlayer.GetBlackHearts()))
                            del = rolls === 2
                            break;
                        }
                        case HeartSubType.ETERNAL:
                        {
                            rolls = 1 - ((colliderPlayer.GetHeartLimit() + 1) - (colliderPlayer.GetMaxHearts() - colliderPlayer.GetEternalHearts()))
                            del = rolls === 1
                            break;
                        }
                        case HeartSubType.DOUBLE_PACK:
                        {
                            rolls = 4 * hm - (colliderPlayer.GetEffectiveMaxHearts() - colliderPlayer.GetHearts())
                            del = rolls === 4 * hm
                            break;
                        }
                        case HeartSubType.GOLDEN:
                        {
                            rolls = 1 - (colliderPlayer.GetGoldenHearts() - math.ceil((colliderPlayer.GetEffectiveMaxHearts() + colliderPlayer.GetSoulHearts() + colliderPlayer.GetBlackHearts())/2))
                            del = rolls === 1
                            break;
                        }
                        case HeartSubType.HALF_SOUL:
                        {
                            rolls = 1 - (colliderPlayer.GetHeartLimit() - (colliderPlayer.GetEffectiveMaxHearts() + colliderPlayer.GetSoulHearts() + colliderPlayer.GetBlackHearts()))
                            del = rolls === 1
                            break;
                        }
                        case HeartSubType.BLENDED:
                        {
                            rolls = hm * 2 - (colliderPlayer.GetEffectiveMaxHearts() - colliderPlayer.GetHearts())
                            rolls += 2 - (colliderPlayer.GetHeartLimit() - (colliderPlayer.GetEffectiveMaxHearts() + colliderPlayer.GetSoulHearts() + colliderPlayer.GetBlackHearts()))
                            rolls = math.min(rolls, 2 * hm)
                            del = rolls === 2 * hm
                            break;
                        }
                        case HeartSubType.BONE:
                        {
                            rolls = 1 - (colliderPlayer.GetHeartLimit() - colliderPlayer.GetEffectiveMaxHearts())
                            del = rolls === 1
                            break;
                        }
                        case HeartSubType.ROTTEN:
                        {
                            rolls = 1 - (math.ceil(colliderPlayer.GetEffectiveMaxHearts()/2)- colliderPlayer.GetRottenHearts())
                            del = rolls === 1
                            break;
                        }
                        default:
                        {
                            break;
                        }
                    }
                    break;
                }
                case PickupVariant.COIN:
                {
                    const maxCoins = colliderPlayer.HasCollectible(CollectibleType.DEEP_POCKETS) ? 999 : 99
                    switch (pickup.SubType)
                    {
                        case CoinSubType.PENNY:
                        {
                            rolls = 1 - (maxCoins - colliderPlayer.GetNumCoins())
                            del = rolls === 1
                            break;
                        }
                        case CoinSubType.NICKEL:
                        {
                            rolls = 5 - (maxCoins - colliderPlayer.GetNumCoins())
                            del = rolls === 5
                            break;
                        }
                        case CoinSubType.DIME:
                        {
                            rolls = 10 - (maxCoins - colliderPlayer.GetNumCoins())
                            del = rolls === 10
                            break;
                        }
                        case CoinSubType.DOUBLE_PACK:
                        {
                            rolls = 2 - (maxCoins - colliderPlayer.GetNumCoins())
                            del = rolls === 2
                            break;
                        }
                        case CoinSubType.LUCKY_PENNY:
                        {
                            rolls = 1 - (maxCoins - colliderPlayer.GetNumCoins())
                            del = rolls === 1
                            break;
                        }
                        case CoinSubType.GOLDEN:
                        {
                            rolls = 1 - (maxCoins - colliderPlayer.GetNumCoins())
                            del = false
                            break;
                        }
                        default:
                        {
                            break;
                        }
                    }
                    break;
                }
                case PickupVariant.KEY:
                {
                    const maxKeys = 99
                    switch (pickup.SubType)
                    {
                        case KeySubType.NORMAL:
                        {
                            rolls = 1 - (maxKeys - colliderPlayer.GetNumKeys())
                            del = rolls === 1;
                            break;
                        }
                        case KeySubType.GOLDEN:
                        {
                            rolls = math.ceil(math.sqrt(colliderPlayer.GetNumKeys() + 1) * Number(colliderPlayer.HasGoldenKey()))
                            del = rolls > 0;
                            break;
                        }
                        case KeySubType.DOUBLE_PACK:
                        {
                            rolls = 2 - (maxKeys - colliderPlayer.GetNumKeys())
                            del = rolls === 2;
                            break;
                        }
                        case KeySubType.CHARGED:
                        {
                            let charge = 6;
                            if (colliderPlayer.GetActiveItem(ActiveSlot.POCKET) > 0)
                            {
                                const item = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.POCKET));
                                if (item !== undefined)
                                {
                                    const possibleCharges = item.MaxCharges - colliderPlayer.GetActiveCharge(ActiveSlot.PRIMARY)
                                    charge = math.max(charge - possibleCharges, 0);
                                }
                            }
                            if (charge > 0 && colliderPlayer.GetActiveItem(ActiveSlot.PRIMARY) > 0)
                            {
                                const item = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.PRIMARY));
                                if (item !== undefined)
                                {
                                    const possibleCharges = item.MaxCharges - colliderPlayer.GetActiveCharge(ActiveSlot.PRIMARY)
                                    charge = math.max(charge - possibleCharges, 0);
                                }
                            }
                            if (charge > 0 && colliderPlayer.GetActiveItem(ActiveSlot.SECONDARY) > 0)
                            {
                                const item = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.SECONDARY));
                                if (item !== undefined)
                                {
                                    const possibleCharges = item.MaxCharges - colliderPlayer.GetActiveCharge(ActiveSlot.SECONDARY);
                                    charge = math.max(charge - possibleCharges, 0)
                                }
                            }
                            rolls = charge + math.max(1 - (maxKeys - colliderPlayer.GetNumKeys()))
                            del = rolls === (charge + 1);
                            break;
                        }
                        default:
                        {
                            break;
                        }
                    }
                    break;
                }
                case PickupVariant.BOMB:
                {
                    const maxBombs = 99
                    switch (pickup.SubType)
                    {
                        case BombSubType.NORMAL:
                        {
                            rolls = 1 - (maxBombs - colliderPlayer.GetNumBombs());
                            del = rolls === 1;
                            break;
                        }
                        case BombSubType.DOUBLE_PACK:
                        {
                            rolls = 2 - (maxBombs - colliderPlayer.GetNumBombs());
                            del = rolls === 2;
                            break;
                        }
                        case BombSubType.GOLDEN:
                        {
                            rolls = math.floor(math.sqrt(colliderPlayer.GetNumBombs() + 1) * Number(colliderPlayer.HasGoldenBomb()));
                            del = rolls > 1;
                            break;
                        }
                        case BombSubType.GIGA:
                        {
                            rolls = maxBombs - colliderPlayer.GetNumGigaBombs();
                            del = rolls === 1;
                            break;
                        }
                        default:
                        {
                            break;
                        }
                    }
                    break;
                }
                case PickupVariant.LIL_BATTERY:
                {
                    let charge = 0;
                    switch (pickup.SubType)
                    {
                        case BatterySubType.NORMAL:
                        {
                            charge = 6;
                            break;
                        }
                        case BatterySubType.MICRO:
                        {
                            charge = 2;
                            break;
                        }
                        case BatterySubType.MEGA:
                        {
                            const item1 = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.PRIMARY));
                            const item2 = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.POCKET));
                            if (item1 !== undefined)
                            {
                                charge += item1.MaxCharges;
                            }
                            if (item2 !== undefined)
                            {
                                charge += item2.MaxCharges;
                            }
                            charge *= 2;
                            break;
                        }
                        case BatterySubType.GOLDEN:
                        {
                            charge = 6;
                            break;
                        }
                        default:
                        {
                            break;
                        }
                    }
                    if (charge > 0)
                    {
                        if (colliderPlayer.GetActiveItem(ActiveSlot.POCKET) > 0)
                        {
                            const item = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.POCKET));
                            if (item !== undefined)
                            {
                                const possibleCharges = item.MaxCharges - colliderPlayer.GetActiveCharge(ActiveSlot.POCKET)
                                charge = math.max(charge - possibleCharges, 0);
                            }
                        }
                        if (charge > 0 && colliderPlayer.GetActiveItem(ActiveSlot.PRIMARY) > 0)
                        {
                            const item = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.PRIMARY));
                            if (item !== undefined)
                            {
                                const possibleCharges = item.MaxCharges - colliderPlayer.GetActiveCharge(ActiveSlot.PRIMARY)
                                charge = math.max(charge - possibleCharges, 0);
                            }
                        }
                        if (charge > 0 && colliderPlayer.GetActiveItem(ActiveSlot.SECONDARY) > 0 && pickup.SubType !== BatterySubType.MEGA)
                        {
                            const item = Isaac.GetItemConfig().GetCollectible(colliderPlayer.GetActiveItem(ActiveSlot.SECONDARY));
                            if (item !== undefined)
                            {
                                const possibleCharges = item.MaxCharges - colliderPlayer.GetActiveCharge(ActiveSlot.SECONDARY);
                                charge = math.max(charge - possibleCharges, 0)
                            }
                        }
                        rolls = charge;
                        del = (rolls === charge) && (pickup.SubType !== BatterySubType.GOLDEN);
                    }
                    break;
                }
                case PickupVariant.PILL:
                {
                    sfxManager.Play(SoundEffect.VAMP_GULP)
                    break;
                }
                case PickupVariant.TAROT_CARD:
                {
                    colliderPlayer.UseCard(pickup.SubType)
                    sfxManager.Play(SoundEffect.VAMP_GULP)
                    del = true
                    break;
                }
                default:
                {
                    break;
                }
            }
            rolls *=  multi
            if (rolls > 0)
            {
                sfxManager.Play(SoundEffect.VAMP_GULP)
                repeat(rolls, () => rollStats(colliderPlayer))
                colliderPlayer.EvaluateItems();
            }
            if (del)
            {
                pickup.Remove();
            }
        }
    }

}

export function updateGula(): void
{
    getPlayers().forEach(player => {
        if (player.HasCollectible(CollectibleTypePurgatory.GULA))
        {
            if (player.GetTrinket(0) > 0)
            {
                player.UseActiveItem(CollectibleType.SMELTER, UseFlag.NO_ANIMATION)
                sfxManager.Play(SoundEffect.VAMP_GULP)
            }
            for (let i = 0; i < 4; i++)
            {
                const p = player.GetPill(i)
                if (p > 0)
                {
                    player.UsePill(game.GetItemPool().GetPillEffect(p), p)
                    player.DropPocketItem(i, Vector(128, 128))
                }
            }
        }
    })
}

function rollStats(player : EntityPlayer)
{
    const index = getPlayers().findIndex(p => p.Index === player.Index);

    switch (getRandomInt(0, 4))
    {
        case 0:
            gulaModifierAttack[index] += 0.1;
            player.AddCacheFlags(CacheFlag.DAMAGE);
            break;
        case 1:
            gulaModifierTears[index] -= 0.1;
            player.AddCacheFlags(CacheFlag.FIRE_DELAY);
            break;
        case 2:
            gulaModifierSpeed[index] += 0.02;
            player.AddCacheFlags(CacheFlag.SPEED);
            break;
        case 3:
            gulaModifierRange[index]++;
            player.AddCacheFlags(CacheFlag.RANGE);
            break;
        case 4:
            gulaModifierLuck[index] += 0.1;
            player.AddCacheFlags(CacheFlag.LUCK);
            break;
    }
}


export function cacheGula(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.GULA))
    {
        const index = getPlayers().findIndex(p => p.Index === player.Index);
        if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
        {
            player.Damage += (gulaModifierAttack[index] ?? 0)
        }
        if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
        {
            player.MaxFireDelay += (gulaModifierTears[index] ?? 0);
        }
        if ((flag & CacheFlag.SPEED) === CacheFlag.SPEED)
        {
            player.MoveSpeed += (gulaModifierSpeed[index] ?? 0);
        }
        if ((flag & CacheFlag.RANGE) === CacheFlag.RANGE)
        {
            player.TearRange += (gulaModifierRange[index] ?? 0);
        }
        if ((flag & CacheFlag.LUCK) === CacheFlag.LUCK)
        {
            player.Luck += (gulaModifierLuck[index] ?? 0);
        }
    }
}
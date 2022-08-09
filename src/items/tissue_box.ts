import { CacheFlag } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";
import { v } from "../dataManager";

const damageUp = 0;
let checkDamage = false;

const tearCap = 3.5

export function evaluateCache(player : EntityPlayer, flag : CacheFlag) : void
{
    if (player.HasCollectible(CollectibleTypePurgatory.TISSUE_BOX))
    {
        if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
        {
            const ptrHash = GetPtrHash(player)
            const data = v.run.purgatoryData.getAndSetDefault(ptrHash);
            data.tissueBoxDamageUp = math.max((30/(player.MaxFireDelay + 1) - tearCap), 0);
            Isaac.ConsoleOutput(`${damageUp}`)
            player.MaxFireDelay = math.max(player.MaxFireDelay + 1, (30/tearCap - 1));
            checkDamage = true;
        }
        if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
        {
            const ptrHash = GetPtrHash(player)
            const data = v.run.purgatoryData.getAndSetDefault(ptrHash);
            player.Damage += data.tissueBoxDamageUp;
            player.Damage *= 1.2;
        }
    }
}

export function update() : void
{
    if (checkDamage)
    {
        let player : EntityPlayer | undefined;
        for (const p of getPlayers())
        {
            if (p.HasCollectible(CollectibleTypePurgatory.TISSUE_BOX))
            {
                player = p;
                break;
            }
        }
        if (player !== undefined)
        {
            player.AddCacheFlags(CacheFlag.DAMAGE);
            player.EvaluateItems();
            checkDamage = false;
        }
    }
}
import { CacheFlag, CollectibleType } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";

let damageUp = 0;
let checkDamage = false;

const tearCap = 3.5

export function evaluateCache(player : EntityPlayer, flag : CacheFlag) : void
{
  if (player.HasCollectible(CollectibleTypePurgatory.TISSUE_BOX))
  {
      if ((flag & CacheFlag.DAMAGE) === CacheFlag.DAMAGE)
      {
          player.Damage += damageUp;
          player.Damage *= 1.2;
      }
      if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
      {
          damageUp = math.max((30/(player.MaxFireDelay + 1) - tearCap), 0);
          Isaac.ConsoleOutput(`${damageUp}`)
          player.MaxFireDelay = math.max(player.MaxFireDelay + 1, (30/tearCap - 1));
          checkDamage = true;
      }
  }
}

export function update() : void
{
    if (checkDamage)
    {
        let player;
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
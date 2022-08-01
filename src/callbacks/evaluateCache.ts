import { CacheFlag } from "isaac-typescript-definitions";
import { cacheAcedia } from "../items/acedia";
import { cacheAvaritia } from "../items/avaritia";
import { cacheGula } from "../items/gula";
import { cacheInvidia } from "../items/invidia";
import { cacheIra } from "../items/ira";
import { cacheSprinklerHead } from "../items/sprinkler_head";
import { cacheSuperbia } from "../items/superbia";

export function evaluateCache(player : EntityPlayer, flag : CacheFlag): void
{
    cacheSuperbia(player, flag);
    cacheInvidia(player, flag);
    cacheIra(player, flag);
    cacheAcedia(player, flag);
    cacheAvaritia(player, flag);
    cacheGula(player, flag)
    cacheSprinklerHead(player, flag)
}
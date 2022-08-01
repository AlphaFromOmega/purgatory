import { EntityType } from "isaac-typescript-definitions";
import { getNPCs, getPlayers } from "isaacscript-common";

export function updateMemoryLeak() : void
{
    const players = getPlayers();
    let hasMemoryLeak = false;
    for (const player of players)
    {
        if (player.HasCollectible(CollectibleTypePurgatory.MEMORY_LEAK))
        {
            hasMemoryLeak = true;
            break;
        }
    }
    if (hasMemoryLeak)
    {
        const enemies = getNPCs().filter(i => i.Type !== EntityType.PLAYER)
        enemies.forEach(e => {
            if (e.Parent?.Type !== EntityType.PLAYER)
            {
                e.AddVelocity(Vector(16, 0))
            }
        });
    }
}
import { DamageFlag, EntityType } from "isaac-typescript-definitions";
import { getNPCs, getPlayers, getProjectiles } from "isaacscript-common";

const maxTime = 9000;
// const maxTime = 150; // Debugging Damage Only
let time = maxTime;

export function restart(): void
{
    time = maxTime
}

export function update() : void
{
    const players = getPlayers();
    let leaks = 0;
    for (const player of players)
    {
        leaks += player.GetCollectibleNum(CollectibleTypePurgatory.MEMORY_LEAK);
    }
    if (leaks > 0)
    {
        const enemies = getNPCs().filter(i => i.Type !== EntityType.PLAYER)
        enemies.forEach(e => {
            if (e.Parent?.Type !== EntityType.PLAYER)
            {
                e.Velocity = e.Velocity.mul(0.8 ** leaks);
            }
        });
        const tears = getProjectiles()
        tears.forEach(t => {
            if (t.SpawnerEntity?.Type !== EntityType.PLAYER && t.SpawnerEntity?.Type !== EntityType.FAMILIAR && t.FrameCount === 1)
            {
                t.Velocity = t.Velocity.mul(0.8 ** leaks);
            }
        })
        time--;
        if (time === 0)
        {
            for (const player of players)
            {
                if (player.HasCollectible(CollectibleTypePurgatory.MEMORY_LEAK))
                {
                    player.TakeDamage(2, DamageFlag.COUNTDOWN, EntityRef(player), 30)
                }
            }
            time = 60;
        }
    }
}

export function postNewLevel() : void
{
    time = maxTime
}
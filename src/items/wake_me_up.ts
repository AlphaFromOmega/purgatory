import { EntityType } from "isaac-typescript-definitions";
import { getPlayers, spawnNPC, spawnPickup } from "isaacscript-common";
import { v } from "../dataManager";



export function postNPCInitLate(npc : EntityNPC) : void
{
    let hasWakeMeUp = false;

    for (const player of getPlayers())
    {
        if (player.HasCollectible(CollectibleTypePurgatory.WAKE_ME_UP))
        {
            hasWakeMeUp = true;
        }
    }

    const hash1 = GetPtrHash(npc);
    const data = v.run.purgatoryData.getAndSetDefault(hash1);
    if (hasWakeMeUp && !data.wakeMeUpDuplication && npc.SpawnerEntity?.Type !== npc.Type && npc.SpawnerEntity?.Variant !== npc.Variant && npc.SpawnerEntity?.SubType !== npc.SubType)
    {
        const npc2 = spawnNPC(npc.Type, npc.Variant, npc.SubType, npc.Position.add(Vector(16, -16)), npc.Velocity, npc);
        npc.Position = npc.Position.add(Vector(-16, 16));
        npc.SetColor(Color(1, 0, 0), 216000, 1);
        npc2.SetColor(Color(0, 0, 1), 216000, 1);
        data.wakeMeUpDuplication = true;
        const hash2 = GetPtrHash(npc2);
        const data2 = v.run.purgatoryData.getAndSetDefault(hash2);
        data2.wakeMeUpDuplication = true;
    }
}

export function postPickupInitLate(pickup : EntityPickup) : void
{
    let hasWakeMeUp = false;

    for (const player of getPlayers())
    {
        if (player.HasCollectible(CollectibleTypePurgatory.WAKE_ME_UP))
        {
            hasWakeMeUp = true;
        }
    }
    const hash1 = GetPtrHash(pickup);
    const data = v.run.purgatoryData.getAndSetDefault(hash1);
    Isaac.ConsoleOutput(`B ${data.wakeMeUpDuplication} \n`);
    if (hasWakeMeUp && !data.wakeMeUpDuplication && pickup.SpawnerEntity?.Type !== pickup.Type && pickup.SpawnerEntity?.Variant !== pickup.Variant && pickup.SpawnerEntity?.SubType !== pickup.SubType)
    {
        const pickup2 = spawnPickup(pickup.Variant, pickup.SubType, pickup.Position.add(Vector(16, -16)), pickup.Velocity, pickup);
        pickup.Position = pickup.Position.add(Vector(-16, 16));
        pickup.SetColor(Color(1, 0, 0), 216000, 1);
        pickup2.SetColor(Color(0, 0, 1), 216000, 1);
        data.wakeMeUpDuplication = true;
        const hash2 = GetPtrHash(pickup2);
        const data2 = v.run.purgatoryData.getAndSetDefault(hash2);
        data2.wakeMeUpDuplication = true;
        Isaac.ConsoleOutput(`A ${data.wakeMeUpDuplication} \n`)
    }
}
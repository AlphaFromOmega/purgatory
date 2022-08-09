import { EntityType } from "isaac-typescript-definitions";
import { getPlayers, getRoomDescriptor, spawnNPC, spawnPickup } from "isaacscript-common";

let recentlyEntered = false;

const blacklistedNPCs = [EntityType.POOP, EntityType.FIREPLACE]

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

    if (hasWakeMeUp && (!recentlyEntered || getRoomDescriptor().VisitedCount <= 1) && npc.SpawnerEntity?.Type !== npc.Type && npc.SpawnerEntity?.Variant !== npc.Variant && npc.SpawnerEntity?.SubType !== npc.SubType)
    {
        for (const i of blacklistedNPCs)
        {
            if (i === npc.Type)
            {
                return;
            }
        }

        const npc2 = spawnNPC(npc.Type, npc.Variant, npc.SubType, npc.Position.add(Vector(8, -8)), npc.Velocity, npc);
        npc.Position = npc.Position.add(Vector(-8, 8));
        npc.Scale *= 0.75;
        npc2.Scale *= 0.75;
        npc.SetColor(Color(1, 0, 0), 216000, 1);
        npc2.SetColor(Color(0, 0, 1), 216000, 1);
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

    if (hasWakeMeUp && (!recentlyEntered || getRoomDescriptor().VisitedCount <= 1)  && pickup.SpawnerEntity?.Type !== pickup.Type && pickup.SpawnerEntity?.Variant !== pickup.Variant && pickup.SpawnerEntity?.SubType !== pickup.SubType)
    {
        const pickup2 = spawnPickup(pickup.Variant, pickup.SubType, pickup.Position.add(Vector(8, -8)), pickup.Velocity, pickup);
        pickup.Position = pickup.Position.add(Vector(-8, 8));
        pickup.SetColor(Color(1, 0, 0), 216000, 1);
        pickup2.SetColor(Color(0, 0, 1), 216000, 1);
    }
}

export function newRoom() : void
{
    recentlyEntered = true;
}

export function update() : void
{
    recentlyEntered = false;
}
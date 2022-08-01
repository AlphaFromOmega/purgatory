import "./enum/CollectibleTypePurgatory";

export function eid(): void{
    if (EID !== undefined)
    {
        EID.addCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD, "↑ x4 Fire Rate Up#Tears will be shot at 45 degree intervals.")
        EID.addCollectible(CollectibleTypePurgatory.MEMORY_LEAK, "Projectiles and Enemies are slowed when entering a room.#Spending more than 5 minutes on a floor causes Isaac to take damage.")
        EID.addCollectible(CollectibleTypePurgatory.SUPERBIA, "↑ +0.25 Damage per room cleared#↓ -0.25 Damage on hit#All damage ups are removed on hit.")
        EID.addCollectible(CollectibleTypePurgatory.INVIDIA, "↑ Shops sell items for free.#↓ Random stat down on picking up a pedestal item.#↓ Collectibles have a 25% chance of being stolen when entering a room")
        EID.addCollectible(CollectibleTypePurgatory.IRA, "25% chance on hit to become enraged#While enraged Isaac is invincible and deals additional contact damage#Can not fire tears while enraged or a small period after.")
        EID.addCollectible(CollectibleTypePurgatory.ACEDIA, "↓ -0.3 Speed#Doubles current damage upon entering room.#Damage is decreased as Isaac moves.")
        EID.addCollectible(CollectibleTypePurgatory.AVARITIA, "↓ Halves Issac's Damage, Tears and Luck#Stats up based on pickups#{{Coin}} +0.1 Luck per Coin#{{Bomb}} +0.25 Damage per Bomb#{{Key}} +0.25 Tears per Key")
        EID.addCollectible(CollectibleTypePurgatory.GULA, "↑ Increases a random stat upon picking up a collectible while already at the max.#Pocket items are immediately used on pickup.#Trinkets are immediately gulped on pickup.")
        EID.addCollectible(CollectibleTypePurgatory.LUXURIA, "{{Charm}} 20% chance to shoot charming tears#↑ x2 Damage against uncharmed enemies#↓ x0.5 Damage against charmed enemies")
    }
}
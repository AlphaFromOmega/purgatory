import "./enum/CollectibleTypePurgatory";

export function eid(): void{
    if (EID !== undefined)
    {
        EID.addCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD, "↑ x4 Fire Rate Up#Tears will be shot at 45 degree intervals.")
        EID.addCollectible(CollectibleTypePurgatory.MEMORY_LEAK, "{{Slow}} Permanent slow effect for enemies.#Spending more than 5 minutes on a floor causes Isaac to take damage.")

        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D1, "Duplicates a random pickup in the room.#All other pickups in the room are deleted.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D4, "Rerolls all items on Isaac ignoring the item pools they are from.#Items will be rerolled up to 3 times while they are below the average item quality.#If the item is still below the average quality it will be discarded.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D6, "Duplicates all items within a room.#All other items for the rest of the floor are removed.#Story items will not be removed.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D7, "Restarts the room with the chance of getting 1-4 pickups as a reward.#The rooms enemies will be randomised.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D8, "Random stats ups on damage, tears, range and speed.#Grants a broken heart on use.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D10, "Halves the health of all enemies in the room.#Damages Isaac for half of his current health.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D12, "Changes the floor's boss to one from the next chapter.#The Boss will drop an additional boss item on kill.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D20, "All pickups in the room become a random chest.#There is an increased chance the chest will be a spiked, mimic or haunted chest.")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_D100, "Duplicates a random pickup which becomes a random chest while all other pickups in the room are deleted.#Rerolls all items on Isaac which are more likely to be a higher quality but if below the average quality item quality collected before rerolling it will be removed.#Duplicates all items in a room and removes all other items for the rest of the floor.#Restarts the room with random enemies while also getting more pickups.#Random stats ups while granting a broken heart.#Halves the health of Isaac and all monsters.#Changes the floors boss to a later boss.")

        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_ETERNAL_D6, "Rerolls items with a higher chance of getting a higher quality.#Each use of the dice increases the chance of removing items by 1%")
        EID.addCollectible(CollectibleTypePurgatory.WEIGHTED_SPINDOWN_DICE, "Rerolls the item to the next lowest item ID with quality 4.#If used on a quality 4 item the item will explode.")

        EID.addCollectible(CollectibleTypePurgatory.TISSUE_BOX, "↑ +20% damage#↓ +1 Tear Delay#Tears are capped at 3.50#All tears lost from the cap are added to damage instead.")
        EID.addCollectible(CollectibleTypePurgatory.WAKE_ME_UP, "Doubles all monster and collectible spawns.")
        EID.addCollectible(CollectibleTypePurgatory.SUPERBIA, "↑ +0.25 Damage per room cleared#↓ -0.25 Damage on hit#All damage ups are removed on hit.")
        EID.addCollectible(CollectibleTypePurgatory.INVIDIA, "↑ Shops sell items for free.#↓ Random stat down on picking up a pedestal item.#↓ Collectibles have a 25% chance of being stolen when entering a room")
        EID.addCollectible(CollectibleTypePurgatory.IRA, "25% chance on hit to become enraged#While enraged Isaac is invincible and deals additional contact damage#Can not fire tears while enraged or a small period after.")
        EID.addCollectible(CollectibleTypePurgatory.ACEDIA, "↓ -0.3 Speed#Doubles current damage upon entering room.#Damage is decreased as Isaac moves.")
        EID.addCollectible(CollectibleTypePurgatory.AVARITIA, "↓ Halves Issac's Damage, Tears and Luck#Stats up based on pickups#{{Coin}} +0.1 Luck per Coin#{{Bomb}} +0.25 Damage per Bomb#{{Key}} +0.25 Tears per Key")
        EID.addCollectible(CollectibleTypePurgatory.GULA, "↑ Increases a random stat upon picking up a collectible while already at the max.#Pocket items are immediately used on pickup.#Trinkets are immediately gulped on pickup.")
        EID.addCollectible(CollectibleTypePurgatory.LUXURIA, "{{Charm}} 20% chance to shoot charming tears#↑ x2 Damage against uncharmed enemies#↓ x0.5 Damage against charmed enemies")
    }
}
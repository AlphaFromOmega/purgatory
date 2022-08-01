import { pickupGula } from "../items/gula";
import { pickupInvidia } from "../items/invidia";

export function preCollidePickup(pickup : EntityPickup, collider : Entity, low : boolean): boolean | undefined
{
    pickupInvidia(pickup, collider);
    pickupGula(pickup, collider);
    return undefined;
}
import { completeRoomSuperbia } from "../items/superbia";

export function preRoomReward(seed : RNG, spawn_pos : Vector): boolean
{
    completeRoomSuperbia();
    return true;
}
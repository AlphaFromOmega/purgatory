import { newRoomAcedia } from "../items/acedia";
import { newRoomInvidia } from "../items/invidia";
import { newRoomSuperbia } from "../items/superbia";

export function postRoomEnter(): void
{
    newRoomSuperbia();
    newRoomInvidia();
    newRoomAcedia();
}
import { DefaultMap, saveDataManager } from "isaacscript-common";
import { PurgatoryRoomData } from "./data/roomData";
import { PurgatoryRunData } from "./data/runData";



export const v = {
  run: {
    purgatoryData: new DefaultMap<PtrHash, PurgatoryRunData>(() => new PurgatoryRunData()),
  },
  room: {
    purgatoryData: new DefaultMap<PtrHash, PurgatoryRoomData>(() => new PurgatoryRoomData()),
  }
};

export function purgatoryDataInit(): void {
  saveDataManager("purgatory", v);
}

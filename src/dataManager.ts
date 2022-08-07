import { DefaultMap, saveDataManager } from "isaacscript-common";

export class PurgatoryData {
  wakeMeUpDuplication = false;
}

export const v = {
  run: {
    purgatoryData: new DefaultMap<PtrHash, PurgatoryData>(() => new PurgatoryData()),
  },
};

export function purgatoryDataInit(): void {
  saveDataManager("purgatory", v);
}

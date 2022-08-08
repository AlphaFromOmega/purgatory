import { DefaultMap, saveDataManager } from "isaacscript-common";

export class PurgatoryRunData {
  tissueBoxDamageUp = 0;
}

export const v = {
  run: {
    purgatoryData: new DefaultMap<PtrHash, PurgatoryRunData>(() => new PurgatoryRunData()),
  },
};

export function purgatoryDataInit(): void {
  saveDataManager("purgatory", v);
}

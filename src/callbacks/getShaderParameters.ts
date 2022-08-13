import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";

export function init(mod : ModUpgraded): void {
  mod.AddCallback(ModCallback.GET_SHADER_PARAMS, main);
}
function main(shaderName : string) : Record<string, unknown> | undefined
{
    let params : Record<string, unknown> | undefined;
    switch (shaderName)
    {
        case "Purgatory-Grayscale" :
        {
            const enabled =  Game().GetLevel().GetName() === "" ? 1 : 0;
            params =
            {
                Enabled : enabled
            }
        }
    }
    return params;
}
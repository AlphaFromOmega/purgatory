import { CacheFlag, CollectibleType, EntityType} from "isaac-typescript-definitions";
import { FamiliarVariant, LaserVariant } from "isaac-typescript-definitions/dist/enums/collections/variants";
import { getFamiliars } from "isaacscript-common";

let rotateAmount = 0;

let shotCooldown = 0;

export function tearInit(tear : EntityTear): void
{
    if (tear.SpawnerType === EntityType.PLAYER)
    {
        const player = tear.SpawnerEntity?.ToPlayer();
        if (player !== undefined && player.FireDelay >= player.MaxFireDelay - 0.5 && player.HasCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD))
        {
            if (shotCooldown <= 0)
            {
                rotateAmount = (rotateAmount + 1) % 8;
                shotCooldown = player.FireDelay - 0.5;
            }
            const nVel = tear.Velocity;
            const nDir = player.GetShootingInput();

            nVel.Normalize();
            nDir.Normalize();
            const angleOffset = nVel.GetAngleDegrees() - nDir.GetAngleDegrees();

            tear.Velocity = Vector(player.ShotSpeed * 8, 0).Rotated((rotateAmount * 45) + angleOffset);
            if (player.HasCollectible(CollectibleType.GUILLOTINE))
            {
                getFamiliars(FamiliarVariant.GUILLOTINE).forEach(f => {
                    if (f.Player.Index === player.Index)
                    {
                        tear.Position = f.Position;
                    }
                })
            }
            else
            {
                tear.Position = player.Position;
            }
        }
    }
}

export function laserInit(laser : EntityLaser): void
{
    const p = laser.SpawnerEntity?.ToPlayer();
    if (p !== undefined && p.HasCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD) && (laser.Position.sub(p.Position).Length() < 32) && laser.Variant !== LaserVariant.ELECTRIC)
    {
        if (shotCooldown <= 0)
        {
            rotateAmount = (rotateAmount + 1) % 8;
            shotCooldown = 1;
        }
        if (laser.IsCircleLaser())
        {
            const nVel = laser.Velocity;
            const nDir = p.GetShootingInput();

            nVel.Normalize();
            nDir.Normalize();
            const angleOffset = nVel.GetAngleDegrees() - nDir.GetAngleDegrees();
            laser.Velocity = Vector(laser.Velocity.Length(), 0).Rotated(rotateAmount * 45 + angleOffset);
        }
        else
        {
            const nDir = p.GetShootingInput();

            nDir.Normalize();
            const angleOffset = laser.RotationDegrees - nDir.GetAngleDegrees();
            laser.SetActiveRotation(0, rotateAmount * 45 + angleOffset + nDir.GetAngleDegrees(), 2000, true);
        }
    }
}

export function evaluateCache(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD))
    {
        if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
        {
            player.MaxFireDelay /= 4 * player.GetCollectibleNum(CollectibleTypePurgatory.SPRINKLER_HEAD);
        }
    }
}
export function update(): void
{
    shotCooldown = math.max(shotCooldown - 1, 0);
}
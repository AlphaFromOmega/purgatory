import { CacheFlag, EntityType, LaserVariant } from "isaac-typescript-definitions";

let rotateAmount = 0;

let shotCooldown = 0;

export function tearInitSprinklerHead(tear : EntityTear): void
{
    if (tear.SpawnerType === EntityType.PLAYER)
    {
        const player = tear.SpawnerEntity?.ToPlayer();
        if (player !== undefined && player.HasCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD) && (tear.Position.sub(player.Position).Length() < 16))
        {
            if (shotCooldown <= 0)
            {
                rotateAmount = (rotateAmount + 1) % 8;
                shotCooldown = 1;
            }
            const nVel = tear.Velocity;
            const nDir = player.GetShootingInput();

            nVel.Normalize();
            nDir.Normalize();
            const angleOffset = nVel.GetAngleDegrees() - nDir.GetAngleDegrees();

            tear.Velocity = Vector(player.ShotSpeed * 8, 0).Rotated((rotateAmount * 45) + angleOffset);
        }
    }
}

export function laserInitSprinklerHead(laser : EntityLaser): void
{
    const p = laser.SpawnerEntity?.ToPlayer();
    if (p !== undefined && p.HasCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD) && (laser.Position.sub(p.Position).Length() < 16) && laser.Variant !== LaserVariant.ELECTRIC)
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

export function cacheSprinklerHead(player : EntityPlayer, flag : CacheFlag): void
{
    if (player.HasCollectible(CollectibleTypePurgatory.SPRINKLER_HEAD))
    {
        if ((flag & CacheFlag.FIRE_DELAY) === CacheFlag.FIRE_DELAY)
        {
            player.MaxFireDelay /= 4;
        }
    }
}
export function updateSprinklerHead(): void
{
    shotCooldown = math.max(shotCooldown - 1, 0);
}
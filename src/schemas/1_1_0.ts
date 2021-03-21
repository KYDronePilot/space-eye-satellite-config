import { Satellite, saveConfig } from '../base'
import { transform as transform_1_0_1 } from './1_0_1'
import { RootSatelliteConfig as RootSatelliteConfig_1_1_1 } from './1_1_1'

export { Satellite, SatelliteView, ImageSource, ScalingOption } from '../base'

export const version = '1.1.0'

/**
 * Root satellite config object.
 */
export interface RootSatelliteConfig {
    satellites: Satellite[]
}

/**
 * Transform the base config to a version 1.0.1 config.
 *
 * @param baseConfig - The base config
 */
export async function transform(baseConfig: RootSatelliteConfig_1_1_1) {
    const config: RootSatelliteConfig = {
        satellites: baseConfig.satellites,
    }
    await saveConfig(config, version)
    await transform_1_0_1(config)
}

import { RootSatelliteConfig as RootSatelliteConfigBase, Satellite, saveConfig } from '../base'
import { transform as transform_1_1_1 } from './1_1_1'

export { Satellite, SatelliteView, ImageSource, ScalingOption } from '../base'

export const version = '1.2.0'

/**
 * Root satellite config object.
 */
export interface RootSatelliteConfig {
    satellites: Satellite[]
    dnsHttpProbeOverride: string[]
}

/**
 * Transform the base config to a version 1.0.1 config.
 *
 * @param baseConfig - The base config
 */
export async function transform(baseConfig: RootSatelliteConfigBase) {
    const config: RootSatelliteConfig = {
        satellites: baseConfig.satellites,
        dnsHttpProbeOverride: baseConfig.dnsHttpProbeOverride,
    }
    await saveConfig(config, version)
    await transform_1_1_1(config)
}

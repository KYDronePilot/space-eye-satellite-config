import { Satellite as SatelliteBase, ImageSource as ImageSourceBase, saveConfig } from '../base'
import { transform as transform_1_1_0 } from './1_1_0'
import { RootSatelliteConfig as RootSatelliteConfig_1_2_0 } from './1_2_0'

export { ImageSource, ScalingOption } from '../base'

export const version = '1.1.1'

export interface SatelliteView {
    id: number
    name: string
    imageSources: ImageSourceBase[]
    isThumbnail?: boolean
}

export interface Satellite extends SatelliteBase {
    views: SatelliteView[]
}

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
export async function transform(baseConfig: RootSatelliteConfig_1_2_0) {
    const config: RootSatelliteConfig = {
        satellites: baseConfig.satellites.map((satellite) => ({
            ...satellite,
            views: satellite.views.map((view) => ({
                id: view.id,
                name: view.name,
                imageSources: view.imageSources,
                isThumbnail: view.isThumbnail,
            })),
        })),
        dnsHttpProbeOverride: baseConfig.dnsHttpProbeOverride,
    }
    await saveConfig(config, version)
    await transform_1_1_0(config)
}

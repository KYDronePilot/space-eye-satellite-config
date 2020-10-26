import {RootSatelliteConfig as RootSatelliteConfigBase, SchemaInfo} from '../base'
import {Satellite} from './1_0_0'

export {ImageSource, SatelliteView, Satellite} from './1_0_0'

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
 * @return Version 1.0.1 config
 */
export function transform(baseConfig: RootSatelliteConfigBase): RootSatelliteConfig {
    return {
        satellites: baseConfig.satellites
    }
}

export const version = '1.0.1'

export const info: SchemaInfo = {
    transformer: transform,
    version
}

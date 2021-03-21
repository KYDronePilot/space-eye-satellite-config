import { saveConfig } from '../base'
import {Satellite, transform as transform_1_0_0} from './1_0_0'
import {RootSatelliteConfig as RootSatelliteConfig_1_1_0} from './1_1_0'

export {ImageSource, SatelliteView, Satellite} from './1_0_0'

export const version = '1.0.1'

/**
 * Root satellite config object.
 */
export interface RootSatelliteConfig {
    satellites: Satellite[]
}

export async function transform(baseConfig: RootSatelliteConfig_1_1_0) {
  const config: RootSatelliteConfig = {
    satellites: baseConfig.satellites.map((satellite) => ({
      ...satellite,
      views: satellite.views.map((view) => ({ 
          ...view,
          imageSources: view.imageSources.map(imageSource => ({
            id: imageSource.id,
            url: imageSource.url,
            estimatedSize: imageSource.estimatedSize,
            updateInterval: imageSource.updateInterval,
            dimensions: imageSource.dimensions,
            isThumbnail: imageSource.isThumbnail,
          }))
       })),
    })),
  }
  await saveConfig(config, version)
  await transform_1_0_0(config)
}

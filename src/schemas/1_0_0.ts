import {RootSatelliteConfig as RootSatelliteConfigBase, SchemaInfo} from '../base'

/**
 * Information about a particular image source.
 */
export interface ImageSource {
    id: number
    url: string
    estimatedSize: string
    updateInterval: number
    dimensions: [number, number]
    isThumbnail?: boolean
}

/**
 * A view from a satellite.
 */
export interface SatelliteView {
    id: number
    name: string
    imageSources: ImageSource[]
    isThumbnail?: boolean
}

/**
 * A particular satellite.
 */
export interface Satellite {
    id: number
    name: string
    views: SatelliteView[]
}

/**
 * Root satellite config object.
 */
export interface RootSatelliteConfig {
    version: string
    satellites: Satellite[]
}

/**
 * Transform the base config to a version 1.0.0 config.
 *
 * @param baseConfig - The base config
 * @return Version 1.0.0 config
 */
export function transform(
    baseConfig: RootSatelliteConfigBase
): RootSatelliteConfig {
    return {
        ...baseConfig,
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
      };
}

export const version = '1.0.0'

export const info: SchemaInfo = {
    transformer: transform,
    version
}

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

export interface SchemaInfo {
    transformer: (baseConfig: RootSatelliteConfig) => any
    version: string
}

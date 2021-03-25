import path from 'path'
import fse from 'fs-extra'

const CONFIG_DIST = path.join(__dirname, '..', 'config_dist')

/**
 * Scaling options for images.
 */
export enum ScalingOption {
    fit = 'fit',
    fill = 'fill',
}

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
    defaultScaling: ScalingOption
}

/**
 * A view from a satellite.
 */
export interface SatelliteView {
    id: number
    name: string
    imageSources: ImageSource[]
    description?: string
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
    dnsHttpProbeOverride: string[]
}

export interface SchemaInfo {
    transformer: (baseConfig: RootSatelliteConfig) => any
    version: string
}

export async function saveConfig(config: {}, version: string) {
    const configDir = path.join(CONFIG_DIST, version)
    await fse.ensureDir(configDir)
    const configFile = path.join(configDir, 'config.json')
    const rawConfig = JSON.stringify(config)
    await fse.writeFile(configFile, rawConfig)
}

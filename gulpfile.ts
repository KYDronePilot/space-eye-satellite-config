import gulp from 'gulp'
import path from 'path'
import jsYaml from 'js-yaml'
import { RootSatelliteConfig } from './src/base'
import { transform } from './src/schemas/1_2_0'
import fse from 'fs-extra'

const CONFIG_DIST = path.join(__dirname, 'config_dist')
const BASE_CONFIG = path.join(__dirname, 'config.yaml')

gulp.task('build-yaml', async () => {
    fse.ensureDirSync(CONFIG_DIST)
    const baseConfig = jsYaml.load(fse.readFileSync(BASE_CONFIG).toString()) as RootSatelliteConfig
    await transform(baseConfig)
})

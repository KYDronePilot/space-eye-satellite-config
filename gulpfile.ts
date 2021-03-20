import gulp from 'gulp'
import path from 'path'
import jsYaml from 'js-yaml'
import { RootSatelliteConfig } from './src/base'
import { transform } from './src/schemas/latest'
import fse from 'fs-extra'

const CONFIG_DIST = path.join(__dirname, 'config_dist')
const BASE_CONFIG = path.join(__dirname, 'config.yaml')

gulp.task('build-yaml', async () => {
    fse.ensureDirSync(CONFIG_DIST)
    const baseConfig: RootSatelliteConfig = jsYaml.load(fse.readFileSync(BASE_CONFIG).toString())
    await transform(baseConfig)
})

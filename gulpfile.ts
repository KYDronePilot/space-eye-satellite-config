import gulp from 'gulp'
import path from 'path'
import fs from 'fs'
import jsYaml from 'js-yaml'
import { RootSatelliteConfig } from './src/base'
import { schemas } from './src/schemas'

const CONFIG_DIST = path.join(__dirname, 'config_dist')
const BASE_CONFIG = path.join(__dirname, 'config.yaml')

gulp.task('build-yaml', (done) => {
    if (!fs.existsSync(CONFIG_DIST)) {
        fs.mkdirSync(CONFIG_DIST)
    }
    const baseConfig: RootSatelliteConfig = jsYaml.load(fs.readFileSync(BASE_CONFIG).toString())

    for (const schema of schemas) {
        const configDir = path.join(CONFIG_DIST, schema.version)
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir)
        }
        const configFile = path.join(configDir, 'config.json')
        const config = JSON.stringify(schema.transformer(baseConfig))
        fs.writeFileSync(configFile, config)
    }
    done()
})

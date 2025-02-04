import {dest, paths, src, mode} from "../config.js";

import pump from "pump";
import sassPlugin from 'gulp-sass'
import * as sassCompiler from 'sass'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import colorFunction from 'postcss-color-function'
import cssnano from 'cssnano'
import gulpRename from 'gulp-rename'
import plumber from 'gulp-plumber'

const sass = sassPlugin(sassCompiler)

const postcssPlugins = [
    autoprefixer(),
    postcssPresetEnv({
        stage: 3,
        browsers: 'last 4 versions'
    }),
    colorFunction(),
    ...((mode === 'production') ? [cssnano({
        discardComments: {removeAll: true}
    })] : [])
]

const styles = async () => {
    return pump([
        src(paths.styles.src),
        plumber(),
        ...((mode === 'development') ? [sourcemaps.init()] : []),
        sass().on('error', sass.logError),
        postcss(postcssPlugins),
        ...((mode === 'development') ? [sourcemaps.write()] : []),
        gulpRename({
            suffix: '.min'
        }),
        dest(paths.styles.output)
    ])
}

export default styles

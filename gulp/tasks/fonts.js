import {src, dest, paths} from "../config.js";
import pump from "pump";
import ttfToWoff2 from 'gulp-ttf2woff2'

const fonts = async () => {
    pump([
        src(paths.fonts.src),
        ttfToWoff2({
            clone: true
        }),
        dest(paths.fonts.output)
    ])
}

export default fonts

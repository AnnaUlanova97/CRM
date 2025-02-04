import pump from 'pump'
import plumber from "gulp-plumber";
import {src, dest, paths} from '../config.js'
import {stacksvg} from "gulp-stacksvg";

const icons = async () => {
    pump([
        src(paths.icons.src),
        plumber(),
        stacksvg({ output: `sprite` }),
        dest(paths.icons.output)
    ])
}

export default icons

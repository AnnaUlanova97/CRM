import {src, dest, paths, mode} from "../config.js";
import pump from "pump";
import pug from "gulp-pug";
import plumber from 'gulp-plumber'

const templates = async () => {
    pump([
        src(paths.templates.src),
        plumber(),
        pug({
            pretty: mode === 'production'
        }),
        dest(paths.templates.output),
    ]);
}

export default templates

import {src, dest, paths} from "../config.js";
import pump from "pump";
import imagemin from "gulp-imagemin";

const images = async () => {
    pump([
        src(paths.images.src),
        imagemin(),
        dest(paths.images.output)
    ])
}

export default images

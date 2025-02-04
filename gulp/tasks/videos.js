import {src, dest, paths} from "../config.js";
import pump from "pump";

const videos = async () => {
    pump([
        src(paths.videos.src),
        dest(paths.videos.output)
    ])
}

export default videos

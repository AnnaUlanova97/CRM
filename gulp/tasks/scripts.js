import pump from 'pump'
import webpackStream from "webpack-stream";
import webpack from "webpack";
import config from "../../webpack.config.js";
import {src, dest, paths} from "../config.js";

const configPathsArray = Object
    .entries(config.entry)
    .map(([key, value]) => value)

const scripts = async () => {
    pump([
        src(configPathsArray),
        webpackStream(config, webpack),
        dest(paths.scripts.output)
    ])
}

export default scripts

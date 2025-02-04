import bs from 'browser-sync'
import getProjectType from "./getProjectType.js";
import getOutputPath from "./getOutputPath.js";
import {domain} from "../config.js";

const server = bs.create()

const devServer = async () => {
    const config = getProjectType() === 'localhost' ? {
        server: {
            baseDir: getOutputPath()
        }
    } : {proxy: domain}

    server.init({
        ...config,
        port: 3030,
        notify: false,
        open: "local"
    });

    return server
}

export default devServer

import {__dirname} from "./gulp/functions/getEntries.js";
import {mode} from './gulp/config.js'
import path from "path";
import getEntries from "./gulp/functions/getEntries.js";
import getOutputPath from "./gulp/functions/getOutputPath.js";
import {CleanWebpackPlugin} from "clean-webpack-plugin";

const config = {
    mode: mode,
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, `${getOutputPath()}/js`),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};

export default config;

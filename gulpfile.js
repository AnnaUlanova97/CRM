import getTasks from "./gulp/functions/getTasks.js";
import watchFiles from "./gulp/functions/watchFiles.js";
import {mode, series} from "./gulp/config.js";

const defaultTask = async () => getTasks().then((modules) => {
    if (Object.keys(modules)) {
        modules.forEach((module) => setTimeout(series(module.function), 0))

        if (mode === 'development') {
            watchFiles(modules)
        }
    }
})

export default defaultTask

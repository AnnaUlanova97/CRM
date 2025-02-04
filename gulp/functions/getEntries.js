import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const getEntries = () => {
    /* Общие файлы */
    const entries = {
        common: './src/js/common.js',
    }

    /* Проверяем директорию /pages и создаем отдельный бандл для каждого файла */
    const pagesDir = path.resolve(__dirname, '..', '../src/js/pages/')

    if (pagesDir) {
        const pageFiles = fs.readdirSync(pagesDir)

        pageFiles.forEach(file => {
            const fileName = path.parse(file).name

            if (fileName !== 'Base') {
                entries[fileName.toLowerCase()] = path.join(pagesDir, file)
            }
        })
    }

    return entries
}

export default getEntries

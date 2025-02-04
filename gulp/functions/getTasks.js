import fs from 'fs'

/**
 * Получение массива задач Gulp для выполнения.
 * @param folderPath
 * @returns {Promise<Awaited<unknown>[]>}
 */
const getTasks = async (folderPath = './gulp/tasks') => {
    const files = await fs.promises.readdir(folderPath)

    const importedModules = await Promise.all(
        files.map(async (file) => {
            if (file.endsWith('.js')) {
                const module = await import(`../tasks/${file}`)
                return {
                    function: module.default,
                    name: file.replace('.js', '')
                };
            }
        })
    )

    return importedModules.filter((module) => module !== undefined)
}

export default getTasks

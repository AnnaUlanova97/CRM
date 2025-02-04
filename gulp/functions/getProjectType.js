import fs from "fs";

const detectProjectType = () => {
    // Проверка на Laravel-проект
    if (fs.existsSync('artisan') && fs.existsSync('composer.json')) {
        return 'laravel'
    }

    // Проверка на Bitrix-проект
    if (fs.existsSync('bitrix') && fs.existsSync('local')) {
        return 'bitrix'
    }

    // Проверка на Yii2-проект
    if (fs.existsSync('yii') && fs.existsSync('composer.json')) {
        const composerContent = fs.readFileSync('composer.json', 'utf-8')
        const composerJson = JSON.parse(composerContent)
        if (
            composerJson.require !== undefined &&
            composerJson.require['yiisoft/yii2'] !== undefined
        ) {
            return 'yii2'
        }
    }

    // Проверка на WordPress-проект
    if (
        fs.existsSync('wp-config.php') &&
        fs.existsSync('wp-content') &&
        fs.existsSync('wp-includes') &&
        fs.existsSync('wp-admin')
    ) {
        return 'wordpress'
    }

    // Если не обнаружено совпадений, вернуть 'localhost'
    return 'localhost'
}

export default detectProjectType
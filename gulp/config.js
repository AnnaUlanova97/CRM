import gulp from 'gulp'
import getSrcPath from "./functions/getSrcPath.js";
import getOutputPath from "./functions/getOutputPath.js";

export const {src, dest, series, watch} = gulp

export const mode = process.env.NODE_ENV

export const domain = "dev.example.loc";

export const srcPath = getSrcPath()

export const outputPath = getOutputPath()

export const paths = {
    scripts: {
        src: `${srcPath}/js/pages`,
        output: `${outputPath}/js`,
        watch: `${srcPath}/js/**/*.{js,ts,vue}`
    },
    styles: {
        src: `${srcPath}/scss/app.scss`,
        output: `${outputPath}/css/`,
        watch: `${srcPath}/scss/**/*.{scss,sass,css}`
    },
    templates: {
        src: `${srcPath}/pug/pages/*.pug`,
        output: `${outputPath}/`,
        watch: `${srcPath}/pug/**/*.{pug,html}`
    },
    icons: {
        src: `${srcPath}/media/icons/**/*.svg`,
        output: `${outputPath}/media/icons/`,
        watch: `${srcPath}/media/icons/**/*.svg`
    },
    images: {
        src: `${srcPath}/media/images/**/*.{jpg,jpeg,png,webp,svg}`,
        output: `${outputPath}/media/images/`,
        watch: `${srcPath}/media/images/**/*.{jpg,jpeg,png,webp,svg}`
    },
    videos: {
        src: `${srcPath}/media/videos/**/*.{mov,mp4}`,
        output: `${outputPath}/media/videos/`,
        watch: `${srcPath}/media/videos/**/*.{mov,mp4}`
    },
    fonts: {
        src: `${srcPath}/fonts/**/*.{woff,woff2,ttf}`,
        output: `${outputPath}/fonts/`,
        watch: `${srcPath}/fonts/**/*.{woff,woff2,ttf}`
    }
}

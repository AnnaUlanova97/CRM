![.png](assets/webest-logo.png)

# Сведения перед началом работы

Для начала рыботы у вас на компьютере должна быть установлена NodeJS версии не ниже 18.

Сводная документация для разработчиков по верстке сайта: [Посмотреть](https://docs.google.com/document/d/1wFs3MmsCYS3MGbv41k4qYAOPdMY8FVCynOoENx82xI4/edit?usp=sharing)

# Команды для работы

`nvm use 18.16.0` - установка необходмиой версии NodeJS.

`npm install` - установка зависимостей проекта.

`npm run dev` - запуск проекта в режиме [разработки](#режим-разработки) (development) и запуск сервера.

`npm run build` - сборка проекта для [производства](#режим-производства) (production) с сжатием файлов.

# Режим разработки

# Режим производства

# Структура проекта.

```
├── build/
│   ├── css/
│   │   └── app.min.css
│   ├── fonts/
│   │   ├── Roboto-Regular/
│   │   │   ├── Roboto-Regular.woff
│   │   │   ├── Roboto-Regular.woff2
│   │   │   └── Roboto-Regular.ttf
│   │   ├── Roboto-Bold/
│   │   │   ├── Roboto-Bold.woff
│   │   │   ├── Roboto-Bold.woff2
│   │   │   └── Roboto-Bold.ttf
│   ├── media/
│   │   ├── images/
│   │   ├── icons/
│   │   │   └── sprite.svg
│   │   ├── videos/
│   ├── js/
│   │   ├── vendor.bundle.js
│   │   └── common.bundle.js
│   └── index.html
├── src/
│   ├── fonts/
│   │   ├── Roboto-Regular/
│   │   │   ├── Roboto-Regular.woff
│   │   │   ├── Roboto-Regular.woff2
│   │   │   └── Roboto-Regular.ttf
│   │   ├── Roboto-Bold/
│   │   │   ├── Roboto-Bold.woff
│   │   │   ├── Roboto-Bold.woff2
│   │   │   └── Roboto-Bold.ttf
│   ├── media/
│   │   ├── images/
│   │   │   └── logo.png
│   │   ├── icons/
│   │   │   ├── cross.svg
│   │   │   └── check.svg
│   │   ├── videos/
│   ├── js/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Base.js
│   │   │   └── Home.js
│   │   └── vendor
│   │   │   └── vendor.js
│   │   └── common.js
│   ├── scss/
│   │   ├── global/
│   │   │   ├── __include.scss
│   │   │   ├── _fonts.scss
│   │   │   └── _global.scss
│   │   ├── helpers/
│   │   │   ├── __include.scss
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _fixes.scss
│   │   │   ├── _sprite-template.scss
│   │   │   └── _normalize.scss
│   │   ├── components/
│   │   │   ├── __include.scss
│   │   │   ├── _footer.scss
│   │   │   └── _header.scss
│   │   ├── pages/
│   │   │   ├── __include.scss
│   │   │   └── _home.scss
│   │   ├── vendor/
│   │   │   ├── __include.scss
│   │   │   └── _media-queries.scss
│   │   └── app.scss
│   ├── pug/
│   │   ├── layouts/
│   │   │   └── _base.pug
│   │   ├── helpers/
│   │   │   ├── __include.pug
│   │   │   ├── _variables.pug
│   │   │   └── _mixins.pug
│   │   ├── components/
│   │   │   ├── __include.pug
│   │   │   ├── _header.pug
│   │   │   ├── _footer.pug
│   │   │   └── _head.pug
├── └── └── pages/
│           └── index.pug
│
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── gulpfile.js
├── package.json
└── readme.md
```

# myapp2

> A Vue.js project

## Build Setup

``` bash
# Установить проект
npm install

# Запустить на localhost:8080
npm run dev

# Чтобы получить данные  из файла db.json нужно иметь json-server на localhost:3000
и в папке проекта запустить 
json-server db.json -w

# baseUrl localhost:3000 можно изменить на другой в файле src/store.js

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

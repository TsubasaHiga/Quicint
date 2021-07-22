[img-github-release]: https://img.shields.io/github/v/release/TsubasaHiga/Quicint.svg?style=flat-square
[img-npm]: https://img.shields.io/npm/v/quicint.svg?style=flat-square
[img-npm-downloads]: https://img.shields.io/npm/dt/quicint.svg?style=flat-square
[url-github]: https://github.com/TsubasaHiga/Quicint
[url-github-releases]: https://github.com/TsubasaHiga/Quicint/releases
[url-npm]: https://www.npmjs.com/package/quicint
[img-js]: https://img.shields.io/badge/Javascript-000.svg?logo=javascript&style=flat-square
[img-css3]: https://img.shields.io/badge/-CSS3-000.svg?logo=css3&style=flat-square
[img-html5]: https://img.shields.io/badge/-HTML5-000.svg?logo=html5&style=flat-square
[img-gulp]: https://img.shields.io/badge/Gulp-000.svg?logo=gulp&style=flat-square
[img-webpack]: https://img.shields.io/badge/-Webpack-000.svg?logo=webpack&style=flat-square
[img-eslint]: https://img.shields.io/badge/-ESLint-000.svg?logo=eslint&style=flat-square
[img-yarn]: https://img.shields.io/badge/-Yarn-000.svg?logo=yarn&style=flat-square
[img-babel]: https://img.shields.io/badge/-babel-000.svg?logo=babel&style=flat-square

<a target="_blank" rel="noopener noreferrer" href="docs/assets/images/logo.png" style="display: block; text-align: center;">
    <img src="docs/assets/images/logo.png" alt="logo" style="width: 100%; max-width: 600px;">
</a>

<br>

[![NPM version][img-npm]][url-npm]
[![NPM downloads][img-npm-downloads]][url-npm]

_Quick initialize HTML5 EJS Boilerplate（すぐ出来る HTML5 EJS ボイラープレート）_

Quicint（クイント）は、テンプレートエンジンに EJS を用いた HTML5 サイト構築用のボイラープレートです。
ページの量産が比較的簡単にできるため静的構築プロジェクトでの使用に適しています。

<p style="font-size:13px">Quicint is a boiler for building HTML5 sites using EJS as the template engine. Plate.
It is relatively easy to mass produce static pages.</p>

![js][img-js]
![css3][img-css3]
![html5][img-html5]
![gulp][img-gulp]
![webpack][img-webpack]
![eslint][img-eslint]
![yarn][img-yarn]
![babel][img-babel]

## Install

```bash
# clone
git clone git@github.com/TsubasaHiga/Quicint.git name-of-your-project

# Quicint install
yarn install
```

※ `yarn add`でインストールする場合

<p style="font-size:13px">In the case of `yarn add` installation</p>

```bash
# add
yarn add quicint

# cd & find
cd node_module/quicint
```

## Development

初期ファイル生成の生成とローカルサーバーを起動します。この時点で開発可能になり、各種ファイルの Watch タスクが始まります。

<p style="font-size:13px">Generate the initial file generation and start the local server. At this point, it is ready for development and begins the Watch task for the various files.</p>

```bash
# init
yarn run development

# serve
yarn run serve
```

## Option

### 環境設定（setting.json）

環境に依存する設定は`setting.json`としてルートディレクトリに設置されています。複数名で開発を行う場合など、開発環境に左右される設定を記述します。設定は主に Gulp 上の各タスク上で利用されます。

<p style="font-size:13px">The `setting.json` is a configuration file, located in the root directory as You should write settings which are influenced by the development environment. The settings are mainly used on each task in Gulp.</p>

```json
{
  "browsersync": {
    "browser": "google chrome",
    "server": {
      "baseDir": "./dist"
    },
    "notify": false,
    "open": false,
    "ghostMode": {
      "clicks": false,
      "forms": false,
      "scroll": false
    },
    "port": 3000,
    "https": false,
    "reloadOnRestart": true
  },
  "htmlmin": {
    "collapseWhitespace": false,
    "removeComments": false
  },
  "htmlminProduction": {
    "collapseWhitespace": true,
    "removeComments": true
  },
  "htmlbeautify": {
    "indent_size": 2,
    "preserve_newlines": false
  },
  "pngquant": {
    "quality": [0.7, 0.9],
    "speed": 1,
    "floyd": 0
  },
  "mozjpeg": {
    "quality": 85,
    "progressive": true
  },
  "publishDir": "Desktop",
  "io": {
    "input": {
      "css": "src/assets/styles/",
      "img": "src/assets/images/",
      "js": "src/assets/scripts/",
      "ejs": "src/"
    },
    "output": {
      "css": "dist/assets/styles/",
      "img": "dist/assets/images/",
      "js": "dist/assets/scripts/",
      "html": "dist/"
    },
    "setting": "./setting.json",
    "siteSetting": "./setting-site.json",
    "define": "./define.json"
  }
}
```

### サイト設定（setting-site.json）

サイト固有の値を記述するファイルは`setting-site.json`としてルートディレクトリに設置されています。サイト名、meta などサイト全体で利用する定数などの設置場所として利用可能です。主に EJS で用いられます。

<p style="font-size:13px">`setting-site.json` describes site-specific values. It can be used as a location for site name, meta and other constants that are used throughout the site. It is mainly used in EJS.</p>

```json
{
  "siteName": "HTML5案件用のボイラープレートQuicit",
  "siteDomain": "https://example.com",
  "metaAuthor": "サンプルテキスト",
  "metaAppid": "0123456789",
  "metaTwitterSite": "サンプルテキスト",
  "metaTwitterCreator": "サンプルテキスト",
  "publishFileName": "Quicint",
  "themeColor": "#000"
}
```

## Spec

Quicint の仕様、および対応環境は以下の通りです。

| 項目            | 詳細                                                            |
| --------------- | --------------------------------------------------------------- |
| node.js         | 12.x required                                                   |
| Package manager | yarn                                                            |
| Build system    | Gulp v4                                                         |
| Module bundler  | webpack                                                         |
| ECMAScript      | ES6                                                             |
| CSS design      | FLOCSS                                                          |
| Template engine | EJS                                                             |
| Lint            | ESlint & Stylelint                                              |
| gitignore       | [gitignore.io](https://www.gitignore.io/api/node,macos,windows) |

## Command

### Default task

```bash
#
# serve
#
# ローカルサーバーの起動と各種ファイルのWatchが可能です。通常はこちらで制作を行います。
yarn run serve

#
# development
#
# developmentビルドを行います。`dist/`配下に書き出されます。
yarn run development

#
# production
#
# productionビルドを行います。`publish/`配下に書き出されます。
yarn run production

#
# production fullpath
#
# productionビルドを行います。PATH名は`setting-site.json`ファイルの`siteDomain`を用います。
# `publish-fullpath/`配下に書き出されます。
yarn run production:fullpath

#
# zip
#
# 納品時のタスクです。各種ファイルをMinifyし.Zipファイルとして指定ディレクトリへ書き出します。
# 書き出しディレクトリはsetting.jsonのpublishDirで指定可能です。
yarn run zip

#
# resetImg
#
# 画像再圧縮（同期）タスクです。
# `dist`配下の画像を一度削除し、`src`を正として再度書き出しを行います。
yarn run resetImg

#
# resetEjs
#
# `dist`配下のHTMLを一度削除し、`src`を正として再度書き出しを行います。
yarn run resetEjs

#
# checkJson
#
# 各種jsonファイルのチェックタスクです。
yarn run checkJson

```

### Lint task

```bash
# stylelint
yarn run lint:css

# stylelint fix
yarn run fix:css

# ESLint
yarn run lint:js

# ESLint fix
yarn run fix:js
```

## Directory

第 2 階層までのディレクトリ構造です。`src`ディレクトリが作業ディレクトリになり、`dist`ディレクトリを出力先として利用します。納品タスクでコピーされるディレクトリも`dist`になります。

<p style="font-size:13px">The directory structure up to the 2 level. The `src` directory becomes the working directory and the `dist` directory becomes the output destination. Use. The directory copied by the delivery task is also `dist`.</p>

```
.
|-- dist #納品ディレクトリ
|   |-- assets
|   |   |-- css/
|   |   |-- fonts/
|   |   |-- images/
|   |   `-- js/
|   |-- page2
|   |-- page3
|   |-- sitemap
|   `-- index.html
|-- src
|   |-- assets
|   |   |-- css/
|   |   |-- images/
|   |   `-- js/
|   |-- inc
|   |-- page2
|   |-- page3
|   |-- sitemap
|   `-- index.ejs
|-- .babelrc
|-- .editorconfig
|-- .eslintrc.json
|-- .gitignore
|-- .stylelintrc.json
|-- define.json
|-- setting.json
|-- setting.json.sample
|-- gulpfile.js
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- README.md
|-- setting-site.json
|-- webpack.config.js
|-- webpack.production.config.js
`-- yarn.lock
```

## Pre-installation Plugin

| プラグイン名      | 用途                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------- |
| ress              | [ress.css](https://github.com/filipelinhares/ress)                                           |
| object-fit-images | `object-fit`Polyfill                                                                         |
| picturefill       | `<picture>`Polyfill                                                                          |
| sweet-scroll      | [https://github.com/tsuyoshiwada/sweet-scroll](https://github.com/tsuyoshiwada/sweet-scroll) |
| swiper            | [https://github.com/nolimits4web/swiper](https://github.com/nolimits4web/swiper)             |

## Supported browser

| ブラウザ名             | 対応バージョン     |
| ---------------------- | ------------------ |
| Google Chrome          | latest             |
| Firefox                | latest             |
| Safari(macOS)          | latest             |
| IE11                   | Windows 10 later   |
| Edge(EdgeHTML)         | latest             |
| Edge(Chromium)         | latest             |
| Safari(iOS)            | latest iOS version |
| Google Chrome(Android) | latest             |

## Licence

MIT

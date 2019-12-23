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


![logo](docs/assets/images/logo.png)

[![NPM version][img-npm]][url-npm]
[![NPM downloads][img-npm-downloads]][url-npm]

*Quick initialize HTML5 EJS Boilerplate（すぐ出来るHTML5 EJSボイラープレート）*

Quicint（クイント）はHTML5案件用のボイラープレートです。[Percolator](https://github.com/TsubasaHiga/Percolator)（PHP案件用ボイラープレート）をForkし、静的サイト構築用として個人開発を行っています。

テンプレートエンジンにはEJSを使用している為、ページの量産が比較的簡単に出来る特徴を持っています。約50ページ未満の静的ページ制作には最適でしょう。

同梱している`env.json`と`setting.json`を有効化することで直ぐに制作を始められます。

![js][img-js]
![js][img-css3]
![js][img-html5]
![js][img-gulp]
![js][img-webpack]
![js][img-eslint]

## Quick Start

### npm

``` bash
npm i quicint
```

### git clone

``` bash
git clone git@github.com/TsubasaHiga/Quicint.git name-of-your-project
npm install # or yarn install
```

## Command

### 一般系

``` bash
# serve mode：各種コンパイルタスクを利用出来ます。通常はこちらで制作を行います
npm run serve

# production mode：productionビルドを行います。`publish/`配下に書き出されます
npm run production

# production fullpath mode：productionビルドを行います。
# PATH名が`setting.json`ファイルの`siteDomain`を用いるのが特徴です。`publish-fullpath/`配下に書き出されます
npm run production:fullpath

# zip mode：納品時のタスクです。各種ファイルをMinifyし.Zipファイルとして指定ディレクトリへ書き出します
npm run zip

# img recompile task：画像再圧縮タスクです。`src`と`dist`で画像数が合わなくなった場合にリセット目的で使用します
npm run img

# ejs recompile task：ejsファイルの再コンパイルタスクです。`dist`に書き出されたHTMLファイルを全削除し、再度出力します
npm run ejs

# json file check task：各種jsonファイルのチェックタスクです
npm run json-check

```

### Lint系

``` bash

# lint css：CSS / SCSSファイルのlintタスクです
npm run lint:css

# lint fix css：CSS / SCSSファイルの自動修正タスクです
npm run fix:css

# lint js：JSファイルのlintタスクです
npm run lint:js

# lint fix js：JSファイルの自動修正タスクです
npm run fix:js
```

### ディレクトリ構造

第2階層までのディレクトリ構造です。`src`ディレクトリが作業ディレクトリになり、`dist`ディレクトリを出力先として利用します。納品タスクでコピーされるディレクトリも`dist`になります。

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
|-- ejs-define.json
|-- env.json
|-- env.json.sample
|-- gulpfile.js
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- README.md
|-- setting.json
|-- webpack.config.js
|-- webpack.production.config.js
`-- yarn.lock
```

## 環境依存設定

環境に依存する設定は以下を`env.json`としてルートディレクトリに設置することで有効になります。

``` json
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
    "publishDir": "/Users/higa/Desktop",
    "io": {
        "input": {
            "css": "src/assets/css/",
            "img": "src/assets/images/",
            "js": "src/assets/js/",
            "ejs": "src/"
        },
        "output": {
            "css": "dist/assets/css/",
            "img": "dist/assets/images/",
            "js": "dist/assets/js/",
            "html": "dist/"
        },
        "env": "./env.json",
        "siteSetting": "./setting.json",
        "ejsDefine": "./ejs-define.json"
    }
}
```

## サイト設定

サイト固有の値を記述するファイルを`setting.json`として用意しております。主に`<head>`内で用いる内容が記載されており、各案件に合わせて変更してお使いいただければと思います。

``` json
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

## 仕様

Quicintの仕様、及び対応環境は以下の通りです。

| 項目 | 詳細 |
| --- | --- |
| パッケージマネージャー | npm |
| コンパイル環境、タスクランナー | Gulp v4 |
| テンプレートエンジン | EJS |
| CSS トランスパイラ | SCSS + Gulp |
| CSS設計 | FLOCSS |
| JavaScript モジュールバンドラ | Webpack |
| JavaScript ライブラリ | Vanilla JS（Pure JS） |
| JavaScript モジュールバンドラ | Webpack |
| インストールパッケージリスト | 参照：`package.json` |
| Lint環境 | ESlint / Stylelint |
| .gitignore | [gitignore.io](https://www.gitignore.io/api/node,macos,windows) |

### フロント側で使用プラグイン

以下プラグインはデフォルトでインストールされています。

| プラグイン名 | 用途 |
| --- | --- |
| ress | reset.css |
| lazysizes | 遅延読み込みプラグイン |
| object-fit-images | `object-fit`のPolyfill |
| picturefill | `<picture>`タグのPolyfill |
| sweet-scroll | ページスクロール用プラグイン |
| swiper | スライダー用プラグイン |
| yakuhanjp | 約物半角化用日本語フォント |

## 対応ブラウザ

全て最新バージョンに対応。

| ブラウザ名 | 対応バージョン |
| --- | --- |
| Google Chrome | 最新 |
| Firefox | 最新 |
| Safari(macOS) | 最新 |
| IE11 | Windows10 |
| Edge | 最新 |
| Safari(iOS) | 最新iOS |
| Google Chrome(Android) | 最新 |

## Licence

MIT

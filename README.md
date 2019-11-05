<div align="center">
  <img src="https://user-images.githubusercontent.com/33184716/67154026-5feeaa80-f32f-11e9-811b-f3ac13c972ed.png" width="600" height="180" alt="Quicint">
</div>

# Quicint
*Quick initialize HTML5 EJS Boilerplate（すぐ出来るHTML5 EJSボイラープレート）*

Quicint（クイント）はHTML5案件用のボイラープレートです。[Percolator（PHP案件用ボイラープレート）](https://github.com/TsubasaHiga/Percolator)をForkし、HTML5版用として個人開発を行っております。テンプレートエンジンはEJSを使用しております。

## Install

環境の用意は以下より可能です。

### npm package

``` bash
npm i quicint
```

### git clone

``` bash
# Clone
git clone git@github.com/TsubasaHiga/Quicint.git name-of-your-project

# Init
npm install # or yarn install
```

## Command

コマンドは以下よりご確認下さい。

``` bash
# dev mode
npm run dev

# publish mode
npm run production

# img reset task
npm run img

# json file check task
npm run json-check

# lint stylesheet
npm run lint:stylesheet

# lint fix stylesheet
npm run format:stylesheet

# lint js
npm run lint:js

# lint fix js
npm run format:js
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

### ディレクトリ構造

第2階層までのディレクトリ構造です。`src`ディレクトリが作業ディレクトリになり、`dist`ディレクトリを出力先として利用します。
納品タスクでコピーされるディレクトリも`dist`になります。

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
|-- .eslintrc
|-- .gitignore
|-- .stylelintrc
|-- env.json
|-- gulpfile.js
|-- LICENSE
|-- package.json
|-- README.md
|-- setting.json
|-- webpack.dev.config.js
`-- webpack.prod.config.js
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
  "publishDir" : "/Users/higa/Desktop",
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
    "siteSetting": "./setting.json"
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
  "publishFileName" : "Quicint",
  "themeColor": "#000"
}
```

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

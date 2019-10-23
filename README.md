<div align="center">
  <img src="https://user-images.githubusercontent.com/33184716/67154026-5feeaa80-f32f-11e9-811b-f3ac13c972ed.png" width="600" height="180" alt="Quicint">
</div>

# Quicint
*Quick initialize HTML5 Boilerplate（すぐ出来るHTML5ボイラープレート）*

Quicint（クイント）はHTML5案件用のボイラープレートです。[Percolator（PHP案件用ボイラープレート）](https://github.com/TsubasaHiga/Percolator)をForkし、HTML5版用として個人開発を行っております。

## Install

環境の用意は以下より可能です。

``` bash
# Clone
$ git clone git@github.com/TsubasaHiga/Quicint.git name-of-your-project

# Init
$ npm install # or yarn install
```

## Command

開発に関するコマンドは以下より確認下さい。

``` bash
# Start Server
$ npm run dev

# img reset
$ npm run img

# Publish
$ npm run production

# delete cache hard-source-webpack-plugin
$ rm -rf node_modules/.cache/hard-source/
```

## 仕様

Quicintの仕様、及び対応環境は以下の通りです。

| 項目 | 詳細 |
| --- | --- |
| パッケージマネージャー | npm |
| コンパイル環境、タスクランナー | Gulp v4 |
| CSS トランスパイラ | SCSS + Gulp |
| CSS設計 | FLOCSS |
| JavaScript モジュールバンドラ | Webpack |
| JavaScript ライブラリ | Vanilla JS（Pure JS） |
| JavaScript モジュールバンドラ | Webpack |
| インストールパッケージリスト | 参照：`package.json` |
| Lint環境 | ESlint / Stylelint |
| .gitignore | [gitignore.io](https://www.gitignore.io/api/node,macos,windows) |

### 使用プラグイン（フロント）

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

`tree -a -I "node_modules|.git" -N -L 2 --dirsfirst`で表示したディレクトリ構造

```
.
|-- dist #納品ディレクトリ
|   |-- assets
|   |   |-- css/
|   |   |-- fonts/
|   |   |-- images/
|   |   `-- js/
|   |-- hoge1
|   |-- hoge2
|   |-- hoge3
|   |-- hoge4
|   |-- inc
|   `-- index.html
|-- src
|   |-- css
|   |-- images
|   `-- js
|-- .babelrc
|-- .eslintrc
|-- .gitignore
|-- .htaccess
|-- .stylelintrc
|-- LICENSE
|-- README.md
|-- gulpfile.js
|-- package.json
|-- webpack.dev.config.js
`-- webpack.prod.config.js
```

## 環境依存設定ファイル

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
    "collapseWhitespace": true,
    "removeComments": true
  },
  "io": {
    "input": {
      "css": "src/assets/css/",
      "img": "src/assets/images/",
      "js": "src/assets/js/",
      "html": "src/"
    },
    "output": {
      "css": "dist/assets/css/",
      "img": "dist/assets/images/",
      "js": "dist/assets/js/",
      "html": "dist/"
    }
  }
}
```

## 対応ブラウザ

全て最新バージョンに対応。

- Google Chrome
- Firefox
- Safari（macOS）
- IE11
- Edge
- Android Chrome
- iOS Safari

※ Firefox ESR対応などのイレギュラー時は`package.json`の**browserslist**項目を適切な値に変更することでSCSS対応が可能です。

## Licence

MIT

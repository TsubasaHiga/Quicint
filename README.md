<div align="center">
  <img src="https://user-images.githubusercontent.com/33184716/67105122-23be2b80-f203-11e9-9f3d-6a5af570fba5.png" width="600" height="180" alt="Quicint">
</div>

# Quicint
*Quick initialize HTML5 Boilerplate（すぐ出来るHTML5ボイラープレート）*

Quicint（クイント）はHTML5案件用のボイラープレートです。[Percolator（PHP案件用ボイラープレート）](https://github.com/TsubasaHiga/Percolator)をForkし、HTML5版用として個人開発を行っております。

## Install

環境の用意は以下より可能です。

``` bash
# Clone.
$ git clone git@github.com/TsubasaHiga/Quicint.git name-of-your-project

# Firts init.
$ npm install # or yarn install
```

## Dev Start

開発に関するコマンドは以下より確認下さい。

``` bash
# Compile
$ npx webpack

# Start Server
$ npx start or npx webpack-dev-server --hot
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

### 環境依存設定ファイル

環境に依存する設定（OS/ブラウザ）は`env.json`に記載されています。

### 対応ブラウザ

全て最新バージョンに対応。

- Google Chrome
- Firefox
- Safari（macOS）
- IE11
- Edge
- Android Chrome
- iOS Safari

※ Firefox ESR対応などのイレギュラー時は`package.json`の**browserslist**項目を適切な値に変更することでSCSS対応が可能です。

## チェック

- W3C：No errors
- Lighthouse（PC / SP）
  - Performance：100
  - Accessibility：100
  - Best Practices：100
  - SEO：100

## .gitignore
https://www.gitignore.io/api/node,macos,windows

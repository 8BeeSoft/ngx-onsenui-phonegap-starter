[![Build Status][travis-ci-image]][travis-ci-url]
[![Dependency status][david-dm-image]][david-dm-url]
[![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]
# Angular + Onsen UI 2 + PhoneGap Starter

[Angular CLI](https://cli.angular.io/) と [PhoneGap](http://phonegap.com/) を使ったハイブリッドアプリのサンプルです。

フロントエンドのフレームワークは [Angular](https://angular.io/) と [Onsen UI 2](https://onsen.io/) を採用しています。

また、Angular CLI の `ng serve` コマンドを使った場合に [「Phonegap Developer」アプリ](http://docs.phonegap.com/getting-started/2-install-mobile-app/) が利用できなくなる問題を解決するため、別途 [Webpack](https://webpack.github.io/) による SCSS と TypeScript のトランスパイルを組み込んでいます。

## 必要なもの
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://cli.angular.io/)

## 使い方

リポジトリをクローン
```
$ git clone https://github.com/puku0x/ngx-onsenui-phonegap-starter.git
```

Angular CLI をインストール
```
$ npm install -g @angular/cli
```

依存パッケージをインストール
```
$ cd ngx-onsenui-phonegap-starter
$ npm install
```

## ビルド & プレビュー

### PhoneGap CLI を使う場合
```
$ npm start
```

ビルド後、ブラウザで `http://localhost:3000` を開くとプレビューされます。

`/src` 内のファイルに変更を加えると自動的にリロードされます。

### Angular CLI を使う場合
```
$ ng serve
```

ビルド後、ブラウザで `http://localhost:4200` を開くとプレビューされます。

`/src` 内のファイルに変更を加えると自動的にリロード（HMR）されます。


## プロダクションビルド

Angular CLI のコマンドを用いてビルドしてください。
```
$ ng build --prod
```

ビルド結果は `/www` 内に出力されます。

[travis-ci-url]: http://travis-ci.org/puku0x/ngx-onsenui-phonegap-starter
[travis-ci-image]: https://travis-ci.org/puku0x/ngx-onsenui-phonegap-starter.svg?branch=master
[david-dm-url]:https://david-dm.org/puku0x/ngx-onsenui-phonegap-starter
[david-dm-image]:https://david-dm.org/puku0x/ngx-onsenui-phonegap-starter.svg
[david-dm-dev-url]:https://david-dm.org/puku0x/ngx-onsenui-phonegap-starter?type=dev
[david-dm-dev-image]:https://david-dm.org/puku0x/ngx-onsenui-phonegap-starter/dev-status.svg

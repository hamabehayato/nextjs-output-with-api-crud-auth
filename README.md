# nextjs-output-with-api-crud-auth

## 技術構成

### バックエンド

- node: 20.9.0
- express: 4.18.2
- typeorm: 0.3.17
- typescript: 5.2.2

### その他

docker
MySQL: 8.0

## 仕様

- Todo リスト
  - 一覧表示
  - 新規登録処理
  - 詳細表示
  - 編集処理
  - 削除処理

## 環境構築

※docker を使用しているので PC に入っていない場合はインストールをお願いします。

https://matsuand.github.io/docs.docker.jp.onthefly/desktop/mac/install/

#### 1. docker image を作成

docker-compose build

#### 2. コンテナを起動

// コンテナを起動する
docker-compose up -d
注: 初回起動時は node_modules を install しているので時間がかかる バックエンド、フロントエンドが起動できたかどうかは、以下のコマンドでログを確認

#### 3. マイグレーション

make db-migrate

#### 4. ブラウザに表示

url: http://localhost
注: Todo のデータが表示されない場合は、少し待ってからリロードすること バックエンドのアプリケーションの立ち上げに少し時間がかかるため

## 補足

DB 関連の情報
以下の情報を元に「sequel ace」などを用いて DB コンテナにアクセスすれば、DB のデータの状態を確認できる
DBMS: mysql: 8.0
host: 127.0.0.1
database: nextjs_output_with_crud_auth_DB
user: user
password: pass
port: 3306

- sequel ace について
- https://qiita.com/ucan-lab/items/b1304eee2157dbef7774

#### コンテナのログを確認したい場合

コンテナのログを確認する方法

1. コンテナ ID を確認
   コンテナを起動している状態で、以下のコマンドでコンテナ ID(CONTAINER ID)を確認する。

docker ps
各イメージに対応する コンテナ ID を確認

以下のコマンドで各コンテナのログを確認

docker logs -f [コンテナ ID]

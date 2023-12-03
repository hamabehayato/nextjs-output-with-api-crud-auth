FROM node:20

# 作業ディレクトリを backendディレクトリ に設定
WORKDIR /backend

# 現在のディレクトリをコンテナ内の /backend ディレクトリにコピー
COPY . .

# アプリの依存関係をインストール
RUN npm install

# express 起動コマンド
CMD ["npm", "start"]

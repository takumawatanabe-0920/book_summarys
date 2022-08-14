# sharesummary

#### 【サービス名】 sharesummary

https://sharesummary.com/

#### 【用途】 本の要約をユーザー同士で共有するアプリ

#### 【機能】

##### 未ログイン時

- 記事閲覧

##### ログイン時

- 記事一覧（新着記事、おすすめ記事、関連記事、カテゴリー記事）
- 週刊ランキング、月間ランキング、総合ランキング
- 記事閲覧
- 記事作成・プレビュー・編集
- いいね機能
- マイページ
  - ユーザー編集
  - 記事一覧・記事編集
  - いいね一覧
  - ログアウト

##### 記事ステータスについて

公開と非公開設定が可能で、非公開の場合ユーザーは見れない。(アクセスできてもモザイク処理済み)

##### お問い合わせについて

[https://twitter.com/ku____maaa] の DM までお申し付けください。

##### 記事編集エディタについて

現在画像を文章中に挿入することができません。

#### 【実装予定機能】

- ダークモード(目の保護のため)
- ユーザーの記事の閲覧傾向といいね傾向から、各ユーザーへのおすすめ記事を表示
- 下書き機能(現在、全フォーム必須でバリデーションをしているため、手軽に保存できるようにする。)
- 管理画面（カテゴリー、サブカテゴリー追加、データ検索をしやすくするため。）

#### 開発言語

##### javascript(React TypeScript Nestjs)

#### 主要ライブラリ

- フロントエンド
  - React
  - TypeScript
  - draft-js 記事編集（リッチテキストエディター）
  - react-slick（カルーセル)
  - material ui
- バックエンド
  - nestjs
  - mongoose
- インフラ
  - EC2
  - Route53
  - S3

#### ビルド

```bash
# install dependencies
% yarn

# serve with hot reload at http://localhost:3015
% yarn dev

```

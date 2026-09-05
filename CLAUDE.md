## 実装方針の正本

このリポジトリの設計判断は、スキル **`ai-product-playbook`** に集約してある。
複製せず参照する（複製すると更新時に内容がずれるため）。

- 正本: [keyakizakap-alt/dxworkrepository](https://github.com/keyakizakap-alt/dxworkrepository) の `.claude/skills/ai-product-playbook/`
- 全プロジェクトで自動ロードさせる手順: 同リポジトリの `README.md`

設計を変える前に必ず読むこと。

## このリポジトリで壊してはいけないもの

- **入力したデータは端末内に留める。** チェック状況・費用の記録をサーバーへ送らない。
- **iPhone の PWA として成立する状態を保つ**（ホーム画面追加・オフライン起動・
  ボトムナビでの片手操作）。`vite-plugin-pwa` の設定とアイコンを壊さない。
- 4 タブ（チェックリスト / 費用管理 / 物件検索 / 配送費用）の構成は `src/App.jsx` に集約。
  タブを増やすときはナビの可読性（片手で押せる幅）を先に確認する。

アプリ本体は `hikkoshi-app/`。`npm run dev` / `npm run build` / `npm run lint`。

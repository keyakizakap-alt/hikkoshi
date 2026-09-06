## 方針の正本

このリポジトリの進め方と設計判断は、2 つのスキルに集約してある。
複製せず参照する（複製すると更新時に内容がずれるため）。

- **`work-directives`** — 作業の進め方、確認を取る操作、成果物の禁則、リサーチの裏取り
- **`ai-product-playbook`** — LLM の境界、API の防御、出荷と品質ゲート

正本: [keyakizakap-alt/dxworkrepository](https://github.com/keyakizakap-alt/dxworkrepository) の
`.claude/skills/`。

**作業を始める前に `work-directives`、設計を変える前に `ai-product-playbook` を読むこと。**
スキル一覧に出てこない場合は、正本がこのセッションに無い。先に取得する。

- Claude Code on the web: `add_repo` で `keyakizakap-alt/dxworkrepository` を追加する
- ローカル: `~/.claude/skills/` へ入れておけば常時読み込まれる（手順は正本の `README.md`）

## このリポジトリで壊してはいけないもの

- **入力したデータは端末内に留める。** チェック状況・費用の記録をサーバーへ送らない。
- **iPhone の PWA として成立する状態を保つ**（ホーム画面追加・オフライン起動・
  ボトムナビでの片手操作）。`vite-plugin-pwa` の設定とアイコンを壊さない。
- 4 タブ（チェックリスト / 費用管理 / 物件検索 / 配送費用）の構成は `src/App.jsx` に集約。
  タブを増やすときはナビの可読性（片手で押せる幅）を先に確認する。

アプリ本体は `hikkoshi-app/`。`npm run dev` / `npm run build` / `npm run lint`。

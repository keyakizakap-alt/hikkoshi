export const CATEGORIES = [
  { id: 'all', label: 'すべて', icon: '🏠' },
  { id: 'appliance', label: '家電', icon: '🔌' },
  { id: 'furniture', label: '家具', icon: '🛋️' },
  { id: 'bedding', label: '寝具', icon: '🛏️' },
  { id: 'kitchen', label: 'キッチン', icon: '🍳' },
  { id: 'bath', label: 'バス・洗面', icon: '🛁' },
  { id: 'toilet', label: 'トイレ', icon: '🚽' },
  { id: 'laundry', label: '洗濯・掃除', icon: '🧺' },
  { id: 'daily', label: '日用品', icon: '🧴' },
]

export const ITEMS = [
  // 家電
  { id: 'fridge', name: '冷蔵庫', category: 'appliance', priority: 'urgent', price: 40000, note: '一人暮らし向けは100〜150L。静音タイプがおすすめ', icon: '❄️' },
  { id: 'washer', name: '洗濯機', category: 'appliance', priority: 'urgent', price: 40000, note: '縦型5〜7kgが定番。ドラム式は省スペース', icon: '🌀' },
  { id: 'microwave', name: '電子レンジ', category: 'appliance', priority: 'urgent', price: 15000, note: 'フラット型が掃除しやすい', icon: '📡' },
  { id: 'light', name: '照明（シーリングライト）', category: 'appliance', priority: 'urgent', price: 8000, note: '物件によって付属しない場合あり', icon: '💡' },
  { id: 'ac', name: 'エアコン', category: 'appliance', priority: 'urgent', price: 80000, note: '物件付属が多い。なければ設置工事が必要', icon: '🌡️' },
  { id: 'ricecooker', name: '炊飯器', category: 'appliance', priority: 'important', price: 10000, note: '3合炊きで十分', icon: '🍚' },
  { id: 'vacuum', name: '掃除機・スティッククリーナー', category: 'appliance', priority: 'important', price: 8000, note: 'スティック型が収納コンパクト', icon: '🧹' },
  { id: 'dryer', name: 'ドライヤー', category: 'appliance', priority: 'important', price: 3000, note: '1200W以上推奨', icon: '💨' },
  { id: 'kettle', name: '電気ケトル', category: 'appliance', priority: 'important', price: 3000, note: '0.8〜1Lが使いやすい', icon: '☕' },
  { id: 'wifi', name: 'Wi-Fiルーター', category: 'appliance', priority: 'important', price: 5000, note: '光回線工事完了後に設定', icon: '📶' },
  { id: 'tv', name: 'テレビ', category: 'appliance', priority: 'normal', price: 30000, note: '32型以下が一人暮らしに最適', icon: '📺' },
  { id: 'iron', name: 'アイロン・スチーマー', category: 'appliance', priority: 'normal', price: 3000, note: 'スチームアイロンが使いやすい', icon: '👔' },

  // 家具
  { id: 'bed', name: 'ベッドフレーム', category: 'furniture', priority: 'urgent', price: 20000, note: 'シングル〜セミダブルが定番。収納付きが便利', icon: '🛏️' },
  { id: 'mattress', name: 'マットレス', category: 'furniture', priority: 'urgent', price: 20000, note: '睡眠に直結。安すぎるものは避ける', icon: '🛏️' },
  { id: 'curtain', name: 'カーテン', category: 'furniture', priority: 'urgent', price: 10000, note: '入居前にサイズを採寸しておく', icon: '🪟' },
  { id: 'desk', name: 'デスク・テーブル', category: 'furniture', priority: 'important', price: 15000, note: 'ローテーブルかデスクか生活スタイルで選ぶ', icon: '🪑' },
  { id: 'chair', name: 'チェア・座布団', category: 'furniture', priority: 'important', price: 8000, note: 'デスクチェアは腰への負担を考慮', icon: '🪑' },
  { id: 'closet', name: '衣装ケース・クローゼット収納', category: 'furniture', priority: 'important', price: 5000, note: 'クローゼットのサイズに合わせて', icon: '👗' },
  { id: 'hangers', name: 'ハンガーラック・ハンガー', category: 'furniture', priority: 'important', price: 3000, note: 'ハンガー20本以上あると便利', icon: '🪝' },
  { id: 'shelf', name: '本棚・収納棚', category: 'furniture', priority: 'normal', price: 8000, note: 'オープンラックが使い勝手良い', icon: '📚' },
  { id: 'sofa', name: 'ソファ', category: 'furniture', priority: 'normal', price: 20000, note: '一人暮らしは1〜2人掛けが定番', icon: '🛋️' },

  // 寝具
  { id: 'comforter', name: '掛け布団', category: 'bedding', priority: 'urgent', price: 5000, note: '洗える素材が清潔に保てる', icon: '🛏️' },
  { id: 'pillow', name: '枕', category: 'bedding', priority: 'urgent', price: 3000, note: '高さが合うものを選ぶ', icon: '😴' },
  { id: 'sheet', name: 'シーツ・カバー', category: 'bedding', priority: 'urgent', price: 3000, note: '洗い替え含め2セット推奨', icon: '🛏️' },
  { id: 'blanket', name: '毛布・ブランケット', category: 'bedding', priority: 'normal', price: 3000, note: '季節に応じて調整', icon: '🛏️' },

  // キッチン
  { id: 'pan', name: 'フライパン（20〜26cm）', category: 'kitchen', priority: 'important', price: 3000, note: 'テフロン加工が使いやすい', icon: '🍳' },
  { id: 'pot', name: '鍋', category: 'kitchen', priority: 'important', price: 2000, note: '16〜18cmが一人用に最適', icon: '🫕' },
  { id: 'knife', name: '包丁・まな板', category: 'kitchen', priority: 'important', price: 3000, note: '三徳包丁が汎用性高い', icon: '🔪' },
  { id: 'dishes', name: '食器セット（茶碗・皿・汁椀）', category: 'kitchen', priority: 'important', price: 5000, note: '最低限のセットから始める', icon: '🍽️' },
  { id: 'cutlery', name: 'カトラリー（箸・フォーク・スプーン）', category: 'kitchen', priority: 'important', price: 1000, note: 'セットで購入が便利', icon: '🥢' },
  { id: 'cup', name: 'コップ・マグカップ', category: 'kitchen', priority: 'important', price: 1000, note: '耐熱タイプが便利', icon: '☕' },
  { id: 'trash', name: 'ゴミ箱（燃えるゴミ・資源ゴミ）', category: 'kitchen', priority: 'important', price: 2000, note: '分別に合わせて2〜3個', icon: '🗑️' },
  { id: 'dish_soap', name: '食器用洗剤・スポンジ', category: 'kitchen', priority: 'urgent', price: 500, note: '引っ越し当日から必要', icon: '🧴' },
  { id: 'tupperware', name: 'タッパー・保存容器', category: 'kitchen', priority: 'normal', price: 2000, note: '作り置きに重宝する', icon: '📦' },
  { id: 'ladle', name: 'おたま・フライ返し', category: 'kitchen', priority: 'normal', price: 1000, note: '基本的な調理器具を一式', icon: '🥄' },

  // バス・洗面
  { id: 'towel', name: 'バスタオル・フェイスタオル', category: 'bath', priority: 'urgent', price: 2000, note: '2〜3枚ずつあると安心', icon: '🛁' },
  { id: 'shampoo', name: 'シャンプー・コンディショナー', category: 'bath', priority: 'urgent', price: 1500, note: '詰め替え用が経済的', icon: '🧴' },
  { id: 'soap', name: 'ボディソープ・石鹸', category: 'bath', priority: 'urgent', price: 500, note: '泡タイプが使いやすい', icon: '🧼' },
  { id: 'bath_mat', name: 'バスマット', category: 'bath', priority: 'important', price: 1500, note: '珪藻土マットは乾きが速い', icon: '🛁' },
  { id: 'toothbrush', name: '歯ブラシ・歯磨き粉', category: 'bath', priority: 'urgent', price: 500, note: '洗面コップも一緒に', icon: '🪥' },

  // トイレ
  { id: 'toilet_paper', name: 'トイレットペーパー', category: 'toilet', priority: 'urgent', price: 1000, note: '12ロール以上のまとめ買い推奨', icon: '🧻' },
  { id: 'toilet_brush', name: 'トイレブラシ・洗剤', category: 'toilet', priority: 'important', price: 1000, note: '入居直後から必要', icon: '🚽' },

  // 洗濯・掃除
  { id: 'detergent', name: '洗濯洗剤・柔軟剤', category: 'laundry', priority: 'urgent', price: 1500, note: '洗濯機が来たら即必要', icon: '🧺' },
  { id: 'laundry_net', name: '洗濯ネット', category: 'laundry', priority: 'normal', price: 500, note: 'デリケートな衣類の洗濯に', icon: '🪡' },
  { id: 'drying_rack', name: '物干しハンガー・洗濯ばさみ', category: 'laundry', priority: 'important', price: 1500, note: '室内干し用のポールも検討', icon: '🪝' },
  { id: 'floor_wiper', name: 'モップ・フロアワイパー', category: 'laundry', priority: 'important', price: 1500, note: '掃除機のない日はこれで対応', icon: '🧹' },
  { id: 'cleaner', name: '多目的クリーナー・洗剤', category: 'laundry', priority: 'important', price: 1000, note: 'キッチン・浴室など多用途に', icon: '🧴' },

  // 日用品
  { id: 'tissue', name: 'ティッシュペーパー', category: 'daily', priority: 'urgent', price: 800, note: '5箱以上まとめ買い推奨', icon: '🧻' },
  { id: 'trash_bag', name: 'ゴミ袋', category: 'daily', priority: 'urgent', price: 500, note: '地域指定袋がある場合は購入', icon: '🗑️' },
  { id: 'plastic_wrap', name: 'ラップ・アルミホイル', category: 'daily', priority: 'normal', price: 500, note: '料理・保存に必須', icon: '🧻' },
  { id: 'medicine', name: '救急セット・常備薬', category: 'daily', priority: 'important', price: 3000, note: '体温計・絆創膏・風邪薬など', icon: '💊' },
  { id: 'scissors', name: 'はさみ・カッター・ガムテープ', category: 'daily', priority: 'important', price: 1000, note: '引っ越し梱包にも必要', icon: '✂️' },
  { id: 'umbrella', name: '傘', category: 'daily', priority: 'normal', price: 1500, note: '折り畳み傘が外出時便利', icon: '☂️' },
  { id: 'battery', name: '乾電池・モバイルバッテリー', category: 'daily', priority: 'normal', price: 2000, note: '停電・外出時に備えて', icon: '🔋' },
]

export const MOVING_TYPE_TEMPLATES = {
  student: {
    label: '学生',
    priorityItems: ['fridge', 'washer', 'bed', 'mattress', 'curtain', 'comforter', 'pillow', 'sheet', 'microwave', 'light', 'towel', 'shampoo', 'soap', 'toilet_paper', 'tissue', 'trash_bag', 'detergent', 'dish_soap'],
    budgetTips: '初期費用は親の仕送りや奨学金で計画的に。家電はリサイクルショップも活用しよう。',
  },
  worker: {
    label: '新社会人',
    priorityItems: ['fridge', 'washer', 'bed', 'mattress', 'curtain', 'comforter', 'pillow', 'sheet', 'microwave', 'light', 'desk', 'chair', 'wifi', 'dryer', 'iron', 'towel', 'shampoo', 'soap', 'toilet_paper', 'tissue', 'trash_bag', 'detergent'],
    budgetTips: '仕事環境を整えることで効率UP。Wi-Fi環境とデスクは優先して揃えよう。',
  },
  transfer: {
    label: '転勤者',
    priorityItems: ['curtain', 'light', 'wifi', 'towel', 'toilet_paper', 'tissue', 'trash_bag', 'dish_soap', 'detergent'],
    budgetTips: '会社の転勤補助を確認。既存の家財を活かし、必要最低限から追加していこう。',
  },
  custom: {
    label: 'カスタム',
    priorityItems: [],
    budgetTips: '自分のペースで準備を進めよう。',
  },
}

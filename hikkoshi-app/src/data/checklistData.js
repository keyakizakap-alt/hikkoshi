export const SECTIONS = [
  {
    id: 'before2m',
    icon: '📅',
    title: '2ヶ月以上前',
    subtitle: '早めに動こう',
    color: '#ef4444',
    items: [
      { id: 'b1', label: '引っ越し業者を複数社から見積もりを取る', note: '繁忙期（3〜4月）は早めに予約を', badge: 'urgent' },
      { id: 'b2', label: '現在の賃貸の退去通知を管理会社に出す', note: '退去予告は通常1〜2ヶ月前が多い', badge: 'urgent' },
      { id: 'b3', label: '新居の物件を探す・内見する', note: '賃貸サイトや不動産会社を活用', badge: 'urgent' },
      { id: 'b4', label: '引っ越し日を仮決定する', note: '業者・新居・退去日を合わせる', badge: 'important' },
      { id: 'b5', label: '不用品の整理・処分・売却を始める', note: 'フリマアプリ、不用品回収など', badge: 'normal' },
      { id: 'b6', label: '新居のエリアの生活情報を調べる', note: 'スーパー、交通、病院など', badge: 'normal' },
    ]
  },
  {
    id: 'before1m',
    icon: '📋',
    title: '1ヶ月前',
    subtitle: '手続きを進めよう',
    color: '#f97316',
    items: [
      { id: 'm1', label: '新居の賃貸契約を締結する', note: '初期費用（敷金・礼金・仲介手数料）の支払い', badge: 'urgent' },
      { id: 'm2', label: '引っ越し業者を正式に予約する', note: '日時・オプション・料金を確認', badge: 'urgent' },
      { id: 'm3', label: '転出届を市区町村役所に提出する', note: '引っ越し前14日以内〜後14日以内', badge: 'important' },
      { id: 'm4', label: '郵便局に転居届を提出する', note: '1年間、旧住所宛の郵便を転送してくれる', badge: 'important' },
      { id: 'm5', label: '電気の解約・移転手続き', note: '旧居解約＋新居開始日の設定', badge: 'important' },
      { id: 'm6', label: 'ガスの解約・移転手続き', note: '立会いが必要な場合あり', badge: 'important' },
      { id: 'm7', label: '水道の解約・移転手続き', note: '各自治体の水道局に連絡', badge: 'important' },
      { id: 'm8', label: 'インターネット回線の解約・移転手続き', note: '工事が必要な場合は早めに手配', badge: 'important' },
      { id: 'm9', label: 'NHK受信料の住所変更', note: 'ネットまたは電話で変更', badge: 'normal' },
      { id: 'm10', label: '勤務先・学校に住所変更を届け出る', note: '通勤経路・定期券の変更も確認', badge: 'normal' },
      { id: 'm11', label: '新居に必要な家具・家電をリストアップして発注', note: '搬入日時を引っ越し日前後に合わせる', badge: 'normal' },
    ]
  },
  {
    id: 'before2w',
    icon: '📦',
    title: '2週間前',
    subtitle: '梱包・最終準備',
    color: '#eab308',
    items: [
      { id: 'w1', label: '荷物の梱包を本格的に始める', note: '使わないものから順番に', badge: 'important' },
      { id: 'w2', label: '梱包材（段ボール・緩衝材）を集める', note: '引っ越し業者・ホームセンターで入手', badge: 'important' },
      { id: 'w3', label: '銀行・クレジットカードの住所変更', note: 'ネットバンキングやアプリで変更可能', badge: 'normal' },
      { id: 'w4', label: '各種サービス（通販・サブスク）の住所変更', note: 'Amazon・楽天・Netflixなど', badge: 'normal' },
      { id: 'w5', label: '保険（生命保険・自動車保険等）の住所変更', note: '保険会社に電話または窓口で', badge: 'normal' },
      { id: 'w6', label: '新居のカギの受け取り日程を確認する', note: '引っ越し当日に受け取れるか確認', badge: 'normal' },
      { id: 'w7', label: '近隣への挨拶品を準備する（新居）', note: 'タオル・お菓子など500〜1000円目安', badge: 'normal' },
    ]
  },
  {
    id: 'moveday',
    icon: '🚚',
    title: '引っ越し当日',
    subtitle: '忘れずに確認',
    color: '#22c55e',
    items: [
      { id: 'd1', label: '旧居の全部屋・収納を最終確認する', note: '忘れ物がないかチェック', badge: 'urgent' },
      { id: 'd2', label: '旧居の電気・ガス・水道を立会い解約する', note: 'メーター数値を記録しておく', badge: 'urgent' },
      { id: 'd3', label: '旧居の傷・汚れを記録する', note: '退去時トラブル防止のため写真撮影', badge: 'important' },
      { id: 'd4', label: '旧居のカギを返却する', note: '郵便受けの鍵・駐車場の鍵なども', badge: 'urgent' },
      { id: 'd5', label: '新居の電気・ガス・水道を開栓する', note: 'ガスは立会いが必要なことが多い', badge: 'urgent' },
      { id: 'd6', label: '新居の傷・汚れを引っ越し前に記録する', note: '入居時の状態を写真で保存', badge: 'important' },
      { id: 'd7', label: '家具・家電の搬入位置を業者に指示する', note: '事前に配置を決めておくとスムーズ', badge: 'normal' },
      { id: 'd8', label: '搬入完了後に荷物の破損がないか確認する', note: '業者立会いのもとで確認', badge: 'important' },
    ]
  },
  {
    id: 'after',
    icon: '✅',
    title: '引っ越し後',
    subtitle: '手続きを完了させよう',
    color: '#4f86f7',
    items: [
      { id: 'a1', label: '転入届を役所に提出する', note: '引っ越し後14日以内に必須', badge: 'urgent' },
      { id: 'a2', label: '運転免許証の住所変更', note: '警察署・免許センター・一部は郵便局でも可', badge: 'important' },
      { id: 'a3', label: 'マイナンバーカードの住所変更', note: '転入届と同時に手続き可能', badge: 'important' },
      { id: 'a4', label: '健康保険の住所変更', note: '国民健康保険は市区町村、会社員は会社経由', badge: 'important' },
      { id: 'a5', label: '年金手帳・ねんきんネットの住所変更', note: '年金事務所またはマイナポータルで', badge: 'normal' },
      { id: 'a6', label: '近隣（両隣・上下階）へ挨拶をする', note: '引っ越し後なるべく早めに', badge: 'important' },
      { id: 'a7', label: 'インターネット回線の開通を確認する', note: '工事が済んでいるか確認', badge: 'normal' },
      { id: 'a8', label: 'ゴミ捨てのルール・場所を確認する', note: '分別・収集日を確認しておく', badge: 'normal' },
      { id: 'a9', label: '自動車・バイクの車検証住所変更', note: '陸運局・軽自動車検査協会', badge: 'normal' },
      { id: 'a10', label: '電気・ガス・水道の名義確認', note: '自分名義になっているか確認', badge: 'normal' },
    ]
  },
]

import { useState } from 'react'

const PREFECTURES = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '范城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
  '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
  '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
  '熊本県','大分県','宮崎県','鹿児島県','沖縄県'
]

const MADORI = ['ワンルーム', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK以上']

const SITES = [
  {
    name: 'SUUMO',
    icon: '🏡',
    bg: '#22c55e',
    desc: '全国最大級の不動産情報サイト',
    url: 'https://suumo.jp/'
  },
  {
    name: 'HOMES（ホームズ）',
    icon: '🏘',
    bg: '#4f86f7',
    desc: '物件数・条件検索が豊富',
    url: 'https://www.homes.co.jp/'
  },
  {
    name: 'アットホーム',
    icon: '🏠',
    bg: '#f97316',
    desc: '地元の不動産会社に強い',
    url: 'https://www.athome.co.jp/'
  },
  {
    name: 'UR都市機構',
    icon: '🏢',
    bg: '#a855f7',
    desc: '礼金・仲介手数料なし・保証人不要',
    url: 'https://www.ur-net.go.jp/chintai/'
  },
  {
    name: 'パナソニックホームズ',
    icon: '🔑',
    bg: '#ef4444',
    desc: '新築・セキュリティ重視の物件',
    url: 'https://homes.panasonic.com/'
  },
  {
    name: 'ニフティ不動産',
    icon: '🗺',
    bg: '#eab308',
    desc: '複数サイト横断で一括比較',
    url: 'https://fudosan.nifty.com/'
  }
]

const CHECKLIST_ITEMS = [
  { icon: '🚉', label: '最寄り駅からの距離・バス便' },
  { icon: '🛒', label: 'スーパー・コンビニの距離' },
  { icon: '🏥', label: '病院・クリニックの有無' },
  { icon: '🌞', label: '日当たり・採光（南向きが理想）' },
  { icon: '🔇', label: '騒音（線路・道路・近隣）' },
  { icon: '📦', label: '収納スペースの広さ' },
  { icon: '🌀', label: '洗濯機置き場（室内か室外か）' },
  { icon: '🔒', label: 'オートロック・防犯設備' },
  { icon: '🚮', label: 'ゴミ捨て場の場所・管理状況' },
  { icon: '🚗', label: '駐車場・駐輪場の有無と料金' },
  { icon: '📶', label: '光回線対応かどうか' },
  { icon: '🐾', label: 'ペット可・楽器可などの条件' },
  { icon: '❄️', label: 'エアコンの有無・設置可否' },
  { icon: '🛁', label: 'バス・トイレ別かどうか' },
  { icon: '🏗️', label: '建物の築年数・耐震性能' },
]

export default function SearchTab() {
  const [pref, setPref] = useState('')
  const [city, setCity] = useState('')
  const [madori, setMadori] = useState([])
  const [maxRent, setMaxRent] = useState(80000)
  const [activeTab, setActiveTab] = useState('search')

  const toggleMadori = (m) => {
    setMadori(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  const buildQueryUrl = (baseUrl) => {
    return baseUrl
  }

  return (
    <>
      <div className="tab-header">
        {[
          { id: 'search', label: '🔍 条件検索' },
          { id: 'sites', label: '🌐 検索サイト' },
          { id: 'naiken', label: '📋 内見チェック' },
        ].map(t => (
          <button
            key={t.id}
            className={`tab-pill ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'search' && (
        <>
          <div style={{ padding: '12px 14px 0' }}>
            <div className="section-header">
              <span className="section-icon">📍</span>
              <h2>エリアを選ぶ</h2>
            </div>
          </div>

          <div className="area-select-wrap">
            <select className="area-select" value={pref} onChange={e => setPref(e.target.value)}>
              <option value="">都道府県を選択</option>
              {PREFECTURES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div style={{ padding: '10px 14px 0' }}>
            <input
              className="area-select"
              style={{ width: '100%', appearance: 'none', backgroundImage: 'none' }}
              type="text"
              placeholder="市区町村・エリア名を入力（例：渋谷区）"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>

          <div className="rent-range-wrap">
            <div className="rent-range-label">
              <span>家賃上限</span>
              <span>¥{maxRent.toLocaleString()}/月</span>
            </div>
            <input
              type="range"
              min={30000}
              max={300000}
              step={5000}
              value={maxRent}
              onChange={e => setMaxRent(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
              <span>3万円</span>
              <span>30万円</span>
            </div>
          </div>

          <div style={{ padding: '10px 14px 0' }}>
            <div className="section-header">
              <span className="section-icon">🛏</span>
              <h2>間取り</h2>
            </div>
            <div className="search-filter-row" style={{ padding: 0 }}>
              {MADORI.map(m => (
                <button
                  key={m}
                  className={`filter-chip ${madori.includes(m) ? 'active' : ''}`}
                  onClick={() => toggleMadori(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '12px 14px 0' }}>
            <div className="notice-box">
              <span className="notice-icon">ℹ️</span>
              <span>条件を設定したら、下の「検索サイト」タブから各サイトを開いて検索してください。</span>
            </div>
          </div>

          <div style={{ padding: '12px 14px 0' }}>
            <div className="card">
              {SITES.map(site => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-link-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="site-logo" style={{ background: site.bg + '20' }}>
                    <span>{site.icon}</span>
                  </div>
                  <div className="site-info">
                    <div className="site-name">{site.name}</div>
                    <div className="site-desc">
                      {pref ? `${pref}${city ? ' ' + city : ''} ・家賃〜¥${(maxRent/10000).toFixed(1)}万 で開く` : site.desc}
                    </div>
                  </div>
                  <div className="site-arrow">›</div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ height: 12 }} />
        </>
      )}

      {activeTab === 'sites' && (
        <>
          <div style={{ padding: '12px 14px 0' }}>
            <div className="section-header">
              <span className="section-icon">🌐</span>
              <h2>賃貸検索サイト一覧</h2>
            </div>
          </div>

          <div style={{ padding: '0 14px' }}>
            <div className="card">
              {SITES.map(site => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-link-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="site-logo" style={{ background: site.bg + '20', fontSize: 24 }}>
                    <span>{site.icon}</span>
                  </div>
                  <div className="site-info">
                    <div className="site-name">{site.name}</div>
                    <div className="site-desc">{site.desc}</div>
                  </div>
                  <div className="site-arrow" style={{ color: site.bg }}>›</div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ padding: '0 14px' }}>
            <div className="notice-box">
              <span className="notice-icon">💡</span>
              <span>複数のサイトを比較することで、より条件に合った物件が見つかりやすくなります。同じ物件でも掲載サイトによって手数料が異なる場合があります。</span>
            </div>
          </div>
          <div style={{ height: 12 }} />
        </>
      )}

      {activeTab === 'naiken' && (
        <>
          <div style={{ padding: '12px 14px 0' }}>
            <div className="section-header">
              <span className="section-icon">📋</span>
              <h2>内見チェックリスト</h2>
            </div>
          </div>

          <div style={{ padding: '0 14px' }}>
            <div className="card">
              {CHECKLIST_ITEMS.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderBottom: i < CHECKLIST_ITEMS.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, color: '#374151', flex: 1 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '0 14px' }}>
            <div className="notice-box">
              <span className="notice-icon">📸</span>
              <span>内見時は写真を撮って記録しておきましょう。複数の物件を比較するときに役立ちます。</span>
            </div>
          </div>
          <div style={{ height: 12 }} />
        </>
      )}
    </>
  )
}

import { useState } from 'react'

const YAMATO_RATES = [
  { size: '60サイズ', weight: '2kgまで', kanto: 1210, kansai: 1320, kyushu: 1430, hokkaido: 1650, okinawa: 1980 },
  { size: '80サイズ', weight: '5kgまで', kanto: 1540, kansai: 1650, kyushu: 1760, hokkaido: 1980, okinawa: 2310 },
  { size: '100サイズ', weight: '10kgまで', kanto: 1870, kansai: 1980, kyushu: 2090, hokkaido: 2310, okinawa: 2640 },
  { size: '120サイズ', weight: '15kgまで', kanto: 2200, kansai: 2310, kyushu: 2420, hokkaido: 2640, okinawa: 2970 },
  { size: '140サイズ', weight: '20kgまで', kanto: 2530, kansai: 2640, kyushu: 2750, hokkaido: 2970, okinawa: 3300 },
  { size: '160サイズ', weight: '25kgまで', kanto: 2860, kansai: 2970, kyushu: 3080, hokkaido: 3300, okinawa: 3630 },
  { size: '170サイズ', weight: '30kgまで', kanto: 3190, kansai: 3300, kyushu: 3410, hokkaido: 3630, okinawa: 3960 },
]

const SAGAWA_RATES = [
  { size: '60サイズ', weight: '2kgまで', kanto: 1177, kansai: 1287, kyushu: 1397, hokkaido: 1617, okinawa: 1947 },
  { size: '80サイズ', weight: '5kgまで', kanto: 1507, kansai: 1617, kyushu: 1727, hokkaido: 1947, okinawa: 2277 },
  { size: '100サイズ', weight: '10kgまで', kanto: 1837, kansai: 1947, kyushu: 2057, hokkaido: 2277, okinawa: 2607 },
  { size: '120サイズ', weight: '15kgまで', kanto: 2167, kansai: 2277, kyushu: 2387, hokkaido: 2607, okinawa: 2937 },
  { size: '140サイズ', weight: '20kgまで', kanto: 2497, kansai: 2607, kyushu: 2717, hokkaido: 2937, okinawa: 3267 },
  { size: '160サイズ', weight: '25kgまで', kanto: 2827, kansai: 2937, kyushu: 3047, hokkaido: 3267, okinawa: 3597 },
]

const YUPACK_RATES = [
  { size: '60サイズ', weight: '25kgまで', kanto: 1150, kansai: 1280, kyushu: 1490, hokkaido: 1710, okinawa: 1900 },
  { size: '80サイズ', weight: '25kgまで', kanto: 1360, kansai: 1490, kyushu: 1700, hokkaido: 1920, okinawa: 2120 },
  { size: '100サイズ', weight: '25kgまで', kanto: 1660, kansai: 1790, kyushu: 2000, hokkaido: 2230, okinawa: 2430 },
  { size: '120サイズ', weight: '25kgまで', kanto: 1900, kansai: 2030, kyushu: 2240, hokkaido: 2470, okinawa: 2680 },
  { size: '140サイズ', weight: '25kgまで', kanto: 2160, kansai: 2290, kyushu: 2500, hokkaido: 2730, okinawa: 2940 },
  { size: '160サイズ', weight: '25kgまで', kanto: 2400, kansai: 2530, kyushu: 2740, hokkaido: 2970, okinawa: 3200 },
]

const MOVING_GUIDE = [
  {
    type: '単身引っ越し（近距離）',
    note: '同一市内・隣接地域',
    low: 30000, high: 70000,
    icon: '🧳'
  },
  {
    type: '単身引っ越し（中距離）',
    note: '同一都道府県〜隣県',
    low: 50000, high: 100000,
    icon: '🚗'
  },
  {
    type: '単身引っ越し（遠距離）',
    note: '他県・地方間（例：東京⇔大阪）',
    low: 80000, high: 150000,
    icon: '🚅'
  },
  {
    type: 'ファミリー引っ越し（近距離）',
    note: '2LDK〜3LDK相当',
    low: 80000, high: 150000,
    icon: '👨‍👩‍👧'
  },
  {
    type: 'ファミリー引っ越し（遠距離）',
    note: '大型荷物・長距離',
    low: 150000, high: 350000,
    icon: '🚛'
  },
  {
    type: '繁忙期割増（3〜4月）',
    note: '上記に追加で発生する場合あり',
    low: 10000, high: 50000,
    icon: '📈'
  },
]

const SIZE_GUIDE = [
  { size: '60サイズ', example: '衣類・書籍・小物', desc: '3辺の合計が60cm以内' },
  { size: '80サイズ', example: '小型家電・靴箱', desc: '3辺の合計が80cm以内' },
  { size: '100サイズ', example: '中型家電・食器', desc: '3辺の合計が100cm以内' },
  { size: '120サイズ', example: '大型家電・衣装ケース', desc: '3辺の合計が120cm以内' },
  { size: '140サイズ', example: '自転車・スーツケース', desc: '3辺の合計が140cm以内' },
  { size: '160サイズ', example: '大型荷物', desc: '3辺の合計が160cm以内' },
]

function fmt(n) {
  return n.toLocaleString('ja-JP')
}

export default function ShippingTab() {
  const [activeTab, setActiveTab] = useState('yamato')

  const tableData = activeTab === 'yamato' ? YAMATO_RATES
    : activeTab === 'sagawa' ? SAGAWA_RATES
    : YUPACK_RATES

  return (
    <>
      <div className="tab-header">
        {[
          { id: 'yamato', label: '🐱 ヤマト運輸' },
          { id: 'sagawa', label: '🦅 佐川急便' },
          { id: 'yupack', label: '📮 ゆうパック' },
          { id: 'moving', label: '🚚 引っ越し費用' },
          { id: 'sizeguide', label: '📦 サイズ目安' },
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

      {(activeTab === 'yamato' || activeTab === 'sagawa' || activeTab === 'yupack') && (
        <>
          <div style={{ padding: '12px 14px 0' }}>
            <div className="section-header">
              <span className="section-icon">
                {activeTab === 'yamato' ? '🐱' : activeTab === 'sagawa' ? '🦅' : '📮'}
              </span>
              <h2>
                {activeTab === 'yamato' ? 'ヤマト運輸 宅急便' : activeTab === 'sagawa' ? '佐川急便 飛脚宅配便' : 'ゆうパック料金表'}
              </h2>
            </div>
          </div>

          <div style={{ padding: '0 14px' }}>
            <div className="card">
              <div className="shipping-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>サイズ（重量）</th>
                      <th>関東→関東</th>
                      <th>関東→関西</th>
                      <th>関東→九州</th>
                      <th>関東→北海道</th>
                      <th>関東→沖縄</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map(row => (
                      <tr key={row.size}>
                        <td>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{row.size}</div>
                          <div style={{ fontSize: 10, color: '#9ca3af' }}>{row.weight}</div>
                        </td>
                        <td className="price-highlight">¥{fmt(row.kanto)}</td>
                        <td>¥{fmt(row.kansai)}</td>
                        <td>¥{fmt(row.kyushu)}</td>
                        <td>¥{fmt(row.hokkaido)}</td>
                        <td>¥{fmt(row.okinawa)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="notice-box">
              <span className="notice-icon">⚠️</span>
              <span>
                記載価格は目安です（税込・持込割引適用前）。実際の料金は各社公式サイトや営業所でご確認ください。時期・割引サービスにより異なります。
              </span>
            </div>
          </div>

          <div style={{ padding: '10px 14px 0' }}>
            <div className="info-row">
              <div className="info-chip">
                <span className="ic-icon">💳</span>
                <div className="ic-content">
                  <div className="ic-label">持込割引</div>
                  <div className="ic-val">−100〜150円</div>
                </div>
              </div>
              <div className="info-chip">
                <span className="ic-icon">📱</span>
                <div className="ic-content">
                  <div className="ic-label">アプリ割引</div>
                  <div className="ic-val">−10〜15%</div>
                </div>
              </div>
              <div className="info-chip">
                <span className="ic-icon">🔄</span>
                <div className="ic-content">
                  <div className="ic-label">往復割引</div>
                  <div className="ic-val">対象あり</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: 12 }} />
        </>
      )}

      {activeTab === 'moving' && (
        <>
          <div style={{ padding: '12px 14px 0' }}>
            <div className="section-header">
              <span className="section-icon">🚚</span>
              <h2>引っ越し業者費用の目安</h2>
            </div>
          </div>

          <div style={{ padding: '0 14px' }}>
            <div className="card">
              {MOVING_GUIDE.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderBottom: i < MOVING_GUIDE.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <span style={{ fontSize: 24, width: 32, flexShrink: 0, textAlign: 'center' }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{item.type}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{item.note}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#4f86f7' }}>
                      ¥{fmt(item.low)}〜
                    </div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>
                      ¥{fmt(item.high)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="notice-box">
              <span className="notice-icon">💡</span>
              <span>
                繁忙期（3月〜4月）は料金が1.5〜2倍になることも。複数社から相見積もりを取り、オフシーズンや平日・午後便を選ぶとお得になります。
              </span>
            </div>

            <div style={{ marginTop: 10 }} className="card">
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>💡 費用を抑えるコツ</div>
                {[
                  '複数の業者から相見積もりを取る（3社以上推奨）',
                  '引っ越しは平日・午後便を選ぶ（10〜30%割引あり）',
                  '繁忙期（3〜4月）を避けるか早めに予約する',
                  '荷物を減らして単身パック・赤帽を活用する',
                  '格安業者は口コミを必ず確認する',
                  '引越し一括見積もりサイトを利用する',
                ].map((tip, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8, fontSize: 13, color: '#4b5563',
                    marginBottom: i < 5 ? 6 : 0
                  }}>
                    <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ height: 12 }} />
        </>
      )}

      {activeTab === 'sizeguide' && (
        <>
          <div style={{ padding: '12px 14px 0' }}>
            <div className="section-header">
              <span className="section-icon">📦</span>
              <h2>宅配サイズの目安</h2>
            </div>
          </div>

          <div style={{ padding: '0 14px' }}>
            <div className="card">
              {SIZE_GUIDE.map((item, i) => (
                <div key={i} style={{
                  padding: '12px 16px',
                  borderBottom: i < SIZE_GUIDE.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#4f86f7' }}>{item.size}</div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#374151', textAlign: 'right', marginLeft: 12 }}>
                      📦 {item.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10 }} className="card">
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>📐 サイズの測り方</div>
                <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.7 }}>
                  荷物の「縦 ＋ 横 ＋ 高さ」の合計がサイズの基準です。<br />
                  例：30cm × 20cm × 15cm = 65cm → <strong>80サイズ</strong><br /><br />
                  重量制限もあるため、重い場合はサイズと両方確認してください。
                </div>
              </div>
            </div>

            <div className="notice-box">
              <span className="notice-icon">⚠️</span>
              <span>
                宅配便では送れないものもあります（危険物・生鮮食品・現金・貴重品など）。大型家具・家電は「引越し便」「家財宅急便」を別途ご利用ください。
              </span>
            </div>
          </div>
          <div style={{ height: 12 }} />
        </>
      )}
    </>
  )
}

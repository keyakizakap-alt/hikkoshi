import { useState } from 'react'

const BUDGET_ITEMS = [
  {
    id: 'contract',
    icon: '🏠',
    title: '賃貸契約関連',
    color: '#4f86f7',
    fields: [
      { id: 'shikikin', label: '敷金', sub: '家賃の0〜2ヶ月分が相場', default: 0 },
      { id: 'reikin', label: '礼金', sub: '家賃の0〜2ヶ月分が相場', default: 0 },
      { id: 'chukaitesuryo', label: '仲介手数料', sub: '家賃の0.5〜1ヶ月分＋税', default: 0 },
      { id: 'hoshokintesuryo', label: '保証会社費用', sub: '家賃の0.5〜1ヶ月分', default: 0 },
      { id: 'kasaikosakitesuryo', label: '火災保険料', sub: '2年で1.5〜2万円程度', default: 15000 },
      { id: 'kaginkokan', label: '鍵交換費用', sub: '1.5〜3万円程度', default: 20000 },
      { id: 'maezuki', label: '前家賃・日割り家賃', sub: '入居月・翌月分など', default: 0 },
    ]
  },
  {
    id: 'moving',
    icon: '🚚',
    title: '引っ越し費用',
    color: '#22c55e',
    fields: [
      { id: 'moving_cost', label: '引っ越し業者費用', sub: '時期・距離・荷物量で大幅に変わる', default: 0 },
      { id: 'packing', label: '梱包材・資材費', sub: '段ボール・緩衝材など', default: 3000 },
      { id: 'haikinsetsu', label: '家電廃棄・処分費用', sub: '不用品の処分費', default: 0 },
    ]
  },
  {
    id: 'furniture',
    icon: '🛋️',
    title: '家具・家電購入費',
    color: '#a855f7',
    fields: [
      { id: 'reizoko', label: '冷蔵庫', sub: '3〜8万円程度', default: 0 },
      { id: 'sentakuki', label: '洗濯機', sub: '3〜8万円程度', default: 0 },
      { id: 'bed', label: 'ベッド・寝具', sub: '2〜8万円程度', default: 0 },
      { id: 'curtain', label: 'カーテン', sub: '5000〜3万円程度', default: 0 },
      { id: 'microwave', label: '電子レンジ・炊飯器', sub: '1〜3万円程度', default: 0 },
      { id: 'table', label: 'テーブル・椅子', sub: '1〜5万円程度', default: 0 },
      { id: 'light', label: '照明器具', sub: '5000〜2万円程度', default: 0 },
      { id: 'other_items', label: 'その他家具・日用品', sub: '調理器具・収納グッズなど', default: 0 },
    ]
  },
  {
    id: 'monthly',
    icon: '📅',
    title: '毎月かかる費用（目安）',
    color: '#f97316',
    fields: [
      { id: 'rent', label: '家賃', sub: '月額', default: 0 },
      { id: 'electric', label: '電気代', sub: '月平均2,000〜5,000円', default: 3000 },
      { id: 'gas', label: 'ガス代', sub: '月平均1,500〜4,000円', default: 2500 },
      { id: 'water', label: '水道代', sub: '月平均1,500〜3,000円（2ヶ月払い多い）', default: 2000 },
      { id: 'internet', label: 'インターネット代', sub: '月4,000〜6,000円', default: 5000 },
      { id: 'food', label: '食費', sub: '月3〜5万円が目安', default: 40000 },
      { id: 'transport', label: '交通費', sub: '定期代・ガソリン代など', default: 0 },
    ]
  }
]

function fmt(n) {
  if (!n && n !== 0) return '–'
  return Number(n).toLocaleString('ja-JP')
}

export default function BudgetTab() {
  const [values, setValues] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('budget') || '{}')
      const defaults = {}
      BUDGET_ITEMS.forEach(cat => cat.fields.forEach(f => { defaults[f.id] = f.default }))
      return { ...defaults, ...saved }
    } catch {
      const defaults = {}
      BUDGET_ITEMS.forEach(cat => cat.fields.forEach(f => { defaults[f.id] = f.default }))
      return defaults
    }
  })

  const setValue = (id, val) => {
    setValues(prev => {
      const next = { ...prev, [id]: val === '' ? 0 : Number(String(val).replace(/[^0-9]/g, '')) }
      localStorage.setItem('budget', JSON.stringify(next))
      return next
    })
  }

  const initialTotal = ['shikikin','reikin','chukaitesuryo','hoshokintesuryo','kasaikosakitesuryo','kaginkokan','maezuki']
    .concat(['moving_cost','packing','haikinsetsu'])
    .concat(['reizoko','sentakuki','bed','curtain','microwave','table','light','other_items'])
    .reduce((s, id) => s + (values[id] || 0), 0)

  const monthlyTotal = ['rent','electric','gas','water','internet','food','transport']
    .reduce((s, id) => s + (values[id] || 0), 0)

  return (
    <>
      <div className="budget-summary">
        <div className="bs-label">引っ越し初期費用（合計）</div>
        <div className="bs-total">¥ {fmt(initialTotal)}</div>
        <div className="bs-row">
          <div className="bs-item">
            <div className="bs-item-label">毎月の生活費</div>
            <div className="bs-item-val">¥ {fmt(monthlyTotal)}/月</div>
          </div>
          <div className="bs-item">
            <div className="bs-item-label">初期費用 ÷ 12</div>
            <div className="bs-item-val">¥ {fmt(Math.round(initialTotal / 12))}/月換算</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 14px 0' }}>
        {BUDGET_ITEMS.map(cat => {
          const catTotal = cat.fields.reduce((s, f) => s + (values[f.id] || 0), 0)
          return (
            <div key={cat.id} className="card" style={{ marginBottom: 10 }}>
              <div style={{
                padding: '12px 16px',
                background: cat.color + '15',
                borderBottom: `2px solid ${cat.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{cat.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>{cat.title}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: cat.color }}>
                  ¥ {fmt(catTotal)}
                </span>
              </div>
              {cat.fields.map(field => (
                <div key={field.id} className="budget-input-row">
                  <div className="budget-input-label">
                    <div className="bil-title">{field.label}</div>
                    <div className="bil-sub">{field.sub}</div>
                  </div>
                  <div className="budget-input-field">
                    <span className="currency">¥</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={values[field.id] || ''}
                      placeholder="0"
                      onChange={e => setValue(field.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        })}

        <div className="notice-box">
          <span className="notice-icon">💡</span>
          <span>引っ越し初期費用の目安は家賃の4〜6ヶ月分と言われています。物件・地域・時期によって大きく異なります。</span>
        </div>
        <div style={{ height: 12 }} />
      </div>
    </>
  )
}

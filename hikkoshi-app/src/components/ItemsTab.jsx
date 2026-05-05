import { useState, useMemo } from 'react'
import { ITEMS, CATEGORIES, MOVING_TYPE_TEMPLATES } from '../data/itemsData'

const PRIORITY_LABEL = { urgent: '急ぎ', important: '重要', normal: '通常' }
const PRIORITY_ORDER = { urgent: 0, important: 1, normal: 2 }

function fmt(n) {
  return n.toLocaleString('ja-JP')
}

export default function ItemsTab({ movingType }) {
  const [statuses, setStatuses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('itemStatuses') || '{}') } catch { return {} }
  })
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [view, setView] = useState('all') // 'all' | 'wishlist' | 'purchased'
  const [sortBy, setSortBy] = useState('priority') // 'priority' | 'price_asc' | 'price_desc'

  const template = MOVING_TYPE_TEMPLATES[movingType] || MOVING_TYPE_TEMPLATES.custom

  const saveStatuses = (next) => {
    setStatuses(next)
    localStorage.setItem('itemStatuses', JSON.stringify(next))
  }

  const togglePurchased = (id) => {
    const next = { ...statuses, [id]: { ...statuses[id], purchased: !statuses[id]?.purchased } }
    saveStatuses(next)
  }

  const toggleWishlist = (id) => {
    const next = { ...statuses, [id]: { ...statuses[id], wishlist: !statuses[id]?.wishlist } }
    saveStatuses(next)
  }

  const filtered = useMemo(() => {
    let list = ITEMS
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.note.toLowerCase().includes(q))
    }
    if (category !== 'all') {
      list = list.filter(i => i.category === category)
    }
    if (view === 'wishlist') {
      list = list.filter(i => statuses[i.id]?.wishlist && !statuses[i.id]?.purchased)
    } else if (view === 'purchased') {
      list = list.filter(i => statuses[i.id]?.purchased)
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    })
  }, [search, category, view, statuses, sortBy])

  const totalPurchased = ITEMS.filter(i => statuses[i.id]?.purchased).length
  const totalWishlist = ITEMS.filter(i => statuses[i.id]?.wishlist && !statuses[i.id]?.purchased).length
  const purchasedCost = ITEMS.filter(i => statuses[i.id]?.purchased).reduce((s, i) => s + i.price, 0)
  const urgentLeft = ITEMS.filter(i => i.priority === 'urgent' && !statuses[i.id]?.purchased).length

  const isRecommended = (id) => template.priorityItems.includes(id)

  return (
    <>
      <div className="items-summary-bar">
        <div className="isb-item">
          <div className="isb-num green">{totalPurchased}</div>
          <div className="isb-label">購入済み</div>
        </div>
        <div className="isb-divider" />
        <div className="isb-item">
          <div className="isb-num orange">{urgentLeft}</div>
          <div className="isb-label">急ぎ未購入</div>
        </div>
        <div className="isb-divider" />
        <div className="isb-item">
          <div className="isb-num purple">{totalWishlist}</div>
          <div className="isb-label">ほしいもの</div>
        </div>
        <div className="isb-divider" />
        <div className="isb-item">
          <div className="isb-num blue" style={{ fontSize: 13 }}>¥{fmt(purchasedCost)}</div>
          <div className="isb-label">購入合計</div>
        </div>
      </div>

      <div className="items-search-bar">
        <span className="isearch-icon">🔍</span>
        <input
          type="search"
          className="isearch-input"
          placeholder="アイテムを検索（例：冷蔵庫、布団）"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="isearch-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <div className="items-filter-scroll">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`filter-chip ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div className="items-view-row">
        {[
          { id: 'all', label: `全て (${ITEMS.length})` },
          { id: 'wishlist', label: `❤️ ほしい (${totalWishlist})` },
          { id: 'purchased', label: `✅ 購入済 (${totalPurchased})` },
        ].map(v => (
          <button
            key={v.id}
            className={`view-pill ${view === v.id ? 'active' : ''}`}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="priority">優先度順</option>
          <option value="price_asc">価格↑</option>
          <option value="price_desc">価格↓</option>
        </select>
      </div>

      {template.priorityItems.length > 0 && view === 'all' && !search && category === 'all' && (
        <div className="items-tip-box">
          <span>💡</span>
          <span><strong>{template.label}</strong>向けのおすすめアイテムに <span className="rec-badge">おすすめ</span> を表示しています</span>
        </div>
      )}

      <div className="items-list">
        {filtered.length === 0 && (
          <div className="items-empty">
            <div className="items-empty-icon">🔍</div>
            <div>該当するアイテムがありません</div>
            {search && <button className="items-empty-reset" onClick={() => setSearch('')}>検索をリセット</button>}
          </div>
        )}

        {filtered.map(item => {
          const purchased = !!statuses[item.id]?.purchased
          const wishlisted = !!statuses[item.id]?.wishlist
          const recommended = isRecommended(item.id)

          return (
            <div key={item.id} className={`item-card ${purchased ? 'purchased' : ''}`}>
              <div className="item-card-top">
                <span className="item-card-icon">{item.icon}</span>
                <div className="item-card-info">
                  <div className="item-card-name">
                    {item.name}
                    {recommended && <span className="rec-badge">おすすめ</span>}
                  </div>
                  <div className="item-card-meta">
                    <span className={`item-badge badge-${item.priority}`}>{PRIORITY_LABEL[item.priority]}</span>
                    <span className="item-card-price">目安 ¥{fmt(item.price)}</span>
                  </div>
                </div>
              </div>
              <div className="item-card-note">{item.note}</div>
              <div className="item-card-actions">
                <button
                  className={`item-action-btn wishlist ${wishlisted && !purchased ? 'active' : ''}`}
                  onClick={() => toggleWishlist(item.id)}
                  disabled={purchased}
                >
                  {wishlisted && !purchased ? '❤️ ほしい' : '🤍 ほしい'}
                </button>
                <button
                  className={`item-action-btn purchase ${purchased ? 'active' : ''}`}
                  onClick={() => togglePurchased(item.id)}
                >
                  {purchased ? '✅ 購入済み' : '購入済みにする'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {template.budgetTips && (
        <div style={{ padding: '0 14px' }}>
          <div className="notice-box">
            <span className="notice-icon">💡</span>
            <span>{template.budgetTips}</span>
          </div>
        </div>
      )}
      <div style={{ height: 16 }} />
    </>
  )
}

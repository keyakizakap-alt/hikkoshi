import { useMemo } from 'react'
import { SECTIONS } from '../data/checklistData'
import { ITEMS } from '../data/itemsData'

function ProgressRing({ pct, size = 120, stroke = 10 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#4f86f7"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  )
}

function getBadgeOrder(badge) {
  return badge === 'urgent' ? 0 : badge === 'important' ? 1 : 2
}

export default function HomeTab({ user, movingType, onTabChange }) {
  const checked = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('checklist') || '{}') } catch { return {} }
  }, [])

  const itemStatuses = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('itemStatuses') || '{}') } catch { return {} }
  }, [])

  const budgetValues = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('budget') || '{}') } catch { return {} }
  }, [])

  const allTasks = useMemo(() => SECTIONS.flatMap(s => s.items), [])
  const totalTasks = allTasks.length
  const doneTasks = allTasks.filter(i => checked[i.id]).length
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  const urgentTasks = useMemo(() =>
    allTasks
      .filter(i => !checked[i.id] && (i.badge === 'urgent' || i.badge === 'important'))
      .sort((a, b) => getBadgeOrder(a.badge) - getBadgeOrder(b.badge))
      .slice(0, 3),
    [allTasks, checked]
  )

  const totalItems = ITEMS.length
  const purchasedItems = ITEMS.filter(i => itemStatuses[i.id]?.purchased).length
  const wishlistItems = ITEMS.filter(i => itemStatuses[i.id]?.wishlist && !itemStatuses[i.id]?.purchased).length
  const urgentUnpurchased = ITEMS.filter(i => i.priority === 'urgent' && !itemStatuses[i.id]?.purchased).length

  const initialCostFields = ['shikikin','reikin','chukaitesuryo','hoshokintesuryo','kasaikosakitesuryo','kaginkokan','maezuki','moving_cost','packing','haikinsetsu','reizoko','sentakuki','bed','curtain','microwave','table','light','other_items']
  const initialTotal = initialCostFields.reduce((s, id) => s + (budgetValues[id] || 0), 0)
  const monthlyFields = ['rent','electric','gas','water','internet','food','transport']
  const monthlyTotal = monthlyFields.reduce((s, id) => s + (budgetValues[id] || 0), 0)

  const movingTypeLabel = { student: '🎓 学生', worker: '💼 新社会人', transfer: '🗺️ 転勤者', custom: '⚙️ カスタム' }

  const tips = {
    student: '奨学金・仕送り計画を立てて、まず光熱費の手続きから済ませよう！',
    worker: 'Wi-FiとデスクをDay1に揃えると仕事がスムーズ。転入届は14日以内に！',
    transfer: '会社の転居補助申請を最優先で。現地のゴミ出しルールも初日に確認！',
    custom: '期限間近のタスクから順番にこなしていこう。一歩ずつ着実に！',
  }

  return (
    <div className="home-tab">
      <div className="home-hero">
        <div className="home-hero-inner">
          <div className="home-progress-ring">
            <ProgressRing pct={pct} size={120} stroke={10} />
            <div className="home-ring-label">
              <div className="home-ring-pct">{pct}%</div>
              <div className="home-ring-sub">完了</div>
            </div>
          </div>
          <div className="home-hero-stats">
            <div className="home-stat">
              <div className="home-stat-num green">{doneTasks}</div>
              <div className="home-stat-label">完了タスク</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-num blue">{totalTasks - doneTasks}</div>
              <div className="home-stat-label">残りタスク</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-num orange">{urgentTasks.length}</div>
              <div className="home-stat-label">要対応</div>
            </div>
          </div>
        </div>
        <div className="home-moving-type">
          <span>{movingTypeLabel[movingType] || '🏠 引っ越し準備中'}</span>
          <span className="home-user-name">{user.name}</span>
        </div>
      </div>

      {urgentTasks.length > 0 && (
        <div className="home-section">
          <div className="home-section-header">
            <span className="home-section-icon">⚡</span>
            <h2>今すぐ対応が必要なタスク</h2>
          </div>
          <div className="card">
            {urgentTasks.map((task, i) => (
              <div
                key={task.id}
                className="home-task-item"
                style={{ borderBottom: i < urgentTasks.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                onClick={() => onTabChange('checklist')}
              >
                <span className={`item-badge badge-${task.badge}`}>
                  {task.badge === 'urgent' ? '急ぎ' : '重要'}
                </span>
                <div className="home-task-label">{task.label}</div>
                <span className="home-task-arrow">›</span>
              </div>
            ))}
            <button className="home-see-all" onClick={() => onTabChange('checklist')}>
              チェックリスト全体を見る →
            </button>
          </div>
        </div>
      )}

      {urgentTasks.length === 0 && doneTasks === totalTasks && (
        <div className="home-complete-banner">
          <div className="home-complete-icon">🎉</div>
          <div className="home-complete-text">チェックリストがすべて完了しました！</div>
        </div>
      )}

      <div className="home-grid">
        <button className="home-grid-card" onClick={() => onTabChange('items')}>
          <div className="hgc-icon">🛒</div>
          <div className="hgc-body">
            <div className="hgc-title">購入アイテム</div>
            <div className="hgc-value">
              <span className="green">{purchasedItems}</span>
              <span className="hgc-sep">/</span>
              <span>{totalItems}</span>
              <span className="hgc-unit">点</span>
            </div>
            {urgentUnpurchased > 0 && (
              <div className="hgc-alert">急ぎ {urgentUnpurchased}点 未購入</div>
            )}
          </div>
          <div className="hgc-arrow">›</div>
        </button>

        <button className="home-grid-card" onClick={() => onTabChange('items')}>
          <div className="hgc-icon">❤️</div>
          <div className="hgc-body">
            <div className="hgc-title">ほしいものリスト</div>
            <div className="hgc-value">
              <span className="orange">{wishlistItems}</span>
              <span className="hgc-unit">点</span>
            </div>
            <div className="hgc-sub">購入検討中</div>
          </div>
          <div className="hgc-arrow">›</div>
        </button>

        <button className="home-grid-card" onClick={() => onTabChange('budget')}>
          <div className="hgc-icon">💰</div>
          <div className="hgc-body">
            <div className="hgc-title">初期費用</div>
            <div className="hgc-value">
              {initialTotal > 0
                ? <><span className="blue">¥{(initialTotal / 10000).toFixed(1)}</span><span className="hgc-unit">万円</span></>
                : <span className="gray">未入力</span>
              }
            </div>
            <div className="hgc-sub">予算を入力しよう</div>
          </div>
          <div className="hgc-arrow">›</div>
        </button>

        <button className="home-grid-card" onClick={() => onTabChange('budget')}>
          <div className="hgc-icon">📅</div>
          <div className="hgc-body">
            <div className="hgc-title">月額生活費</div>
            <div className="hgc-value">
              {monthlyTotal > 0
                ? <><span className="purple">¥{(monthlyTotal / 10000).toFixed(1)}</span><span className="hgc-unit">万/月</span></>
                : <span className="gray">未入力</span>
              }
            </div>
            <div className="hgc-sub">家賃・光熱費など</div>
          </div>
          <div className="hgc-arrow">›</div>
        </button>
      </div>

      {tips[movingType] && (
        <div className="home-section">
          <div className="home-section-header">
            <span className="home-section-icon">💡</span>
            <h2>あなたへのアドバイス</h2>
          </div>
          <div className="home-tip-card">
            <p>{tips[movingType]}</p>
          </div>
        </div>
      )}

      <div className="home-quick-links">
        <div className="home-section-header">
          <span className="home-section-icon">🔗</span>
          <h2>よく使う機能</h2>
        </div>
        <div className="home-links-row">
          {[
            { id: 'checklist', icon: '✅', label: 'チェックリスト' },
            { id: 'items', icon: '🛒', label: 'アイテム検索' },
            { id: 'budget', icon: '💰', label: '予算管理' },
            { id: 'shipping', icon: '📦', label: '配送費用' },
          ].map(l => (
            <button key={l.id} className="home-link-btn" onClick={() => onTabChange(l.id)}>
              <span className="home-link-icon">{l.icon}</span>
              <span className="home-link-label">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 16 }} />
    </div>
  )
}

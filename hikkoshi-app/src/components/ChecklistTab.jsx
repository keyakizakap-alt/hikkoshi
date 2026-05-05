import { useState } from 'react'
import { SECTIONS } from '../data/checklistData'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function ChecklistTab() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checklist') || '{}')
    } catch { return {} }
  })
  const [openSections, setOpenSections] = useState({ before2m: true })

  const toggle = (id) => {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem('checklist', JSON.stringify(next))
      return next
    })
  }

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const totalItems = SECTIONS.reduce((s, sec) => s + sec.items.length, 0)
  const doneItems = SECTIONS.reduce((s, sec) => s + sec.items.filter(i => checked[i.id]).length, 0)
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0

  return (
    <>
      <div className="progress-card">
        <div className="progress-header">
          <span className="progress-title">全体の進捗</span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-stats">
          <div className="stat-pill done">
            <div className="stat-num">{doneItems}</div>
            <div className="stat-label">完了</div>
          </div>
          <div className="stat-pill remaining">
            <div className="stat-num">{totalItems - doneItems}</div>
            <div className="stat-label">残り</div>
          </div>
          <div className="stat-pill">
            <div className="stat-num" style={{ color: '#9ca3af' }}>{totalItems}</div>
            <div className="stat-label">全タスク</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 14px 0' }}>
        {SECTIONS.map(sec => {
          const done = sec.items.filter(i => checked[i.id]).length
          const isOpen = openSections[sec.id]
          return (
            <div key={sec.id} className="card" style={{ marginBottom: 10 }}>
              <div className="checklist-section-btn" onClick={() => toggleSection(sec.id)}>
                <div className="csb-left">
                  <span className="csb-icon">{sec.icon}</span>
                  <div>
                    <div className="csb-title">{sec.title}</div>
                    <div className="csb-meta">{sec.subtitle}</div>
                  </div>
                </div>
                <div className="csb-right">
                  <span className="csb-badge">{done}/{sec.items.length}</span>
                  <span className={`csb-chevron ${isOpen ? 'open' : ''}`}>›</span>
                </div>
              </div>
              {isOpen && sec.items.map(item => (
                <div
                  key={item.id}
                  className={`checklist-item ${checked[item.id] ? 'done' : ''}`}
                  onClick={() => toggle(item.id)}
                >
                  <div className="check-circle">
                    {checked[item.id] && <CheckIcon />}
                  </div>
                  <div className="item-content">
                    <div className="item-label">{item.label}</div>
                    {item.note && <div className="item-note">{item.note}</div>}
                  </div>
                  <span className={`item-badge badge-${item.badge}`}>
                    {item.badge === 'urgent' ? '急ぎ' : item.badge === 'important' ? '重要' : '通常'}
                  </span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

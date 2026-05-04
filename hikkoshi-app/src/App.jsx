import { useState } from 'react'
import ChecklistTab from './components/ChecklistTab'
import BudgetTab from './components/BudgetTab'
import SearchTab from './components/SearchTab'
import ShippingTab from './components/ShippingTab'

const TABS = [
  { id: 'checklist', icon: '✅', label: 'チェック', title: '引っ越しチェックリスト', emoji: '📋' },
  { id: 'budget', icon: '💰', label: '費用管理', title: '費用・予算管理', emoji: '💰' },
  { id: 'search', icon: '🔍', label: '物件検索', title: '物件検索', emoji: '🏠' },
  { id: 'shipping', icon: '📦', label: '配送費用', title: '配送・引っ越し費用', emoji: '📦' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('checklist')
  const current = TABS.find(t => t.id === activeTab)

  return (
    <>
      <header className="app-header">
        <span className="header-icon">{current.emoji}</span>
        <h1>{current.title}</h1>
      </header>

      <div className="tab-content">
        {activeTab === 'checklist' && <ChecklistTab />}
        {activeTab === 'budget' && <BudgetTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'shipping' && <ShippingTab />}
      </div>

      <nav className="bottom-nav">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}

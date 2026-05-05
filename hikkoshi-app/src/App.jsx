import { useState } from 'react'
import AuthScreen from './screens/AuthScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeTab from './components/HomeTab'
import ChecklistTab from './components/ChecklistTab'
import ItemsTab from './components/ItemsTab'
import BudgetTab from './components/BudgetTab'
import SearchTab from './components/SearchTab'
import ShippingTab from './components/ShippingTab'

const TABS = [
  { id: 'home', icon: '🏠', label: 'ホーム', title: 'ひっこしサポート', emoji: '🏠' },
  { id: 'checklist', icon: '✅', label: 'チェック', title: '引っ越しチェックリスト', emoji: '📋' },
  { id: 'items', icon: '🛒', label: 'アイテム', title: '家具・家電・日用品', emoji: '🛒' },
  { id: 'budget', icon: '💰', label: '予算', title: '費用・予算管理', emoji: '💰' },
  { id: 'shipping', icon: '📦', label: '配送', title: '配送・引っ越し費用', emoji: '📦' },
]

function loadUser() {
  try { return JSON.parse(localStorage.getItem('currentUser') || 'null') } catch { return null }
}

function loadMovingType() {
  return localStorage.getItem('movingType') || null
}

export default function App() {
  const [user, setUser] = useState(loadUser)
  const [movingType, setMovingType] = useState(loadMovingType)
  const [activeTab, setActiveTab] = useState('home')

  const handleAuth = (session, isNew) => {
    setUser(session)
    if (!isNew) {
      const saved = loadMovingType()
      setMovingType(saved)
    }
  }

  const handleMovingTypeSelect = (type) => {
    setMovingType(type)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    setMovingType(null)
  }

  if (!user) {
    return <AuthScreen onAuth={handleAuth} />
  }

  if (!movingType) {
    return <OnboardingScreen user={user} onSelect={handleMovingTypeSelect} />
  }

  const current = TABS.find(t => t.id === activeTab)

  return (
    <>
      <header className="app-header">
        <span className="header-icon">{current.emoji}</span>
        <h1>{current.title}</h1>
        {activeTab === 'home' && (
          <button className="header-logout-btn" onClick={handleLogout} title="ログアウト">
            ⏻
          </button>
        )}
      </header>

      <div className="tab-content">
        {activeTab === 'home' && (
          <HomeTab user={user} movingType={movingType} onTabChange={setActiveTab} />
        )}
        {activeTab === 'checklist' && <ChecklistTab />}
        {activeTab === 'items' && <ItemsTab movingType={movingType} />}
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

import { useState } from 'react'

export default function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const switchMode = (m) => {
    setMode(m)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!name.trim()) { setError('お名前を入力してください'); return }
      if (!email.trim()) { setError('メールアドレスを入力してください'); return }
      if (password.length < 6) { setError('パスワードは6文字以上で入力してください'); return }

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.find(u => u.email === email)) {
        setError('このメールアドレスは既に登録されています')
        return
      }
      const user = { id: Date.now().toString(), name: name.trim(), email, password }
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
      const session = { id: user.id, name: user.name, email: user.email }
      localStorage.setItem('currentUser', JSON.stringify(session))
      onAuth(session, true)
    } else {
      if (!email.trim() || !password.trim()) { setError('メールアドレスとパスワードを入力してください'); return }
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === email && u.password === password)
      if (!user) { setError('メールアドレスまたはパスワードが間違っています'); return }
      const session = { id: user.id, name: user.name, email: user.email }
      localStorage.setItem('currentUser', JSON.stringify(session))
      onAuth(session, false)
    }
  }

  const handleGuest = () => {
    const session = { id: 'guest', name: 'ゲスト', email: '' }
    localStorage.setItem('currentUser', JSON.stringify(session))
    onAuth(session, true)
  }

  return (
    <div className="auth-screen">
      <div className="auth-hero">
        <div className="auth-hero-icon">🏠</div>
        <h1 className="auth-title">ひっこしサポート</h1>
        <p className="auth-subtitle">引っ越し・一人暮らし準備を<br />安心して進めよう</p>
        <div className="auth-features">
          <span className="auth-feat">✅ チェックリスト</span>
          <span className="auth-feat">🛒 アイテム管理</span>
          <span className="auth-feat">💰 予算管理</span>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            ログイン
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            新規登録
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="auth-field">
              <label>お名前</label>
              <input
                type="text"
                placeholder="山田 太郎"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          <div className="auth-field">
            <label>メールアドレス</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
            />
          </div>
          <div className="auth-field">
            <label>パスワード{mode === 'register' ? '（6文字以上）' : ''}</label>
            <input
              type="password"
              placeholder={mode === 'register' ? '6文字以上で入力' : 'パスワード'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button type="submit" className="auth-submit">
            {mode === 'login' ? 'ログイン' : 'アカウント作成'}
          </button>
        </form>

        <div className="auth-divider">
          <span>または</span>
        </div>

        <button className="auth-guest-btn" onClick={handleGuest}>
          <span>👤</span>
          <span>ゲストとして続ける（登録不要）</span>
        </button>

        <p className="auth-note">
          ※データはこのデバイスにのみ保存されます
        </p>
      </div>
    </div>
  )
}

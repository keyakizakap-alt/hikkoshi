import { useState } from 'react'

const TYPES = [
  {
    id: 'student',
    icon: '🎓',
    title: '学生',
    subtitle: '初めての一人暮らし',
    desc: '大学・専門学校進学に合わせた引っ越し。節約重視で必要最低限から始める。',
    color: '#4f86f7',
    tags: ['予算重視', '初めての一人暮らし', '節約術'],
  },
  {
    id: 'worker',
    icon: '💼',
    title: '新社会人',
    subtitle: '就職・転職に伴う引っ越し',
    desc: '社会人デビューに合わせた引っ越し。仕事環境を整えながら生活基盤を作る。',
    color: '#22c55e',
    tags: ['仕事部屋の整備', '収入に合わせた予算', 'Wi-Fi必須'],
  },
  {
    id: 'transfer',
    icon: '🗺️',
    title: '転勤者',
    subtitle: '会社都合の引っ越し',
    desc: '会社命令の転勤。短期間での準備と、会社の転居補助活用がポイント。',
    color: '#a855f7',
    tags: ['会社補助を活用', '短期間で準備', '単身赴任'],
  },
  {
    id: 'custom',
    icon: '⚙️',
    title: 'その他・カスタム',
    subtitle: '自分でカスタマイズ',
    desc: '上のどのタイプにも当てはまらない場合はこちら。すべての機能を自由に使えます。',
    color: '#f97316',
    tags: ['自由にカスタマイズ', 'すべての機能'],
  },
]

export default function OnboardingScreen({ user, onSelect }) {
  const [selected, setSelected] = useState(null)

  const handleStart = () => {
    if (!selected) return
    localStorage.setItem('movingType', selected)
    onSelect(selected)
  }

  return (
    <div className="onboarding-screen">
      <div className="onboarding-header">
        <h2 className="onboarding-title">
          {user.name !== 'ゲスト' ? `${user.name}さん、` : ''}ようこそ！
        </h2>
        <p className="onboarding-subtitle">
          あなたの引っ越しタイプを選んでください。<br />
          最適なチェックリストとアドバイスを表示します。
        </p>
      </div>

      <div className="onboarding-types">
        {TYPES.map(type => (
          <button
            key={type.id}
            className={`type-card ${selected === type.id ? 'selected' : ''}`}
            style={{ '--type-color': type.color }}
            onClick={() => setSelected(type.id)}
          >
            <div className="type-card-top">
              <span className="type-icon">{type.icon}</span>
              <div className="type-info">
                <div className="type-title">{type.title}</div>
                <div className="type-subtitle">{type.subtitle}</div>
              </div>
              <div className={`type-check ${selected === type.id ? 'visible' : ''}`}>✓</div>
            </div>
            <p className="type-desc">{type.desc}</p>
            <div className="type-tags">
              {type.tags.map(tag => (
                <span key={tag} className="type-tag">{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="onboarding-footer">
        <button
          className="onboarding-start-btn"
          disabled={!selected}
          onClick={handleStart}
        >
          {selected
            ? `${TYPES.find(t => t.id === selected)?.title}として始める →`
            : 'タイプを選んでください'}
        </button>
        <p className="onboarding-change-note">あとから変更できます</p>
      </div>
    </div>
  )
}

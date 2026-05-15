import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchRecommendations } from '../services/index'
import { getMoodTheme } from '../utils/moods'

import PageShell from '../components/recommendations/PageShell'
import RecSection from '../components/recommendations/RecSection'

export default function ActivitiesPage() {

  const { id } = useParams()
  const navigate = useNavigate()

  const currentMood =
    sessionStorage.getItem('currentMood') || 'neutral'

  const theme = getMoodTheme(currentMood)

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {

  if (!id) return

  try {

    setLoading(true)
    setError(null)

    const data = await fetchRecommendations(id)

    setActivities(data.activities || [])

  } catch (e) {

    console.error(e)

    setError('Failed to load activities')

  } finally {

    setLoading(false)
  }
}

  useEffect(() => {
    load()
  }, [id])

  const removeActivity = (id) => {
    setActivities(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  return (

    <PageShell
      title="🏃 Activity Recommendations"
      subtitle={`Mood: ${currentMood}`}
      theme={theme}
      loading={loading}
      error={error}
      onBack={() => navigate('/dashboard/' + id)}
      onRefresh={load}
    >

      <RecSection
        title="Activities"
        emoji="🏃"
        items={activities}
        onRemove={removeActivity}
      />

    </PageShell>
  )
}
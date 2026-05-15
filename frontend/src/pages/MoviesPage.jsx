import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { fetchRecommendations } from '../services/index'
import { getMoodTheme } from '../utils/moods'

import PageShell from '../components/recommendations/PageShell'
import RecSection from '../components/recommendations/RecSection'

export default function MoviesPage() {

  const { id } = useParams()
  const navigate = useNavigate()

  const currentMood =
    sessionStorage.getItem('currentMood') || 'neutral'

  const theme = getMoodTheme(currentMood)

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {

  if (!id) return

  try {

    setLoading(true)
    setError(null)

    const data = await fetchRecommendations(id)

    setMovies(data.movies || [])

  } catch (e) {

    console.error(e)

    setError('Failed to load movies')

  } finally {

    setLoading(false)
  }
}

  useEffect(() => {
    load()
  }, [id])

  const removeMovie = (id) => {
    setMovies(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  return (

    <PageShell
      title="🎬 Movie Recommendations"
      subtitle={`Mood: ${currentMood}`}
      theme={theme}
      loading={loading}
      error={error}
      onBack={() => navigate('/dashboard/' + id)}
      onRefresh={load}
    >

      <RecSection
        title="Movies"
        emoji="🎬"
        items={movies}
        onRemove={removeMovie}
      />

    </PageShell>
  )
}
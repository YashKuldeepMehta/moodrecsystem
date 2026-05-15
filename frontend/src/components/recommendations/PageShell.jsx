import { motion } from 'framer-motion'
import { ArrowLeft, RefreshCw } from 'lucide-react'

export default function PageShell({
  title,
  subtitle,
  theme,
  loading,
  error,
  onBack,
  onRefresh,
  children
}) {

  return (

    <div
      className="min-h-screen relative overflow-hidden transition-all duration-700"
      style={{
        background: theme.bg,
        color: theme.text
      }}
    >

      {/* ORBS */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity
        }}
        className="absolute top-[-150px] left-[-150px]
                   w-[500px] h-[500px]
                   rounded-full blur-[120px] opacity-30"
        style={{
          background: theme.orb1
        }}
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity
        }}
        className="absolute bottom-[-120px] right-[-120px]
                   w-[450px] h-[450px]
                   rounded-full blur-[120px] opacity-30"
        style={{
          background: theme.orb2
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-8">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <button
            onClick={onBack}
            className="p-3 rounded-2xl backdrop-blur-xl border"
            style={{
              background: theme.card,
              borderColor: theme.border,
              boxShadow: theme.glow
            }}
          >
            <ArrowLeft />
          </button>

          <div className="text-center">

            <h1 className="text-4xl font-bold mb-2">
              {title}
            </h1>

            <p className="opacity-70">
              {subtitle}
            </p>

          </div>

          <button
            onClick={onRefresh}
            className="p-3 rounded-2xl backdrop-blur-xl border"
            style={{
              background: theme.card,
              borderColor: theme.border,
              boxShadow: theme.glow
            }}
          >
            <RefreshCw className={loading ? 'animate-spin' : ''} />
          </button>

        </div>

        {/* ERROR */}

        {/* LOADING */}

{loading && (

  <div className="flex items-center justify-center py-32">

    <motion.div
      animate={{
        rotate: 360
      }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: 'linear'
      }}
      className="w-20 h-20 rounded-full border-4 border-t-transparent"
      style={{
        borderColor: theme.border,
        borderTopColor: 'transparent'
      }}
    />

  </div>

)}

{/* ERROR */}

{error && (

  <div
    className="p-6 rounded-3xl text-center mb-6"
    style={{
      background: theme.card,
      border: `1px solid ${theme.border}`
    }}
  >
    {error}
  </div>

)}

{/* CONTENT */}

{!loading && !error && children}

      </div>

    </div>
  )
}
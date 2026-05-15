import { useEffect } from 'react'
import RecCard from './RecCard'

export default function RecSection({
  title,
  emoji,
  items = [],
  onRemove
}) {

  useEffect(() => {
    console.log(`📊 ${title}:`, items)
  }, [items])

  if (!items || items.length === 0) {

  return (
    <div className="text-center opacity-60 py-10">
      No recommendations found
    </div>
  )
}

  return (

    <div className="mb-10">

      <h2>
        {emoji} {title} ({items.length})
      </h2>

     <div className="grid grid-cols-3 gap-4">

  {items.map((item, i) => (

    <RecCard
      key={item.id || i}
      item={item}
      index={i}
      onRemove={onRemove}
    />

  ))}

</div>
    </div>
  )
}
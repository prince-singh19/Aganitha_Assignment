// BookGrid.jsx
import React from 'react'
import { coverUrl } from '../utils/api'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect width="100%" height="100%" fill="%23111"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="16">No Cover</text></svg>'

const BookGrid = ({ books, onSelect }) => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {books.map((b) => (
        <li key={b.key} className="group cursor-pointer" onClick={() => onSelect(b)}>
          <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 shadow-sm">
            <div className="bg-slate-900/50">
              <img
                src={b.cover_i ? coverUrl(b.cover_i, 'M') : PLACEHOLDER}
                alt={b.title}
                className="h-56 w-full object-cover transition-transform group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-semibold text-slate-100">{b.title}</h3>
              <p className="mt-1 line-clamp-1 text-xs text-slate-300">
                {(b.author_name && b.author_name.join(', ')) || 'Unknown'}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {b.first_publish_year && (
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-200 border border-slate-700">
                    {b.first_publish_year}
                  </span>
                )}
                {b.language && b.language[0] && (
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-200 border border-slate-700">
                    {b.language[0].toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BookGrid

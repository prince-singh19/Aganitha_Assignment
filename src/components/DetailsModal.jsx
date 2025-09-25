import React, { useEffect, useState } from 'react'
import { coverUrl, fetchWorkDetails } from '../utils/api'

const DetailsModal = ({ book, onClose }) => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    if (book?.key) {
      fetchWorkDetails(book.key, controller.signal)
        .then(setDetails)
        .catch(() => setDetails(null))
    } else {
      setDetails(null)
    }
    return () => controller.abort()
  }, [book?.key])

  if (!book) return null

  const googleQuery = encodeURIComponent(
    `${book.title} ${(book.author_name || []).join(' ')}`
  )
  const googleBooksUrl = `https://www.google.com/search?tbm=bks&q=${googleQuery}`

  const editionId = book.edition_key?.[0]
  const iaId = book.ia?.[0]
  const openLibraryReadUrl = iaId
    ? `https://archive.org/stream/${iaId}`
    : editionId
    ? `https://openlibrary.org/books/${editionId}`
    : undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row">
          <img
            src={book.cover_i ? coverUrl(book.cover_i, 'L') : undefined}
            alt={book.title}
            className="h-64 w-full object-cover sm:h-auto sm:w-64 bg-slate-800"
          />
          <div className="p-6 flex-1 text-slate-100">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="mt-1 text-sm text-slate-300">
              {book.author_name?.join(', ') || 'Unknown author'}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-300">
              {book.first_publish_year && (
                <div>
                  <span className="font-medium">First published:</span>{' '}
                  {book.first_publish_year}
                </div>
              )}
              {book.edition_count && (
                <div>
                  <span className="font-medium">Editions:</span> {book.edition_count}
                </div>
              )}
              {book.language && (
                <div className="col-span-2">
                  <span className="font-medium">Languages:</span> {book.language.join(', ')}
                </div>
              )}
              {book.publisher && (
                <div className="col-span-2">
                  <span className="font-medium">Publishers:</span>{' '}
                  {book.publisher.slice(0, 6).join(', ')}
                </div>
              )}
            </div>

            {details?.description && (
              <p className="mt-4 text-sm text-slate-200 line-clamp-5">
                {details.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {openLibraryReadUrl && (
                <a
                  href={openLibraryReadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                >
                  Read on Open Library
                </a>
              )}
              <a
                href={googleBooksUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700"
              >
                Find on Google Books
              </a>
              <button
                onClick={onClose}
                className="ml-auto rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsModal

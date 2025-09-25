import React, { useState, useEffect, useMemo } from 'react'
import BookGrid from './components/BookGrid'
import DetailsModal from './components/DetailsModal'
import { SearchForm } from './components/SearchForm'
import { searchBooks } from './utils/api'

function App() {
  const [values, setValues] = useState({
    title: '',
    author: '',
    year: '',
    language: '',
    fromYear: '',
    toYear: '',
    sort: 'relevance',
  })
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [selected, setSelected] = useState(null)

  const pageSize = 20

  const computedParams = useMemo(() => ({
    title: values.title.trim() || undefined,
    author: values.author.trim() || undefined,
    first_publish_year: values.year.trim() || undefined,
    language: values.language.trim() || undefined,
    page,
    limit: pageSize,
  }), [values, page])

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      if (!computedParams.title && !computedParams.author && !computedParams.first_publish_year && !computedParams.language) {
        setResult(null)
        setError(null)
        return
      }
      setIsLoading(true)
      setError(null)
      try {
        const data = await searchBooks(computedParams, controller.signal)
        setResult(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    run()
    return () => controller.abort()
  }, [computedParams])

  let docs = result?.docs || []
  const total = result?.numFound || 0

  const fromY = values.fromYear ? parseInt(values.fromYear) : undefined
  const toY = values.toYear ? parseInt(values.toYear) : undefined

  if (fromY || toY) {
    docs = docs.filter((b) => {
      const y = b.first_publish_year || 0
      if (fromY && y < fromY) return false
      if (toY && y > toY) return false
      return true
    })
  }

  if (values.sort === 'year_desc') {
    docs = [...docs].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))
  } else if (values.sort === 'year_asc') {
    docs = [...docs].sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0))
  }

  const totalPages = Math.min(50, Math.ceil(total / pageSize))

  const onSubmit = () => setPage(1)
  const clearAll = () => {
    setValues({ title: '', author: '', year: '', language: '', fromYear: '', toYear: '', sort: 'relevance' })
    setPage(1)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="container-responsive py-6 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Book Finder</h1>
          <p className="text-slate-300">Search Open Library by title, author, language, and year. Press Enter to search.</p>
          <SearchForm values={values} onChange={setValues} onSubmit={onSubmit} onClear={clearAll} />
          {total > 0 && <div className="text-slate-300 text-sm">{total.toLocaleString()} results</div>}
        </div>
      </header>

      <main className="container-responsive flex-1 py-6">
        {!values.title && !values.author && !values.year && !values.language && (
          <div className="text-center text-slate-400">
            <p>Start by searching for a title, author, year, or language.</p>
          </div>
        )}

        {isLoading && <div className="flex justify-center py-16"><div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div></div>}

        {error && <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>}

        {!isLoading && !error && docs.length === 0 && (values.title || values.author || values.year || values.language) && (
          <div className="rounded-md border border-slate-700 bg-slate-800 p-4 text-slate-200">No results found.</div>
        )}

        {docs.length > 0 && <BookGrid books={docs} onSelect={setSelected} />}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between text-slate-300">
            <p className="text-sm">
              Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span> — <span className="font-medium">{total.toLocaleString()}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm disabled:opacity-50">Previous</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/80">
        <div className="container-responsive py-4 text-center text-sm text-slate-400">
          Built with React + Tailwind using Open Library API
        </div>
      </footer>

      <DetailsModal book={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default App

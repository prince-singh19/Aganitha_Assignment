import React from 'react'

export const SearchForm = ({ values, onChange, onSubmit, onClear }) => {
  const update = (field) => (e) =>
    onChange({ ...values, [field]: e.target.value })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="w-full"
    >
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Title</label>
            <input
              type="text"
              placeholder="e.g. The Hobbit"
              value={values.title}
              onChange={update('title')}
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Author</label>
            <input
              type="text"
              placeholder="e.g. J.R.R. Tolkien"
              value={values.author}
              onChange={update('author')}
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Language</label>
            <select
              value={values.language}
              onChange={update('language')}
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="">Any</option>
              <option value="eng">English</option>
              <option value="hin">Hindi</option>
              <option value="spa">Spanish</option>
              <option value="fra">French</option>
              <option value="ger">German</option>
              <option value="rus">Russian</option>
              <option value="tam">Tamil</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">From year</label>
            <input
              type="number"
              placeholder="e.g. 1950"
              value={values.fromYear || ''}
              onChange={update('fromYear')}
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">To year</label>
            <input
              type="number"
              placeholder="e.g. 2020"
              value={values.toYear || ''}
              onChange={update('toYear')}
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Sort</label>
            <select
              value={values.sort || 'relevance'}
              onChange={update('sort')}
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="relevance">Relevance</option>
              <option value="year_desc">Newest</option>
              <option value="year_asc">Oldest</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            Search
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm hover:bg-slate-700"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}

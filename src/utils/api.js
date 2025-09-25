export const BookDoc = {
  key: "",
  title: "",
  author_name: [],
  first_publish_year: 0,
  cover_i: 0,
  edition_count: 0,
  language: [],
  subject: [],
  isbn: [],
  publisher: [],
  edition_key: [],
  ia: [],
  ebook_count_i: 0
}



export const SearchResponse = {
  numFound: 0,
  start: 0,
  docs: BookDoc
}


export const SearchParams = {
  title: "",
  author: "",
  first_publish_year: "",
  language: "",
  page: 0,
  limit: 0
}

export function buildSearchQuery(params) {
  const sp = new URLSearchParams()
  if (params.title) sp.set('title', params.title)
  if (params.author) sp.set('author', params.author)
  if (params.first_publish_year) sp.set('first_publish_year', params.first_publish_year)
  if (params.language) sp.set('language', params.language)
  sp.set('page', String(params.page ?? 1))
  sp.set('limit', String(params.limit ?? 20))
  return sp.toString()
}

export async function searchBooks(params, signal) {
  const query = buildSearchQuery(params)
  const url = `https://openlibrary.org/search.json?${query}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}
export function coverUrl(coverId,size) {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

export const WorkDetails = {
  description: "",
  subjects: []
}

export async function fetchWorkDetails(workKey, signal) {

  const url = `https://openlibrary.org${workKey}.json`
  const res = await fetch(url, { signal })
  if (!res.ok) return {}
  const data = await res.json()
  const description = typeof data.description === 'string' ? data.description : data.description?.value
  return { description, subjects: data.subjects }
}





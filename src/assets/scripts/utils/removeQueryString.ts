import queryString from 'query-string'

const removeQueryString = (query: string): void => {
  const queryParsed = queryString.parse(window.location.search)

  if (!queryParsed[query]) {
    return
  }

  const updateQueryString = queryString.exclude(window.location.href, [query])

  history.pushState(null, '', updateQueryString)
}

export default removeQueryString

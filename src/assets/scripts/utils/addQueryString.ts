import queryString from 'query-string'

const AddQueryString = (query: string, value: string): void => {
  const queryParsed = queryString.parse(window.location.search)

  queryParsed[query] = value
  const updateQueryString = queryString.stringify(queryParsed)

  history.pushState(null, '', '?' + updateQueryString)
}

export default AddQueryString

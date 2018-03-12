import storage from 'good-storage'

const SEARCH_KEY = '__SEARCH__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__PLAY__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__FAVORITE__'
const FAVORITE_MAX_LEN = 200

function insert(arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function del(arr, val, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  if (!query) {
    return
  }
  insert(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)

  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearches() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searchs = storage.get(SEARCH_KEY, [])
  if (!query) {
    return
  }
  del(searchs, query, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function savePlay(song) {
  let plays = storage.get(PLAY_KEY, [])
  if (!song) {
    return
  }
  insert(plays, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LEN)

  storage.set(PLAY_KEY, plays)
  return plays
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let favoriteList = storage.get(FAVORITE_KEY, [])
  if (!song) {
    return
  }
  insert(favoriteList, song, (item) => {
    return item.mid === song.mid
  }, FAVORITE_MAX_LEN)

  storage.set(FAVORITE_KEY, favoriteList)
  return favoriteList
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

export function deleteFavorite(song) {
  let favoriteList = storage.get(FAVORITE_KEY, [])
  if (!song) {
    return
  }
  del(favoriteList, song, (item) => {
    return item.mid === song.mid
  })
  storage.set(FAVORITE_KEY, favoriteList)
  return favoriteList
}

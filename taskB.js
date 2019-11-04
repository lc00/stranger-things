const axios = require('axios')

async function getAllEpisodes(showId) {
  const result = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`)
  return result.data
}
  
function getEpisodeId(episodeArr, word) {
  const re = new RegExp(word, "gm")

  for(let i = 0; i < episodeArr.length; i++) {
    let { id, summary } = episodeArr[i]

    let isFound = summary.search(re)

    if(isFound>= 0) {
      // console.log(`episode id: ${id}`)
      return id
    }
  }
  return `Cannot find the episode Id that has ${word}`
}

async function taskB(showId, word) {
  const episodeArr = await getAllEpisodes(showId, word)
  const result = getEpisodeId(episodeArr, 'Dustin')
  return [episodeArr, result]
}

module.exports = taskB


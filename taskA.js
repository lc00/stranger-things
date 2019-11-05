const axios = require('axios')

async function getTvShow(url) {
  try{
    const result = await axios.get(url)
    return result.data
  } catch (error) {
    return console.error(`error: ${error}`)
  }
}

async function getAllEpisodes(showId) {
  const result = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`)
  return result.data
}

  

function createWordObj(episodeArr) {
  try{
    let combinedSummary = ""

    for(let i = 0; i < episodeArr.length; i++) {
      let { summary } = episodeArr[i]
      combinedSummary += summary  
    }
  
    // https://stackoverflow.com/questions/3790681/regular-expression-to-remove-html-tags
    combinedSummary = combinedSummary.replace(/<[^>]*>/gm, '')
  
    combinedSummary = combinedSummary.replace(/[,\.;:"]/gm, '')
  
    let arr = combinedSummary.split(' ')
    let obj = {}
  
    arr.forEach(element => {
      element = element.toLowerCase()
      element in obj ? obj[element] +=1 : obj[element] = 1
    });
  
    return obj  
  } catch (error) {
    return console.error(`error: ${error}`)
  }
}

function getMostPopularWords(obj, numOfWords) {
  try {
    let finalResultArr
    let str = ''
  
    finalResultArr = Object.keys(obj).sort((a,b) => {
      return obj[b] - obj[a]
    })
  
    let count = 0
    while(count < numOfWords) {
      let key = finalResultArr.shift()
      str += key 
      str += '('
      str += obj[key]
      str += ')'
  
      if(numOfWords - count > 1) str +=','
  
      count++
    }
    return str
  } catch (error) {
    console.error(`error: ${error}`)
  }
}

async function taskA(url) {
  const numOfWords = 5

  const tvShow = await getTvShow(url)
  const episodeArr = await getAllEpisodes(tvShow.id)

  const wordObj = createWordObj(episodeArr)
  const result = getMostPopularWords(wordObj, numOfWords)
  
  const showId = tvShow.id
  return [showId, episodeArr, result]

}

module.exports = taskA
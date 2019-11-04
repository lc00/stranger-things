const axios = require('axios')

async function getTvShow(url) {
  try{
    const result = await axios.get(url)
    return result.data
  } catch (error) {
    return console.error(`error: ${error}`)
  }
}

function createWordObj(tvShow) {
  try{
    let summary = tvShow.summary
  
    // https://stackoverflow.com/questions/3790681/regular-expression-to-remove-html-tags
    summary = summary.replace(/<[^>]*>/gm, '')
  
    summary = summary.replace(/[,\.;:"]/gm, '')
  
    let arr = summary.split(' ')
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
  const wordObj = createWordObj(tvShow)
  const result = getMostPopularWords(wordObj, numOfWords)
  
  const showId = tvShow.id
  return [showId, result]

}

module.exports = taskA
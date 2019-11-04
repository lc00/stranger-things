const moment = require('moment')

function taskC(episodeArr, showId) {
  try{
    let resultObj = {}
    resultObj[showId] = {}
    let totalDurationsMin = 0
    let totalEpisodes = 0
    let totalSeasons = 0
    let episodeId
    let name
    let timeStamp
    let shortSummary
    let shortSummaryArr
    let episodeInfo
    
    resultObj[showId]['episodes'] = {}
    resultObj[showId]['totalDurationSec'] = null
    resultObj[showId]['averageEpisodesPerSeason'] = null
    
    episodeArr.forEach(episode => {
      totalDurationsMin += episode.runtime
      totalEpisodes++
    
      if(episode.season > totalSeasons) totalSeasons = episode.season
    
      episodeId = episode.id
      name = episode.name.replace(/Chapter\s\w+:\s/, '')
      timeStamp = episode.airstamp.replace(/T/, ' ').replace(/[+]00:0/, '')
      timeStamp = moment(timeStamp, "YYYY/M/D H:mm:ss").valueOf()
    
      shortSummary = episode.summary.replace(/<[^>]*>/gm, '')
      shortSummaryArr = shortSummary.split('.')
      shortSummary = shortSummaryArr.shift()
    
      episodeInfo = {
        sequenceNumber:  `s${episode.season}e${episode.number}`,
        shortTitle: name,
        airTimestamp: timeStamp,
        shortSummary: shortSummary
      }
    
      resultObj[showId]['episodes'] [episodeId] = episodeInfo
    
    })
    
    resultObj[showId]['totalDurationSec'] = totalDurationsMin * 60
    resultObj[showId]['averageEpisodesPerSeason'] = Number((totalEpisodes / totalSeasons).toFixed(1))
    
    let newResultObj = {}
    newResultObj[showId] = {
      totalDurationSec: resultObj[showId]['totalDurationSec'],
        averageEpisodesPerSeason: resultObj[showId]['averageEpisodesPerSeason'],
        episodes:  resultObj[showId].episodes
    }
    return newResultObj
  } catch (error) {
    console.error(`error: ${error}`)
  }
}

module.exports = taskC
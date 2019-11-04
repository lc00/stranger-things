/*
  Console log the ID of the episode where “Dustin” is mentioned for the very first time in an episode “summary.”
*/

const axios = require('axios')

  
  // get season number and episode number
  // let previousEpisodeSeasonNum = 
  // find season 1 and episode 1
    // use the current episodeId and go backwards one at a time
      // get the url and check for stranger-things 
        // if yes
          // store the info of this episode
          // get season number and episode number
          // if it is season 1 and episode 1
            // stop

  // loop through the stored info to find in summary for “Dustin”
     // look into summary to find Dustin
        // if it's there, return episideId
    // if at the end of the loop, no Dustin is found, return 'cannot find it'


async function getTvShowInfo() {
  let tvshowInfo 

  try{
    // get JSON
    tvshowInfo = await axios.get('https://api.tvmaze.com/singlesearch/shows?q=stranger-things&amp;embed=episodes')
    return tvshowInfo.data
  }
  catch(err){
    console.error('err in getTvShowInfo', err)
  }
  

}

async function getEpisodeInfo(url) {
  let episode 
  try{
    // get JSON
    episode = await axios.get(url)
    return episode.data
  }
  catch(err){
    console.error('err in getTvShowInfo', err)
  }
  

}

async function getAndStoreAllEpisodes(id, showArr) {
  let newId = id
  let url = `https://api.tvmaze.com/episodes/${id}`

  try {
    let episode = await getEpisodeInfo(url)
    let isEpisode = episode.url.search(/stranger-things/gm)  
  
    if(isEpisode >= 0) {
      // store previous episode
      showArr.unshift(episode)
      if(episode.season == 2 && episode.number == 7) {
        return showArr
      }
      else {
        let id = episode.id - 1
        // url = `https://api.tvmaze.com/episodes/${episodeId}`
        return getAndStoreAllEpisodes(id, showArr)
      }
    } else {
      let id = episode.id - 1
      // url = `https://api.tvmaze.com/episodes/${episodeId}`
      return getAndStoreAllEpisodes(id, showArr)
    }

  } catch (error) {
    console.error(`error getAndStoreAllEpisodes: ${error}`)

    let id = newId - 2
    // url = `https://api.tvmaze.com/episodes/${episodeId}`
    return getAndStoreAllEpisodes(id, showArr)

  }
}


  
async function main() {
  let showArr = []
  // get tv-show info
  let tvshowInfo = await getTvShowInfo()
  // console.log('tvshowInfo', tvshowInfo)

  let url = tvshowInfo['_links'].previousepisode.href

  let episode = await getEpisodeInfo(url)
  showArr.unshift(episode)

  // get and store all episodes
  let otherShowArr = await getAndStoreAllEpisodes(episode.id, [])
  showArr.unshift(otherShowArr)

  return showArr

  // start from the first episode to find in the summary for 'Dustin'
}
// async function run() {
//   let result = await main()
//   return result
// }

// let result = run()

main()
  .then(result => console.log('showArr', result))
  .catch(error => console.error(`error: ${error}`))

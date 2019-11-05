(async function() {
  const url = 'https://api.tvmaze.com/singlesearch/shows?q=stranger-things&amp;embed=episodes'
  const taskA = require('./taskA')
  const taskB = require('./taskB')
  const taskC = require('./taskC')
  const word = 'Dustin'

  const [showId, episodes, resultA]= await taskA(url)
  const resultB = await taskB(episodes, word)
  const resultC = taskC(episodes, showId)

  console.log(resultA)
  console.log(`episode id: ${resultB}`)
  console.log(JSON.stringify(resultC, null, 2))
  
  return
})()

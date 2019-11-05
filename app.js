(async function() {
  const url = 'https://api.tvmaze.com/singlesearch/shows?q=stranger-things&amp;embed=episodes'
  const taskA = require('./taskA')
  const taskB = require('./taskB')
  const taskC = require('./taskC')
  const word = 'Dustin'

  const [showId, episodes, resultA]= await taskA(url)
  const resultB = await taskB(episodes, word)
  const resultC = taskC(episodes, showId)

  console.log(`Task-A: 5 most popular summary words => ${resultA}`)
  console.log(`Task-B: the very first time where Dustin is mentioned is in episode id: ${resultB}`)
  console.log(`Task-C: re-format the json => `, JSON.stringify(resultC, null, 2))
  
  return
})()

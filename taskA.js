const axios = require('axios')
let summary 

// axios.get('https://api.tvmaze.com/singlesearch/shows?q=stranger-things&amp;embed=episodes')
//   .then(result => {
//     // console.log(`result: ${result}`)
//     // // result = JSON.(result)
//     // console.log(`summary: ${result.data.summary}`)
//     summary = result.data.summary


//     summary = summary.replace(/<[^>]*>/gm, '')

//     console.log(summary)

//   })
//   .catch(error => {
//     console.error(`error: ${error}`)
//   })

summary = "<p>A love letter to the '80s classics: that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>"
summary = summary.replace(/<[^>]*>/gm, '')
summary = summary.replace(/[,\.;:"]/gm, '')
console.log(summary)

/*
// replace , . <b> </b>  with ''
// use object to store word and count
*/
function test(summary) {

  let arr = summary.split(' ')
  let obj = {}

  arr.forEach(element => {
    element = element.toLowerCase()
    element in obj ? obj[element] +=1 : obj[element] = 1
  });

  return obj  

}

let resultObj = test(summary)

let str = ''
let result = {}

// find the hightest value and put in array
  let finalResultArr

  let keys = Object.keys(resultObj)

  finalResultArr = keys.sort((a,b) => {
    return resultObj[b] - resultObj[a]
  })
console.log('finalResultArr', finalResultArr)

let count = 0
while(count < 5) {
  let key = finalResultArr.shift()
  console.log(key, resultObj[key])
  count++
}



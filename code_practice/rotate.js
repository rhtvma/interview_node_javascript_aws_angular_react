
// inp1= chocolate ->  echocolat ->  techocola  ->  atechocol
// inp2 =olatechoc

const rotate = (input) => { // rotate string
    input = input.split("")
    const firstIndex = input[0]
    const lastIndex = input[input.length-1]
    input = input.shift()
    input = input.unshift(firstIndex)
    input = lastIndex + input.join()
    return input
  }
  const mainFun = (inp1, inp2) => {
        let result
        let count = 0
        for(const indx in inp1) {
          if(inp2 !== result) {
            result = rotate(inp1)
            count = count + 1
          }
        }
    return count
  }
  
  mainFun('chocolate', 'olatechoc')
  
  
  

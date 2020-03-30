// document body elements 모두 가져오기

if(typeof document !== 'undefined') {
  const isArray = target => Array.isArray(target)
  const isObject = target => !isArray(target) && typeof target === 'object'
  
  // 재귀함수
  const recurExplorer = (target, f = (item) => {}) => {
    const children = target.children
    for(const child of children) {
      f(child)
      if(child.children.length > 0) recurExplorer(child, f)
    }
  };
  
  // loop함수
  const loopExplorer = (target, f = (item) => {}) => {
    const stack = [target.children]
    do{
      const currentTarget = stack.shift()
      for(const child of currentTarget){  
        if(child.children.length > 0) stack.push(child.children)
        f(child)
      }
    }while(stack.length)
  }

  const loopOrderExplorer = (target, f = (item) => {}) => {
    const result = {target, children: []};
    const stack = [{target, children: target.children}]
    
    //계층구조
    // currentResult = {target, children, parent: currentResult};
    // currentResult = {target, children, parent: currentResult};
    // currentResult = {target, children, parent: currentResult};
    
    do{
      const currentStack = stack.shift()
      let currentResult = {...result, parent: null}
      for(const child of currentStack.children){ 
        if(child.children.length > 0) {
          stack.push({target: child, children: child.children})
          currentResult.parent = 'parent'
        } 
        else stack.push({target: child, children: []})  
      }

      // console.log('stack: ', currentStack)
      console.log('result: ', currentResult)
    }while(stack.length)
  }

  // recurExplorer(document.body, tag => console.log(tag))
  // loopExplorer(document.body, tag => console.log(tag))
  loopOrderExplorer(document.body)
}


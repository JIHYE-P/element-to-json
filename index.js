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
  // recurExplorer(document.body, tag => console.log(tag))
  
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
  // loopExplorer(document.body, tag => console.log(tag))

  // 계층구조 엘리먼트
  const dom2json = (root, f = (item) => {}) => {
    const result = {node: root, children: [], parent: null};
    const stack = [result];

    let target;
    while (target = stack.shift()) { // 빈배열이 될 때 까지 반복문 실행 
      // 자식이 있을 경우 스택에 추가
      [...target.node.children].forEach((node) => stack.push({node, children: [], parent: target}));
      // 부모 객체와 자식객체 연결 
      if (target.parent === null) {}
      else {target.parent.children.push(target)}
    }
    f(result)
    return result
  };
  dom2json(document.body, result => console.log(result))

}


const arr = [
  { 
    name: "main1",
    type: "folder",
    children: [
      {
        name: "chilren1-1",
        type: "folder", 
      },
      {
        name: "chilren1-2",
        type: "folder", 
      }
    ]
  },
  { 
    name: "main2",
    type: "folder",
    children: []
  },
  { 
    name: "main3",
    type: "folder",
    children: [
      {
        name: "chilren3-1",
        type: "file", 
      },
      {
        name: "chilren3-2",
        type: "file", 
      }
    ]
  }
]

const obj = {
  name: "main1",
  type: "folder",
  children: [
    {
      name: "chilren1-1",
      type: "file", 
    },
    {
      name: "chilren1-2",
      type: "file", 
    }
  ]
}

const isArray = target => Array.isArray(target); // true, false 반환
const isObject = target => !isArray(target) && typeof target === 'object';

// loop 방식
const loopExplorer = (target, f = (item) => {}) => {
  const stack = [target];
  do {
    const currentTarget = stack.shift();
    if (isArray(currentTarget)) stack.push(...currentTarget);
    else if (isObject(currentTarget)) for (const key in currentTarget) stack.push(currentTarget[key]);
    else f(currentTarget);
  } while (stack.length);
};

// 재귀 방식 
const recurExplorer = (target, f = (item) => {}) => {
  if (isArray(target)) target.forEach(item => recurExplorer(item, f));
  else if (isObject(target)) for (const key in target) recurExplorer(target[key], f);
  else f(target);
};

const dom2json = root => {
  const result = {node: root, childNodes: [], parent: null};
  const stack = [result];
  let target;
  while (target = stack.shift()) {
    // 부모 객체와 자식객체 연결 
    if (target.parent === null) {}
    else target.parent.childNodes.push(target);
    // 자식이 있을 경우 스택에 추가
    [...target.node.childNodes].forEach((node) => stack.push({node, childNodes: [], parent: target}));
  }
  console.log(result)
  return result;
};

// dom2json(document.body);
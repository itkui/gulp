testName('index.js');
(function (body) {
  let doneFunc = {
    speak: () => {
      alert('我要说什么呢？');
    },
    think: () => {
      console.log('我在想什么？');
    },
    eat: () => {
      console.log('吃些什么？');
      console.log(this);
    },
  };
  let { name, age, sex } = body;
  let dom = document.createElement('div');
  dom.innerText = `姓名：${name}；年龄：${age}；性别：${sex}`;
  dom.addEventListener('click', () => {
    // console.log(doneFunc);
    console.log('click');
  });

  document.getElementsByTagName('body')[0].appendChild(dom);
})({
  name: '张三',
  age: 14,
  sex: '男',
});

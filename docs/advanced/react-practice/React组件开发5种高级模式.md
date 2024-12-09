# React 组件开发 5 种高级模式

经常碰到的问题

- 如何重构**可复用**组件来适合不同场景
- 如何使用**简单的API**构建组件，使其易于使用
- 如何在UI和功能方面构建**可扩展**组件

## 复合组件模式

```jsx
import React from "react";
import { Counter } from "./Counter";

function Usage() {
  const handleChangeCounter = (count) => {
    console.log("count", count);
  };

  return (
    <Counter onChange={handleChangeCounter}>
      <Counter.Decrement icon="minus" />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon="plus" />
    </Counter>
  );
}

export { Usage };
```

### 优点

- 降低 API 复杂度，不是将所有 props 塞到父组件，而是为每个子组件添加有意义的props
- 灵活的标记结构，有很大的 UI 灵活性，例如可以更改顺序

- 关注点分离：大部分逻辑包含在主 `Counter` 组件，然后通过 `Context` 共享 states 和 handlers

![](https://file.simonwong.cn/blog/20210531135914.png)

### 缺点

- 过多的UI灵活性，伴随着意外行外，比如放了不要的子组件，是组件无序
- 增加了 JSX 行数，变得更重

### 标准

- 控制反转 1/4
- 集成复杂度 1/4

### 案例

[react-bootstrap  dropdowns](https://react-bootstrap.github.io/components/dropdowns/)



## Control Props Pattern

将组件转换为[受控组件](https://reactjs.org/docs/forms.html#controlled-components)，外部状态被用作“单一真实来源”，允许插入自定义逻辑来修改默认组件行为

```jsx
import React, { useState } from "react";
import { Counter } from "./Counter";

function Usage() {
  const [count, setCount] = useState(0);

  const handleChangeCounter = (newCount) => {
    setCount(newCount);
  };
  return (
    <Counter value={count} onChange={handleChangeCounter}>
      // ...
    </Counter>
  );
}

export { Usage };
```

### 优点

- 给予更多控制

### 缺点

- 使用起来复杂，需要写三处代码，`useState` `handleChange` `jsx`

### 标准

- 控制反转 2/4
- 集成复杂度 1/4

### 案例

[material-ui  rating](https://material-ui.com/zh/components/rating/#rating)



## 自定义 hooks

```jsx
import React from "react";
import { Counter } from "./Counter";
import { useCounter } from "./useCounter";

function Usage() {
  const { count, handleIncrement, handleDecrement } = useCounter(0);

  return (
    <>
      <Counter value={count}>
        <Counter.Decrement onClick={handleDecrement} />
        <Counter.Increment onClick={handleIncrement} />
      </Counter>
    </>
  );
}

export { Usage };
```

### 优点

- 给予更多的控制

### 缺点

- 实现复杂度较高，需要更好的理解组件的工作方式

### 标准

- 控制反转 2/4
- 集成复杂度 2/4

### 案例

[react-table](https://react-table.tanstack.com/docs/examples/basic)



## Props Getters Pattern

自定义 hook 提供了跟好的控制，但是使组件更难集成，用户必须处理大量本地hook。

改模式试图掩盖这种复杂性，

```jsx
import React from "react";
import { Counter } from "./Counter";
import { useCounter } from "./useCounter";

const MAX_COUNT = 10;

function Usage() {
  const {
    count,
    getCounterProps,
    getIncrementProps,
    getDecrementProps
  } = useCounter({
    initial: 0,
    max: MAX_COUNT
  });

  const handleBtn1Clicked = () => {
    console.log("btn 1 clicked");
  };

  return (
    <>
      <Counter {...getCounterProps()}>
        <Counter.Decrement icon={"minus"} {...getDecrementProps()} />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment icon={"plus"} {...getIncrementProps()} />
      </Counter>
      <button {...getIncrementProps({ onClick: handleBtn1Clicked })}>
        Custom increment btn 1
      </button>
      <button {...getIncrementProps({ disabled: count > MAX_COUNT - 2 })}>
        Custom increment btn 2
      </button>
    </>
  );
}

export { Usage };
```

### 优点

- 易用性，隐藏了复杂性，用户只需将正确的 getter 连接到对应的 jsx 上

### 缺点

- 缺乏可见性，抽象的 getters 不透明，用户必须得知道 getters 以及对应的参数，以其被修改后的影响

### 标准

- 控制反转 3/4
- 集成复杂度 3/4

### 案例

[downshift](https://github.com/downshift-js/downshift)

[react-table](https://react-table.tanstack.com/docs/examples/basic)



## state reducer parttern

代码类似于 custom hook pattern，除此之外还定义了 `reducer` 传递给 hook

```jsx
import React from "react";
import { Counter } from "./Counter";
import { useCounter } from "./useCounter";

const MAX_COUNT = 10;
function Usage() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "decrement":
        return {
          count: Math.max(0, state.count - 2) //The decrement delta was changed for 2 (Default is 1)
        };
      default:
        return useCounter.reducer(state, action);
    }
  };

  const { count, handleDecrement, handleIncrement } = useCounter(
    { initial: 0, max: 10 },
    reducer
  );

  return (
    <>
      <Counter value={count}>
        <Counter.Decrement icon={"minus"} onClick={handleDecrement} />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment icon={"plus"} onClick={handleIncrement} />
      </Counter>
      <button onClick={handleIncrement} disabled={count === MAX_COUNT}>
        Custom increment btn 1
      </button>
    </>
  );
}

export { Usage };
```

### 优点

- 给予了更多控制权

### 缺点

- 实现复杂
- 缺乏可见性，需要更好的理解组件内部逻辑

### 标准

- 控制反转 4/4
- 集成复杂度 4/4

## 总结

将控制权转移给用户越多，组件越远离 “即插即用”的思维方式


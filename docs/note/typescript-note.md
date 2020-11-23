# TypeScript 笔记



## 技巧

以对象的 key 作为类型



```typescript
const typeMap = {
    1: 'a',
    2: 'c',
    3: 'g',
}

type Typekey = keyof typeof typeMap
```


# JEST 笔记

## 常用命令

[Jest CLI Options](https://jestjs.io/docs/en/cli)



`jest watch` 监听 git 上改动的文件，每次修改会自动跑测试

## 一些特殊情况的测试

### 测试 `console.log`

```js
let originalLog = null

beforeEach(() => {
  originalLog = global.console.log
  global.console.log = jest.fn()
})

afterEach(() => {
  global.console.log = originalLog
})

// demo
test('console.log', () => {
  console.log('123')
  expect(global.console.log).toHaveBeenCalledWith('123')
})
```



## 模板

### 基础

```js
// 所有测试用例运行前
beforeAll(() => {});
// 所有测试用例运行后
afterAll(() => {});

// 每个测试运行前
beforeEach（() => {}）
// 每个测试运行后
afterEach（() => {}）


describe('模块:', () => {
  describe('模块1', () => {
    test('用例1', () => {
      assert.strictEqual(xxxx, xxxx)
    })
  })

  describe('模块2', () => {
    test('用例2', () => {
      assert.deepStrictEqual(isNumber(1), true)
    })
  })
})
```


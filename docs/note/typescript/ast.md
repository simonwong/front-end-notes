# ts-compiler API

```ts
/**
 * 创建一个ast转换器
 */
export const createTransformer =
  (
    callback: (node: ts.Node, context: ts.TransformationContext) => ts.Node
  ): ts.TransformerFactory<ts.SourceFile> =>
  context =>
  node =>
    visitNodes(node, context, callback)

export const transform = (
  text: string,
  transformers: ts.TransformerFactory<ts.SourceFile>[],
  scriptKind: ts.ScriptKind = ts.ScriptKind.TSX
) => {
  const ast = createAstNode(text, scriptKind)
  const newAst = ts.transform(ast, transformers)
  const printer = ts.createPrinter()
  return printer.printNode(ts.EmitHint.SourceFile, newAst.transformed[0], ast)
}
```





```ts
export const add: ts.TransformerFactory<ts.SourceFile> = (context) => (rootNode) => {
    function visit(node: ts.Node): ts.VisitResult<ts.Node> {
        const { factory } = context;

        // using the provided typeguard to narrow the node kind
        if (ts.isObjectLiteralExpression(node)) {
            return factory.updateObjectLiteralExpression(node, [
                    // include the existing properties
                    ...node.properties,
                    // add your generated property
                    factory.createPropertyAssignment(
                        factory.createIdentifier("bar"),
                        factory.createTrue()
                    )
                ]
            );
        }
        return ts.visitEachChild(node, visit, context);
    }

    return ts.visitNode(rootNode, visit);
};

```

## 方法简述

### ts

#### ts.forEach()

```ts
export const traverse = (node: ts.Node, callback: (node: ts.Node) => void) => {
  callback(node)
  node.forEachChild(node => traverse(node, callback))
}
```



#### ts.transform()

```ts
const sourceFile = ts.createSourceFile("", `
  const a = {
    c: 123,
    f: 546,
  } 
`, ts.ScriptTarget.ESNext, true)
const transformRes = ts.transform(sourceFile, [
  (context) => {
    return (node) => {
      const visitAst: ts.Visitor = (node) => {
        const { factory } = context;

        if (ts.isObjectLiteralExpression(node)) {
          const res = factory.updateObjectLiteralExpression(node, [
            factory.createPropertyAssignment(
              factory.createIdentifier("asd"),
              factory.createTrue(),
            ),
            factory.createPropertyAssignment(
              factory.createIdentifier("etert"),
              factory.createNumericLiteral(2341),
            ),
          ])
          return res
        }
        return ts.visitEachChild(node, visitAst, context)
      }
      return ts.visitNode(node, visitAst)
    }
  }
])
```

### ts.Node

#### `getText` 、 `getFullText` 

`getText` 会获取仅相关的字符串

`getFullText` 获取的字符串会包含空格

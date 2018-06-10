var ts = require('typescript')
console.log(123)
// https://ts-ast-viewer.com/
function myTrans(ctx) {
    const visitor = (node) => {
        // if (node.kind === ts.SyntaxKind.SourceFile) {
        //     return ts.visitEachChild(node, visitor, ctx)
        // }
        // if(node.kind === ts.SyntaxKind.FunctionDeclaration){
        //     return ts.visitEachChild(node, visitor, ctx)
        // }
        console.log(node.kind, node.getText(), node.getChildCount())
        if (node.kind === ts.SyntaxKind.AwaitExpression) {
            return asyncParse(node, ctx);
        }

        if (node.getChildCount()) {
            return ts.visitEachChild(node, visitor, ctx)
        }
        return node
    }
    return (sf) => {
        return ts.visitNode(sf, visitor)
    }
}

function asyncParse(node, ctx) {
    return ts.visitEachChild(node, (node) => {
        if (node.kind === ts.SyntaxKind.CallExpression &&
            node.getChildAt(0).kind === ts.SyntaxKind.ImportKeyword) {
            const path = node.getChildAt(2).getText();
            const testNode = ts.createNew(
                ts.createIdentifier('Promise'),
                null,
                [ts.createArrowFunction(
                    [], [],
                    [ts.createParameter([], [], null, 'resolve',null, null)],
                    null,
                    null,
                    ts.createCall( ts.createIdentifier('require.ensure'),null,[
                        ts.createIdentifier('[]'),
                        ts.createArrowFunction([],[],
                            [ts.createParameter([], [], null, 'resolve',null, null)],
                            null, null,
                            ts.createCall(ts.createIdentifier('require'),null, ts.createLiteral('"./widget"'))),

                    ])
                )]
            );
            const lit =  ts.createArrowFunction(
                [], [],
                [ts.createParameter([], [], null, 'resolve',null, null)],
                null,
                null,
                ts.createLiteral('test')
            )

            //const testNode = ts.createLiteral('require("./widget")')
            return testNode;
        }
    }, ctx);
}

export default myTrans;

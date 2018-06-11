const path = require("path");

module.exports = {
    entry: "./src/main.ts",

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },

    resolve: {
        extensions: [".js", ".ts"]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                include: path.join(__dirname, "src"),
                loader: "ts-loader",
                options: {
                    getCustomTransformers: () => ({ before: [myTrans] })
                }
            }
        ]
    },

    devServer: {
        contentBase: "./dist"
    }
};

var ts = require("typescript");
// https://ts-ast-viewer.com/
// https://github.com/mariusschulz/typescript-webpack-dynamic-import demo
function myTrans(ctx) {
    const visitor = node => {
        // if (node.kind === ts.SyntaxKind.SourceFile) {
        //     return ts.visitEachChild(node, visitor, ctx)
        // }
        // if(node.kind === ts.SyntaxKind.FunctionDeclaration){
        //     return ts.visitEachChild(node, visitor, ctx)
        // }
        console.log(node.kind, node.getText(), node.getChildCount());
        if (ts.isImportCall(node)) {
            return asyncParse(node, ctx);
        }

        if (node.getChildCount()) {
            return ts.visitEachChild(node, visitor, ctx);
        }
        return node;
    };
    return sf => {
        return ts.visitNode(sf, visitor);
    };
}

function asyncParse(node, ctx) {
    if (ts.isImportCall(node)) {
        console.log('isImportCall')
        const path = node.getChildAt(2).getText();
        const testNode = ts.createNew(ts.createIdentifier("Promise"), null, [
            ts.createArrowFunction(
                [],
                [],
                [ts.createParameter([], [], null, "resolve", null, null)],
                null,
                null,
                ts.createCall(ts.createIdentifier("require.ensure"), null, [
                    ts.createIdentifier("[]"),
                    ts.createArrowFunction(
                        [],
                        [],
                        [
                            ts.createParameter(
                                [],
                                [],
                                null,
                                "require",
                                null,
                                null
                            )
                        ],
                        null,
                        null,
                        ts.createCall(
                            ts.createIdentifier("resolve"),
                            null,
                            [
                                ts.createIdentifier(
                                    node.getText().replace("import", "require")
                                )
                            ]
                            // [ts.createCall(ts.createIdentifier('require'), null, [ts.createIdentifier(path)])]
                        )
                    )
                ])
            )
        ]);

        //const testNode = ts.createLiteral('require("./widget")')
        return testNode;
    }
    return node;
}

function simple() {
    new Promise(resolve => {
        require.ensure([], require => {
            resolve(require("./widget"));
        });
    });
}

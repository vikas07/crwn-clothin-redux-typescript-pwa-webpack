const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, //RegEx for all Ts, Tsx and Js Jsx files.
                exclude: /node_modules|\.d\.ts$/, //We don't want to run or build any node modules code.
                use: {
                    loader: 'ts-loader',
                    options: {
                    compilerOptions: {
                    noEmit: false, // this option will solve the issue
                   },
                  },
                },
            },
            {
                test: /\.(js|jsx)$/, //RegEx for all Ts, Tsx and Js Jsx files.
                exclude: /node_modules/, //We don't want to run or build any node modules code.
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }          
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
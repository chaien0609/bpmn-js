const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundled.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/index.html', to: '.' },
                { from: 'src/style.css', to: '.' }
            ]
        })
    ],
    mode: 'development',
    devtool: 'source-map'
};

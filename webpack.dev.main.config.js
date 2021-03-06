const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const configurationMain = {
    entry: {
        main: path.resolve(__dirname, 'src', 'main', 'main.ts'),
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        //filename: '[name].[hash].js',
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true, // Does not perform type check but speeds up the hot reload.
                    },
                },
            },
        ],
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    mode: 'development',
    target: 'electron-main',
    //devtool: 'source-map',
    devtool: 'eval-cheap-source-map',

    plugins: [new CleanWebpackPlugin()],
}

module.exports = configurationMain

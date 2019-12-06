const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'

const externals = {
    react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
    },
    'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
    }
}

let webpackConfig = {
    entry: IS_DEV ? './Example.tsx' : './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },

            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'scoped-css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        IS_DEV &&
            new HtmlWebpackPlugin({
                template: './index.html'
            })
    ].filter(x => x)
}

if (!IS_DEV) {
    webpackConfig = {
        ...webpackConfig,
        externals
    }
}

module.exports = webpackConfig

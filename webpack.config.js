/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build/firefox');

const views = [ 'sidebar', 'browser_action' ];

module.exports = {
    entry : {
        background : path.join(srcPath, 'background', 'index.js'),
        ...views.reduce((prev, curr) => ({
            ...prev,
            [curr] : path.join(srcPath, curr, 'index.js')
        }), {})
    },
    output : {
        path : buildPath
    },
    module : {
        rules : [
            {
                test    : /\.js$/,
                exclude : /node_modules/,
                use     : [
                    'babel-loader'
                    // {
                    //     loader  : 'eslint-loader',
                    //     options : {
                    //         emitWarning : true
                    //     }
                    // }
                ]
            },
            {
                test    : /\.scss$/,
                exclude : /node_modules/,
                use     : [
                    'style-loader',
                    {
                        loader  : 'css-loader',
                        options : {
                            modules : true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test    : /\.css$/,
                exclude : /node_modules/,
                use     : [
                    'style-loader',
                    {
                        loader  : 'css-loader',
                        options : {
                            modules : true
                        }
                    }
                ]
            },
            {
                test   : [ /\.html$/, /\.svg$/ ],
                loader : 'underscore-template-loader'
            }
        ]
    },
    plugins : [
        new webpack.DefinePlugin({
            BROWSER : JSON.stringify('firefox')
        }),
        new CopyPlugin({
            patterns : [
                ...views.map(name => ({
                    from : path.join(srcPath, name, 'index.html'),
                    to   : `${name}.html`
                })),
                {
                    from : path.join(srcPath, 'manifest.json'),
                    to   : 'manifest.json'
                },
                {
                    from : path.join(__dirname, 'lib'),
                    to   : 'lib'
                },
                {
                    from : path.join(srcPath, 'icons/main'),
                    to   : 'icons'
                }
            ]
        })
    ]
};

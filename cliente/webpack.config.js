var path = require('path');
var fs = require ('fs')
var dir_js = path.resolve(__dirname, 'js')
var dir_css = path.resolve(__dirname, 'css')
module.exports = {
    //archivo "inicial" por el que se empieza a ver las dependencias
    entry: [
            path.resolve(dir_js,'main.js'),
            'webpack-dev-server/client?http://localhost:8443'
            ],
    //bundle construido por webpack, uniendo archivo inicial y dependencias
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        //"filtros" por los que pasa el código antes de generar el bundle
        loaders: [
            { 
                test: dir_js,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                } 
            },
            {
                test: dir_css,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devServer: {
        https: {
          key: fs.readFileSync('./security/ca.key'),
          cert: fs.readFileSync('./security/ca.crt')
        }
    },
    //para que podamos hacer debug sobre nuestro código original
    //aunque el navegador esté ejecutando el bundle
    devtool: 'source-map'
}

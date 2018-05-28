const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
    	pyessv: './src/index.js'
    },
    output: {
        filename: 'pyessv.js',
        path: path.resolve(__dirname, 'bin'),
        library: "PYESSV",
        libraryTarget: "umd"
    },
    plugins: []
};

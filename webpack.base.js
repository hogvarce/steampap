const path = require('path');

module.exports = {
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx', '.css'],
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
            '@': `${__dirname}/src`,
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-0'
                    ],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

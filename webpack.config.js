const path = require('path');

module.exports = (env) => {
    const isProd = env === "production";

    return {
        entry: ["@babel/polyfill" ,"./client/index.js"],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    use: ['style-loader', 'css-loader'],
                    test: /\.css$/,
                    exclude: /node_modules/
                }
            ]
        },
        devtool: isProd ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }


}

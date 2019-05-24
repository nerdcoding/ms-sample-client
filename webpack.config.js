const webpack = require('webpack');
const path = require('path');
const fs= require('fs');
const dotenv = require('dotenv');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    checkEnvironmentVariable(env);
    // Load environment config file
    const configFile = path.join(__dirname) + '/.env.' + env.ENVIRONMENT;
    checkEnvironmentConfigFile(env, configFile);

    const defaultWebpackConfig = createDefaultWebpackConfig(configFile);
    if (env.ENVIRONMENT === 'dev') {
        // Generate map file (for debugging)
        defaultWebpackConfig.devtool = 'source-map';
    } else {
        // Uglify generated javascript
        defaultWebpackConfig.optimization = {
            minimize: true
        }
    }

    return defaultWebpackConfig;
};

function createDefaultWebpackConfig(configFile) {
    return {
        entry: ['./app/src/index.js'],
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js',
            publicPath: '/'
        },
        devServer: {
            // 'webpack-dev-server' will redirect all 404s to 'publicPath'.
            historyApiFallback: true
        },
        module: {
            rules: [

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'img',
                            },
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./app/index.html",
                filename: "./index.html"
            }),
            // Configure all environment variables from the configFile as global constants into the compiled webpack bundle.
            new webpack.DefinePlugin(
                readEnvVariablesFromConfigFile(configFile)
            ),
            new CopyWebpackPlugin([
                {from:'app/img',to:'img'}
            ]),
        ]
    }
}


function checkEnvironmentVariable(env) {
    if (!env || !env.ENVIRONMENT) {
        console.error("***************************************************************************************************");
        console.error("* Webpack build must be started with the 'env.ENVIRONMENT' variable (e.g. --env.ENVIRONMENT=dev). *");
        console.error("***************************************************************************************************");
        process.exit(1);
    }
}

function checkEnvironmentConfigFile(env, configFile) {
    if (!fs.existsSync(configFile) ) {
        console.error("********************************************************************************************************");
        console.error("* env.ENVIRONMENT is parameterized with '"
            + env.ENVIRONMENT
            + "' but there exists no config file with the name '.env."
            + env.ENVIRONMENT
            + "' *");
        console.error("********************************************************************************************************");
        process.exit(1);
    }
}

function readEnvVariablesFromConfigFile(configFile) {
    const fileEnv = dotenv.config({ path: configFile }).parsed;

    return Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});
}
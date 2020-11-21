const API_URL = {
    production: JSON.stringify('https://iotShowcaseFunctions.azurewebsites.net'),
    development: JSON.stringify('https://localhost:8081')
};

// check environment mode
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'production';
module.exports = {
    publicPath: '/iotgame/',
    devServer: {
        port: 8081,
        https: true,
        proxy: {
            '^/api': {
                'target': 'https://iotShowcaseFunctions.azurewebsites.net',
                'ws': true,
                'changeOrigin': true
            }
        }
    },
    "chainWebpack": (config) => {
        config.plugin('define').tap((definitions) => {
            definitions[0]['API_URL'] = API_URL[environment];
            return definitions;
        });
    }
};




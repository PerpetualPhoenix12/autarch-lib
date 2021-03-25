const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        host: '192.168.0.24',
        port: 8080,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://localhost:4000' /* Development proxy */
            }
        }
    }
}
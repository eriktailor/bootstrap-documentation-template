const path = require('path');
import autoprefixer from 'autoprefixer'

export default {
    base: './',
    root: path.resolve(__dirname, 'src'),
    build: {
        outDir: '../dist',
    },
    server: {
        port: 8080,
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer({}) // add options if needed
            ],
        }
    }
};


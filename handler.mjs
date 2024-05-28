import {fileURLToPath} from "node:url";
import * as path from "node:path";
import module from 'node:module'
import {config as nextConfig} from '../required-server-files.json'

const require = module.createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const dir = path.join(__dirname)

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

const hostname = process.env.HOSTNAME || '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)

require('next')
const {startServer} = require('next/dist/server/lib/start-server')

if (
    Number.isNaN(keepAliveTimeout) ||
    !Number.isFinite(keepAliveTimeout) ||
    keepAliveTimeout < 0
) {
    keepAliveTimeout = undefined
}

export async function handleHttpInit(context) {
    console.log('init', performance.now());

    return startServer({
        dir,
        isDev: false,
        config: nextConfig,
        hostname,
        port: parseInt(context.applicationPort, 10),
        allowRetry: false,
        keepAliveTimeout,
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

export async function handleHttpRequest(request, context) {
    console.log('request start', performance.now());
    await context.initPromise;
    console.log('init done', performance.now());
    const requestUrl = new URL(request.url);

    console.log('http://localhost:' + context.applicationPort + requestUrl.pathname + requestUrl.search);
    return fetch('http://localhost:' + context.applicationPort + requestUrl.pathname + requestUrl.search, request)
        .then(resp => {
            console.log('request end', performance.now());
            return resp
        });
}

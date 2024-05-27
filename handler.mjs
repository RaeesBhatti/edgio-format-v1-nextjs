import * as child_process from "node:child_process";
import {fileURLToPath, pathToFileURL} from "node:url";
import * as path from "node:path";
import * as util from "node:util";

export async function handleHttpInit(event, context) {
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    console.log("Current directory is", currentDir);
    const serverFilePath = path.join(currentDir, "server.js");
    console.log("Starting server at", serverFilePath);

    const spawnedProcess = child_process.spawn(`node`, [serverFilePath], {env: process.env, stdio: ['ignore', 'pipe', 'pipe']});
    spawnedProcess.unref();
    return new Promise((resolve, reject) => {
        spawnedProcess.stdout.on('data', (data) => {
            console.log(data.toString());
            if (data.toString().includes('Ready in')) {
                resolve();
            }
        });
        spawnedProcess.stderr.on('data', (data) => {
            console.error(data.toString());
            reject();
        });
    })
}

export async function handleHttpRequest(request, context) {
    await context.initPromise;
    const requestUrl = new URL(request.url);

    console.log('http://localhost:' + context.applicationPort + requestUrl.pathname + requestUrl.search);
    return fetch('http://localhost:' + context.applicationPort + requestUrl.pathname + requestUrl.search, request);
}

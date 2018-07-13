'use strict';
const FdfsClient = require("fdfs");
var debug = require('debug')('fdfs');
const fs = require("fs");
const path = require("path");
let client = null;
let config = {
    // tracker servers
    trackers: [
        {
            host: '192.168.0.244',
            port: 9091
        }
    ],
    logger: {
        log: debug
    },
    // 默认超时时间10s
    timeout: 10000,
    // 默认后缀
    // 当获取不到文件后缀时使用
    defaultExt: 'txt',
    // charset默认utf8
    charset: 'utf8'
}

class fdfs {
    constructor(config){
        if(!client){
            client = new FdfsClient(config);
        }
        this.client = client;
    }
    async upload(filepath, filename, res){
        let ext = path.extname(filename);
        if(ext[0] == '.'){
            ext = ext.substr(1);
        }
        const fileId = await this.client.upload(filepath,{ext});
        fs.unlinkSync(filepath);
        return fileId;
    }
    
    async download(fileId){
        const filename = fileId.split("/").pop();
        const filepath = path.resolve(__dirname,'./',filename);
        console.log(filepath);
        await this.client.download(fileId,filepath);
        return {filepath,filename};
    }
}
module.exports = new fdfs(config)
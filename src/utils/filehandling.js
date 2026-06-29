import path from 'path';
import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readFileData(filename) {
 try{
    const filepath = path.join(__dirname,'../','data',filename);
    const jsonData = await fs.readFile(filepath,'utf-8');
    return JSON.parse(jsonData);
 }   
 catch(error){
    console.log(error.message);
 } 
}

async function writeFileData(filename,data) {
   
    try{
        const filepath = path.join(__dirname,'../','data',filename);
        await fs.writeFile(filepath,JSON.stringify(data,null,2));
    }catch(error){
        console.log(error.message);
    }
    
}

export {readFileData,writeFileData};
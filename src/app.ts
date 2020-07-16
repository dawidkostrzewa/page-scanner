import Observer from './Observer';
import Task from './Task';
import path = require('path');
import * as  fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

(() => {
  console.log("START");

  let rawdata = JSON.parse(fs.readFileSync(`${path.dirname(__filename)}/urls.json`) as any);
  let urlsData = rawdata.urls; 
  console.log(urlsData)

  urlsData.forEach(url => {    
    new Task(new Observer(url.url, url.name).checkWebChange);
  });
})()


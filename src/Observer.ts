import puppeteer from 'puppeteer';
import * as  fs from 'fs';
import Notifier from './Notifier';

class Observer {
    public url: string;
    public fileName: string
    constructor(url: string, filename: string) {
        this.url = url;
        this.fileName = filename;
        this.checkWebChange = this.checkWebChange.bind(this);
        
        console.log(`Start watching ${url}`)
    }

    public async checkWebChange() {
        console.log(`Checking ${this.url}`)
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto(this.url);

        let prevHtml = null;

        await fs.readFile(this.fileName, async (err, data) => {
            prevHtml = data;
            const currentHtml = await page.evaluate(() => document.body.innerHTML);

            if (prevHtml != currentHtml) {
                console.log(`CHANGE DETECKED in url ${this.url}! Time ${new Date()}`);
                await Notifier.sendNotification(this.url);
                await fs.writeFile(this.fileName, currentHtml, (err) => console.log(err));
            }
            
            await browser.close();
            
        })

        

       
    }


}

export default Observer;
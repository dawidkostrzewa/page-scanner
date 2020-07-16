import * as cron from 'node-cron';

class Task {
    constructor(run: Function) {
        cron.schedule("0 */15 * * * *", () => run())
    }
}

export default Task;
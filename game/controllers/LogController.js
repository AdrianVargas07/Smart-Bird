import fs from 'fs';
import path from 'path';

class LogController {
  constructor(filename = 'log.tsv') {
    this.filename = path.join(process.cwd(), filename);
  }

  append(message, type = 'info', category = '') {
    fs.appendFile(this.filename, `${type}\t${category}\t${message}\n`, (error) => {
      if (error) {
        console.error(error.toString());
      }
    });
  }

  logHttpRequest(req, res, next) {
    const message = `${req.method} - ${req.url}`;

    this.append(message, 'info', 'http');
    next();
  }
}

const log = new LogController();
export default log;

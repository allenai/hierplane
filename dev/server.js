'use strict';

const chalk = require('chalk');
const express = require('express');
const morgan =  require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(morgan('combined'));
app.use(express.static(__dirname));

const dataDir = path.resolve(__dirname, 'data');
app.get('/api/samples', (req, res) => {
  fs.readdir(dataDir, (err, files) => {
    // We load all of the files into a single response. If this ever gets too huge, we'll
    // need to send a dictionary back to the client and enable the actual JSON to be
    // queried on-demand. It'd also be better would be to stream things to the client, but that's
    // all overkill at this point.
    Promise.all(
      files.map(file => new Promise((resolve, reject) => {
        fs.readFile(
          path.resolve(__dirname, 'data', file),
          'utf-8',
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              try {
                resolve(JSON.parse(data));
              } catch (err) {
                reject({
                  message: `error parsing ${file}`,
                  cause: err.toString()
                });
              }
            }
          }
        );
      }))
    ).then(samples => {
      // It's kind of weird that we have to convert these from and back to JSON, but it allows
      // us to take advantage of express' built in `json()` API.
      res.json(samples);
    }).catch(err => {
      res.status(500).json(err);
    });
  });
});

const port = process.env.HIERPLANE_DEV_SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`listening at ${chalk.blue(`http://localhost:${port}`)}`);
});

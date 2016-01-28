import pdftohtml from 'pdftohtmljs'
import fs from 'fs'

export default (file) => {

  return new Promise((resolve, reject) => {

    let destination = '/tmp/'+Date.now()+'/';
    let converter = new pdftohtml(file);
    converter.add_options([
      '--dest-dir '+destination,
      '--split-pages 1',
      '--embed-css 0',
      '--page-filename %d.page',
      '--css-filename custom.css',
      '--hdpi 96',
      '--vdpi 96',
      '--bg-format jpg']);

    converter.convert()
    .then(() => {
      return readFiles(destination);
    })
    .then((pages) => {
      resolve(pages);
    });

  });

}

function readFiles(dirname) {

  return new Promise((resolve, reject) => {

    let pages = {};
    let css = {};

    fs.readdir(dirname, function(err, filenames) {
      if (err) { return reject(err); }

      let filesReaded = 0;

      filenames.forEach(function(filename, index) {
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
          if (err) { return reject(err) }

          if(filename.split('.')[1] == 'page'){
            pages[filename.split('.')[0]] = content;
          }

          if(filename.match(/\.css/)){
            css[filename.split('.')[0]] = content;
          }

          filesReaded += 1;

          if(filenames.length == filesReaded){
            let sortedPages = [];

            let sortedKeys = Object.keys(pages).sort((a, b) => {
              return parseInt(a) - parseInt(b);
            });

            sortedKeys.forEach((key) => {
              sortedPages.push(pages[key]);
            });

            let sortedCSS = [css['base'], css['fancy'], css['custom']];

            resolve({pages:sortedPages, css: sortedCSS});
          }
        });
      });

    });
  });

}
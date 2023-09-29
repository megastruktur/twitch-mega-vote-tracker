const fs = require('fs');

// Recursive function to get files
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
}

const files = getFiles("build")

files.forEach((file) => {
  // file example: build/video/fullscreen.html
  // If the file is *.html do strip the <script> tags

  if (file.endsWith(".html")) {
    // Take the path of the file
    const split = file.split("/")
    const filename = split.pop().split(".")[0] // Remove the filename, leaving the dir path only and store the filename in const
    const dirname = split.join("/")
    const jsFilenameToSave = `${dirname}/${filename}.js`;

    // Check for inline scripts inside
    const regularExpression = /<script>([\s\S]+)<\/script>/;
    const buffer = fs.readFileSync(file);
    const fileContent = buffer.toString();

    let content = fileContent.replace(regularExpression, (match, content) => {

      // console.log(match)
      // console.log(content)


      let scriptToWrite = `window.onload = function() ${content}`
      // Adding some tweaks to script
      scriptToWrite = scriptToWrite.replace(/__sveltekit_.* = {/,
        (match, content) => {
          return `let ${match}`
        }
      );
      scriptToWrite = scriptToWrite.replace("document.currentScript.parentElement", "document.body");

      // Save the script to the file
      fs.writeFileSync(jsFilenameToSave, scriptToWrite);
      return `<script type="module" src="./${filename}.js"></script>`

    });
    // Update the HTML
    fs.writeFileSync(file, content);
  }



})

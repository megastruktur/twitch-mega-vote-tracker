// import fs from "fs"

// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {

  
//   const response = await resolve(event, {
//     transformPageChunk: ({html}) => {
//       const regularExpression = /<script>([\s\S]+)<\/script>/;

//       const found = html.match(regularExpression);
      
//       let filename = event.url.pathname.split("/").pop();

//       if (!filename) {
//         filename = "index"
//       }

//       if (found !== undefined && found[1] !== undefined) {
//         // write the found script to file system
//         const hash = stringToHash(found[1]);
//         const jsFilenameToSave = `./static/boot/${filename}.js`;
//         let scriptToWrite = `window.onload = function() ${found[1]}`

//         // Adding some tweaks to script
//         scriptToWrite = scriptToWrite.replace(/__sveltekit_.* = {/,
//           (match, content) => {
//             return `let ${match}`
//           }
//         );

//         scriptToWrite = scriptToWrite.replace("document.currentScript.parentElement", "document.body");


//         fs.writeFileSync(jsFilenameToSave, scriptToWrite);

//         html = html.replace(found[0], `<script type="module" src="/boot/${filename}.js"></script>`);
//       }
//       return html;
//     },
//   })

//   return response
// }

// /**
//  * @param {string} string
//  */
// function stringToHash(string) {
             
//   let hash = 0;
   
//   if (string.length == 0) return hash;
   
//   for (let i = 0; i < string.length; i++) {
//       const char = string.charCodeAt(i);
//       hash = ((hash << 5) - hash) + char;
//       hash = hash & hash;
//   }
   
//   return hash;
// }

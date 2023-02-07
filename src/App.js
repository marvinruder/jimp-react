import { useState } from "react";

// With jimp@0.22.4: working
require("jimp/browser/lib/jimp.js");
const { Jimp } = window;

// With jimp@0.22.4: compiles, but throws error in browser (looks like #1191)
// import Jimp from "jimp";

// With jimp@0.22.4: does not compile. Some errors:
// > `Can't resolve 'fs' in '/Users/mruder/git-repos/jimp-react/node_modules/@jimp/core/es'`
// > `Can't resolve 'path' in '/Users/mruder/git-repos/jimp-react/node_modules/@jimp/core/es'`
// > `Can't resolve 'util' in '/Users/mruder/git-repos/jimp-react/node_modules/pngjs/lib'`
// > `Can't resolve 'stream' in '/Users/mruder/git-repos/jimp-react/node_modules/pngjs/lib'`
// > `Error: ENOENT: no such file or directory, open '/Users/mruder/git-repos/jimp-react/node_modules/@jimp/core/node_modules/mkdirp/…`
// > `BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.`
// > `This is no longer the case. Verify if you need this module and configure a polyfill for it.`

// import Jimp from "jimp/es";

console.log(Jimp);

export default function App() {
  const [base64Image, setBase64Image] = useState("");
  const imageUrl = "https://i.imgur.com/yXOvdOSs.jpg";
  Jimp.read(imageUrl)
    .then(function (img) {
    return img
      .resize(32, 32) // resize
      .quality(20) // set JPEG quality
      .greyscale() // set greyscale
      .mirror(true, false) // flip vertically
      .getBase64Async(Jimp.MIME_JPEG)
      .then(function (base64) {
        setBase64Image(base64);
      });
  }).catch(function (err) {
      console.error(err);
  });

  return (
    <img src={base64Image} />
  )
}
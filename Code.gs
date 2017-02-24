/*
 * The MIT License
 * 
 * Copyright (c) 2017 This is a google apps test page.
 *
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/


/*
 The test is an exercise in 
1) executing a Google Apps Script, 
2) JQuery Rich Text Editor RTE, 
3) overriding a RTE function, allowing only a fixed reduced size image in the RTE content,
4) saving the image on google drive as a html reference for the content
5) saving the content
6) selecting and retrieving the content
7) using a Google spreadsheet as a database


*/


var upload_folder = "/Projects/file upload";



/**
 * Return an array of up to 20 filenames contained in the
 * folder previously specified (or the root folder by default).
 *
 * @param {String} folderId String ID of folder whose contents
 *     are to be retrieved; if this is 'root', the
 *     root folder is used.
 * @return {Object} list of content filenames, along with
 *     the root folder name.
 */


function doGet(e) {

 var app = HtmlService.createHtmlOutputFromFile('index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return app;

}

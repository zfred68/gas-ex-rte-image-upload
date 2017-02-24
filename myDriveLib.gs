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

//========================================================================
//
// getBasefolder( "/Folder A/Folder B/ Folder C" , doCreate)
//
// returns the last folder in the path 
// if  doCreate == true, and folder does not exist, create it
//
// or throws exception
//
//
// 
// 
//
// @param {String} path String of folder path 
// @param {bool}   doCreate 
//
// @return {Object} folder object of last parth found
//                  otherwise throw exception  
//

function getBasefolder(path,doCreate) {
 // Remove extra slashes and trim the path
  var fullpath = path.replace(/^\/*|\/*$/g, '').replace(/^\s*|\s*$/g, '').split("/");
   // Always start with the main Drive folder
  var folder = DriveApp.getRootFolder();
  var rootname = folder.getName();
  var nfullpathFolders = fullpath.length-1;
  var n;
  var subfolder;
  
  for (subfolder in fullpath) {
    var name = fullpath[subfolder];
    var folders = folder.getFoldersByName(name);
 
    // If folder does not exist, exit
    while(folders.hasNext()) {
      folder= folders.next();
      n = folder.getName();
      var i = Number(subfolder);
      if(n==name) {             
        if(Number(subfolder) == nfullpathFolders)
          return folder;
        break;
      }
    }
  }
  if(doCreate ==true) {
     // last folder
     var newfolder =folder.createFolder(fullpath[subfolder]);
     return newfolder;
  }
  throw "bad path";
}


//==========================================================
//
//
//
// Return spreadsheet object as named in the given folder
//
//
//
// @param {string} sheetname String of folder path 
// @param {string} foldername 
//
// @return {Object} spreadsheet object
//                  otherwise throw exception  
//
function getDriveSpreadsheet(sheetname,foldername) {
 
  var folder;
  var files;
  var found=0;
  var file;
  if(foldername) {
  
     folder = getBasefolder(foldername,false);
     files = folder.getFilesByName(sheetname);
     
     while (files.hasNext()) {
       file = files.next();
       Logger.log('name:'+file.getName()+' id:'+file.getId()+' type:'+file.getMimeType()+' url:'+file.getUrl());
       if(file.getName() == sheetname) {
          found=1;
          break;
       }
     }

  }  else {
  
     files = DriveApp.getFilesByName(sheetname);
     
  
     while (files.hasNext()) {
       file = files.next();
       Logger.log('name:'+file.getName()+' id:'+file.getId()+' type:'+file.getMimeType()+' url:'+file.getUrl());
       var folders = file.getParents();
       var folder;
       do {
       while (folders.hasNext()) {
         folder = folders.next();
         Logger.log('folder:'+folder.getName()+' url:'+folder.getUrl());  
         if(folder.getName()=="My Drive") {
            Logger.log('name matched "My Drive"');
            found=1;
            break;
         }
       }   
       }while (found==0 &&(folders=folder.getParents())!=null);
    }
  }
  if(found==1) {
    var ss = SpreadsheetApp.open(file);
    return ss;
  }
  
  throw "no Spreadsheet";
}
//==================================================================================

function testgds() {

var FOLDER ="/Projects/online-registration";
var SHEETFILE = 'on-line-member-request';


var folder = getBasefolder(FOLDER,false);
var name = folder.getName();

var ss = getDriveSpreadsheet(SHEETFILE,FOLDER);

Logger.log("ss name:"+ss.getName());


}


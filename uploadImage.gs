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
// ==========================================================================
//
// web service processing form result
// for uploading a image
//
//
//
// @param {String} theForm 
//   theForm is form <input> data for image file name
//                                    the image blob
//                                    the image type
//
// @return {Object} returns the image as a <img> element
//                   
//
// 
// example:
// <img src="https://docs.google.com/uc?id=0B1W9KnZUUDR5NEVMZ0Qzc09UMk0">
//
//
function processImageForm(theForm) {
 
 var upfolder = getBasefolder(upload_folder);
  
 var filename = theForm.imagefile_name;
 var imagefileEncoded = theForm.imagefile;
 var imagefileEncoded2 = imagefileEncoded.replace("data:image/jpeg;base64,","");
 
 var byteCharacters = Utilities.base64Decode(imagefileEncoded2);

 var contentType="image/jpeg";
 
 var fileBlob = Utilities.newBlob(byteCharacters,  contentType, filename);
   
   
  //Logger.log("fileBlob typeof:"+ typeof(fileBlob));
  //Logger.log("fileBlob Name: " + fileBlob.getName());
  //Logger.log("fileBlob type: " + fileBlob.getContentType());
  //Logger.log('fileBlob: ' + fileBlob);


  //
  // if the same file is found already uploaded, return that one
  // the uploaded files will never be deleted
  //
  // simple comparison based on name and size
  //
  //
  var file;
  
  var files = upfolder.searchFiles("title = \"" + filename+"\"");
  while (files.hasNext()) {
   file = files.next();
   var sz  = file.getSize();
   var sz2 = fileBlob.getBytes().length;
   //Logger.log(file.getName() + ' size '+ sz + ' == ? ' + sz2);
   if(sz == sz2) {
     var id = file.getId();
     return "https://docs.google.com/uc?id="+id;
   }
 }
 

  file =  upfolder.createFile( fileBlob);
  file.setName(filename);
  var id = file.getId();
  //return '<img src="https://docs.google.com/uc?id='+id+'">';
  return "https://docs.google.com/uc?id="+id;    
}

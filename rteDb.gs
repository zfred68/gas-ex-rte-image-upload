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


var DATABASE_SHEET = 'test-rte-db';
var SHEET_NAME = 'test-rte-db';

var fields = [ 
  ["timeStamp","timestamp"],
  ["dateTime","datetime"],
  ["class","text"],
  ["eventId","number"],
  ["description","text"]
];

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

function EventRecord_(t) {  
  if(t instanceof EventRecord_) {
    this.timeStamp=t.timeStamp;
    this.Date=t.Date;
    this.title=t.title;
    this.description=t.description;
    this.sheet=t.sheet;
  } else {
    this.timeStamp = undefined;
    this.Date="";
    this.title="";
    this.description="";
  }
  

  this.dbInit = function (sheet) {
    var rowdata = [];
    var lastRow = sheet.getLastRow();
    this.sheet = sheet;
    
    if(lastRow==0) {
      for(var key in this) {
        if(this.hasOwnProperty(key) && typeof this[key] !== 'function') { 
            rowdata.push(key);    	 
        } 
      }
      
      Logger.log('rowdata:'+rowdata);
      sheet.appendRow(rowdata);
      // Freezes the first row
      sheet.setFrozenRows(1);
      var cols = sheet.getLastColumn();
      var range = sheet.getRange(1,1,1,cols);
      range.setFontWeight("bold");
      for (var i=1; i<= cols; i++ ) {
          var cell =range.getCell(1,i);
         // cell.setFontWeight("bold");
 
      }
      Logger.log(sheet.getLastRow());
    }
  };
  
  this.lastRow = function() {
     return this.sheet.getLastRow();
  };
  
  this.setRow = function(formData) {
     
     for(var key in this) {
        if(this.hasOwnProperty(key) && typeof this[key] == 'function') 
          break;
        try {
            var value = getData(key,formData);   	 
            this[key] = value;
        }catch(err) {
           Logger.log('no field key '+key);
        }
        
      }
      
     var d = new  Date();
     this.timeStamp = Date.now();
     this.Date= d.toLocaleDateString();
     this.date_submittal = d.toLocaleDateString();
   
  };
  
  this.appendRow = function(sheet) {
      var rowdata = [];
      for(var key in this) {
        if(this.hasOwnProperty(key) && typeof this[key] == 'function') 
            break;
            
        rowdata.push(this[key]);    	 
        
      }
      Logger.log('rowdata:'+rowdata);
      sheet.appendRow(rowdata);
      Logger.log( sheet.getLastRow());
   
  };
  
  this.writeRow = function(rowno,sheet) {
        var cols = sheet.getLastColumn();
        var range = sheet.getRange(rowno,1,1,cols);
        var rowdata = [];
        var rowdatas = [];
        for(var key in this) {
          if(this.hasOwnProperty(key) && typeof this[key] == 'function') 
            break;
          rowdata.push(this[key]);    	         
        }
        rowdatas.push(rowdata);
        range.setValues(rowdatas);
        
//        var values = [   [ "2.000", "1,000,000", "$2.99" ]  ];
//        var range = sheet.getRange("B2:D2");
//        range.setValues(values);
 
//        sheet.insertRowAfter(rowno);
//        sheet.deleteRow(rowno);
  };
  
  this.existsRow = function(sheet) {
     var nrows = sheet.getLastRow();
     var range = sheet.getRange(1, 3, nrows, 1);
     var values = range.getValues();
     var title = this.title.toLowerCase();
     for (var row in values) {  
        var v = values[row][0].toLowerCase();
        if(values[row][0].toLowerCase() == title)
           return Number(row)+1;
     }
    return -1;
  };
  
  this.log = function() {
     var s="";
     for(var key in this) {
        if(this.hasOwnProperty(key) && typeof this[key] == 'function')
           break;
        
        s=s+" "+key+":"+this[key]+",";
     }
     Logger.log('record:'+s);
  };
  
  this.getRow = function ( rowNo, sheet) {
     var s = (sheet==undefined? this.sheet : sheet);
     var cols = s.getLastColumn();
     var maxrows = s.getLastRow();
     if(rowNo > maxrows) {
        throw "eof";
     }
     var range = s.getRange(rowNo, 1, 1,cols);
     var values = range.getValues();
     var icol=0;
     for(var key in this) {
        if(this.hasOwnProperty(key) && typeof this[key] == 'function')
            break;
            
        this[key] = values[0][icol];
        icol++;
        
     }
  };
  
  this.getRowWts = function (timestamp, sheet) {
     var s = (sheet==undefined? this.sheet : sheet);
     var cols = s.getLastColumn();
     var maxrows = s.getLastRow();
     var range = s.getRange(2, 1, maxrows, 1);
     var values = range.getValues();
     for (var row in values) {
        Logger.log('row '+row+ ' '+values[row][0]);
        if(values[row][0] == timestamp) {
            Logger.log('match');
            var nrow = Number(row)+2;
            this.getRow(nrow);
            break;
        }
     }
  }
  
  this.getCols = function( rowNo, colNames) {
     this.getRow(rowNo);
     var result = {};
     var acol=colNames.split(',');
     var aa;
     for(var a in acol) {
        var g=acol[a];
        var gg=this[g];
        result[g] = this[acol[a]];
        var ggo = '{ "' + g+'":"'+gg + '"}';
        //result.push('{'+g:this[acol[a]]+'}');
        //result.push(ggo)
        Logger.log('a '+a +' ' + acol[a]+' result['+g+']='+result[g]);
     }   
     return result;
  };
  
  this.jsonencode = function(optkey) { 
       var jk = "{";
       var ji=0;
       if(optkey!=undefined&&optkey!="") {
       
         var akeys = optkey.split(/\s*,\s*/);
         for(var key in akeys) {
            if(ji==1)
              jk=jk+",";
          
            jk=jk + '"'+key+'":"'+ this[key] + '"'; 
            icol++;
            ji=1;        
         }
         jk=jk+"}";
         return jk;            
       }l
       
       for(var key in this) {
        if(this.hasOwnProperty(key) && typeof this[key] == 'function')
            break;
        if(ji==1)
          jk=jk+",";
          
        jk=jk + '"'+key+'":"'+ this[key] + '"'; 
        icol++;
        ji=1;        
      }
      jk=jk+"}";
      return jk;   
  };
  // these properties private to class
  this.sheet=undefined;
 }
 /**=======================e==========================
 * getData( tag key,  formData
 * 
 * 
 * 
 *
 * @param {Object} tag   tag name of the form's field
 * @param {Object} formData - array of 'input' objects
 *      submission; 
 *      
 */

function getData(tag,formData) {
  
  var aa = formData.inputs;
  
  try {
    
  var l = aa.length;
  var i=0;
  for(;i<l;i++) {
    if(aa[i].name === tag) {
      if(aa[i].type == "checkbox") {
        if(aa[i].checked == true )
          return "Yes";
        else
          return "No"
      }
      return aa[i].value;
    }
  }
  }catch(err) { 
  Logger.log('no form input for: '+tag);
  }
  return undefined;
}

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

function process_savetoDbRte(formData) {
  var record = new EventRecord_();
  
  var ss = getDriveSpreadsheet(DATABASE_SHEET);
  var st = ss.getSheetByName(SHEET_NAME);

  var formdata = JSON.parse(formData);

  var title = getData('title',formdata);
  var desc  = getData('description',formdata);
  var timeStamp = getData('timeStamp',formdata);
  Logger.log('timestamp:'+timeStamp);
  
  record.dbInit(st);
  record.setRow(formdata);
  var nexisting= record.existsRow(st);
  if(nexisting > 0 ) {
     record.writeRow(nexisting,st);
  }else {
    record.appendRow(st);
  }
  Logger.log(  record.existsRow(st) );
  return "ok"
}
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

function processGetTitles() {
  var ss = getDriveSpreadsheet(DATABASE_SHEET);
  var st = ss.getSheetByName(SHEET_NAME);
  
  var record = new EventRecord_();
  record.dbInit(st);
  var arecords = [];
  var z= record.lastRow();
  
  for(var i=2,j=0; i<=z;i++,j++) {
   var aa = record.getCols(i,"timeStamp,title");
   Logger.log('i:'+i+' '+aa);
   arecords[j]=  aa;  
  }   
  
  return arecords;
}
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

function processGetNote(timestamp) {
  var ss = getDriveSpreadsheet(DATABASE_SHEET);
  var st = ss.getSheetByName(SHEET_NAME);
  
  var record = new EventRecord_();
  record.dbInit(st);
  record.getRowWts(timestamp,st)
  return record.description;

}
// ==========================================================================
function test_getdb() {
  var record = new EventRecord_();
  
  var ss = getDriveSpreadsheet(DATABASE_SHEET);
  var st = ss.getSheetByName(SHEET_NAME);

  record.dbInit(st);
  
}

var ii =
'{ "inputs":[{"name":"title","type":"text","value":"my first"},{"name":"description","type":"text","value":"blag&nbsp;%3Cimg%20src=%22https://docs.google.com/uc?id=0B1W9KnZUUDR5S3BYbWdzNEw4eDQ%22%3E%3Cdiv%3E%3…3Cli%3Effffffffffffff%3C/li%3E%3Cli%3E%3Cbr%3E%3C/li%3E%3C/ul%3E%3C/div%3E"}]}';


function test1() {
   process_savetoDbRte(ii);
}

function test2() {

  var record = new EventRecord_();
  var ss = getDriveSpreadsheet(DATABASE_SHEET);
  var st = ss.getSheetByName(SHEET_NAME);
 
  record.getRow(st,3);
  
  var record2 = new EventRecord_(record);
  
  record2.title='hh my change';
  
  record.log();
}

function test3() {
  var record = new EventRecord_();
  var ss = getDriveSpreadsheet(DATABASE_SHEET);
  var st = ss.getSheetByName(SHEET_NAME);

  record.dbInit(st);
  var z= record.lastRow();
  var a = [];
  for(var i=2,j=0; i<=z;i++,j++) {
   var r = new EventRecord_(record);
   r.getRow(i,st);
   a[j]=  r;  
  }   
  try {
  record.getRow(10,st);
  }catch(e) {
   Logger.log(e);
  }

  var aa = record.getCols(2,"timeStamp,title");
  var agetRowWtsas = JSON.stringify(aa);
  Logger.log('1st '+aas);
  
  var b = [];
  var ab = [];
  for(var i=2,j=0; i<=z;i++,j++) {
   var aa = record.getCols(i,"timeStamp,title");
   var as = JSON.stringify(aa)
   Logger.log('aa[title]='+aa["title"]);
   b[j]=  aa; 
   ab[j] = as;
   Logger.log('b[j]='+b[j]['title']);
  } 
  var s = JSON.stringify(ab)  
  Logger.log(s);
  
}

function test4() {

  var rr = [];
  
  rr["a"] = "alpha";
  rr["b"] = "beta";
  
  var rb = { "a":rr["a"], "b":rr["b"] };
  
  var rs = JSON.stringify(rr);
  
  var rbs = JSON.stringify(rb);
  Logger.log(rr);
}

function test5() {
  var record = new EventRecord_();
  var ss = getDriveSpreadsheet(DATABASE_SHEET);
  var st = ss.getSheetByName(SHEET_NAME);

  record.dbInit(st);

  record.getRowWts(148688755614,st)
  
  var nexisting= record.existsRow(st);
  if(nexisting > 0 ) {
     record.title=record.title + " rewrite";
     record.writeRow(nexisting,st);
  }else {
    record.appendRow(st);
  }
  
  record.log();
  
  Logger.log(record.description);
}
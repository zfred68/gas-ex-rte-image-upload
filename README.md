# gas-ex-rte-image-upload
example gas exercise in using jquery RTE,image resize and upload to google drive
and using a google spreadsheet as a database for the RTE content.

To replicate this project, go to your google drive and create a Google Apps Script 
file.
You might use the https://github.com/leonhartX/gas-github chrome add-in extension to
connect to this repository and pull in the code.
Otherwise just copy each file.

On google drive you need to create an 'upload folder' set as follows
code.gs
var upload_folder = "/Projects/file upload";

create a spreadsheet name set as follows


var DATABASE_SHEET = 'test-rte-db';
var SHEET_NAME = 'test-rte-db';

theincluded rte is from https://github.com/buntekuh/jquery-rte

but i had to make changes to it


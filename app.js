require('dotenv').config();
const fs = require('fs');
const path = require('path');

// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

const ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH = process.env.ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH;
const OS = process.env.OS; // Multi OS Support Comming Soon.... Right now only Android backup fix is supported

const AndroidLocalFilesMap = []; // Will hold all Android data built from backup to complete the backup process even though it failed.
const IOSLocalFilesMap = []; // Will hold all IOS data built from backup to complete the backup process even though it failed.

const SELECTED_OS_OUTPUT_AREA = OS === "ANDROID" ? AndroidLocalFilesMap : IOSLocalFilesMap;

// Loop through all the files in the backup directory
fs.readdir(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH, function (err, files) {
  if (err) {
    console.error("fs.readdir() -> Couldn't hit the directory =>", err);
    process.exit(1);
  }

  files.forEach(function (file, index) {
    // Make three passes and make the file complete
    var loopOneCurrentFileFolderCursor = path.join(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH, file);

    fs.stat(loopOneCurrentFileFolderCursor, function (error, stat) {
        if (error) {
            console.error("Error stating file.", error);
            return;
        }

        if (stat.isFile()) {
            console.log("Now -> @ '%s' -> file => ", loopOneCurrentFileFolderCursor);


        } else if (stat.isDirectory()) {
            console.log("Now -> @ '%s' -> directory =>", loopOneCurrentFileFolderCursor);
        }
    });
  });
});


// function handleAndroidFolder(err, arg) {
    
// }

// function handleMediaFolder(err, arg) {
    
// }

// function handleBackupsFolder(err, arg) {
    
// }

// function handleDatabasesFolder(err, arg) {
    
// }
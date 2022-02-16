require('dotenv').config();
const fs = require('fs');
const path = require('path');

// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

const ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH = process.env.ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH;
const MOBILEOS = process.env.MOBILEOS; // Multi OS Support Comming Soon.... Right now only Android backup fix is supported
const COMPUTEROS = process.env.COMPUTEROS; // Multi Host Computer OS Support Comming Soon.... Right now only Windows Can run the script

console.log("Selected OS is =>", MOBILEOS);

const AndroidLocalFilesMap = []; // Will hold all Android data built from backup to complete the backup process even though it failed.
const IOSLocalFilesMap = []; // Will hold all IOS data built from backup to complete the backup process even though it failed.

const SELECTED_OS_OUTPUT_AREA = MOBILEOS === "ANDROID" ? AndroidLocalFilesMap : IOSLocalFilesMap;

// Loop through all the files and folders in the backup directory
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
            console.error("Error stating file =>", error);
            return;
        }

        const loopOneCurrent = path.basename(loopOneCurrentFileFolderCursor);

        if (stat.isDirectory()) {
            console.log("Now -> @ '%s' => directory.", loopOneCurrentFileFolderCursor);
            console.log("About this directory =>", stat);

            if(loopOneCurrent === "Android") {
                fs.readdir(loopOneCurrentFileFolderCursor, function (err2, files2) {
                    if (err2) {
                        console.error("fs.readdir() -> Android Dir -> Couldn't hit the directory =>", err2);
                        process.exit(1);
                    }
                    
                    files2.reverse().forEach(function (file2, index2) {
                        var loopTwoCurrentFileFolderCursor = path.join(loopOneCurrentFileFolderCursor, file2);
                    
                        fs.stat(loopTwoCurrentFileFolderCursor, function (error2, stat2) {
                            if (error2) {
                                console.error("Error stating file =>", error2);
                                return;
                            }
                    
                            const loopTwoCurrent = path.basename(loopTwoCurrentFileFolderCursor);
                    
                            if (stat2.isFile()) {
                                console.log("Now -> @ '%s' => file.", loopTwoCurrentFileFolderCursor);
                            } else if (stat2.isDirectory()) {
                                console.log("Now -> @ '%s' => directory.", loopTwoCurrentFileFolderCursor);
                                console.log("About this directory =>", stat2);
                    
                                if(loopTwoCurrent === "Media") {
                                    fs.readdir(loopTwoCurrentFileFolderCursor, function (err3, files3) {
                                        if (err3) {
                                            console.error("fs.readdir() -> Media Dir -> Couldn't hit the directory =>", err3);
                                            process.exit(1);
                                        }
                                        
                                        files3.reverse().forEach(function (file3, index3) {
                                            var loopThreeCurrentFileFolderCursor = path.join(loopTwoCurrentFileFolderCursor, file3);
                                        
                                            fs.stat(loopThreeCurrentFileFolderCursor, function (error3, stat3) {
                                                if (error3) {
                                                    console.error("Error stating file =>", error3);
                                                    return;
                                                }
                                        
                                                const loopThreeCurrent = path.basename(loopThreeCurrentFileFolderCursor);
                                        
                                                if (stat3.isFile()) {
                                                    console.log("Now -> @ '%s' => file.", loopThreeCurrentFileFolderCursor);
                                                } else if (stat3.isDirectory()) {
                                                    console.log("Now -> @ '%s' => directory.", loopThreeCurrentFileFolderCursor);
                                                    console.log("About this directory =>", stat3);

                                                    if(loopThreeCurrent === "WhatsApp Voice Notes") {
                                                        
                                                    }
                    
                                                    if(loopThreeCurrent === "WhatsApp Video") {
                                                        
                                                    }

                                                    if(loopThreeCurrent === "WhatsApp Stickers") {
                                                        
                                                    }
                    
                                                    if(loopThreeCurrent === "WhatsApp Images") {
                                                        
                                                    }

                                                    if(loopThreeCurrent === "WhatsApp Documents") {
                                                        
                                                    }
                    
                                                    if(loopThreeCurrent === "WhatsApp Audio") {
                                                        
                                                    }
                    
                                                    if(loopThreeCurrent === "WhatsApp Animated Gifs") {
                                                        
                                                    }
                                        
                                                    if(loopThreeCurrent === "WallPaper") {
                                                        fs.readdir(loopThreeCurrentFileFolderCursor, function (err4, files4) {
                                                            if (err4) {
                                                                console.error("fs.readdir() -> Media Dir -> Couldn't hit the directory =>", err4);
                                                                process.exit(1);
                                                            }
                                                            
                                                            files4.forEach(function (file4, index4) {
                                                                var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4);
                                                            
                                                                fs.stat(loopThreeCurrentFileFolderCursor, function (error4, stat4) {
                                                                    if (error4) {
                                                                        console.error("Error stating file =>", error4);
                                                                        return;
                                                                    }
                                                            
                                                                    const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                                            
                                                                    if (stat4.isFile()) {
                                                                        console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                                                        SELECTED_OS_OUTPUT_AREA.push({
                                                                            "file_type":0,
                                                                            "ios_device_path":null,
                                                                            "domain":null,
                                                                            "local_path":`${ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH}\\Android\\Media\\WallPaper\\${loopFourCurrent}`,
                                                                            "an_device_path":`Media/WallPaper/${loopFourCurrent}`
                                                                         });

                                                                        console.log("loopFourCurrentFileFolderCursor -> WallPaper =>", SELECTED_OS_OUTPUT_AREA);
                                                                    }
                                                                });
                                                            });
                                                        });
                                                    }
                                                }
                                            });
                                        });
                                    });
                                }

                                if(loopTwoCurrent === "Backups") {
                                    
                                }

                                if(loopTwoCurrent === "Databases") {
                                    
                                }
                            }
                        });
                    });
                });
            }
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
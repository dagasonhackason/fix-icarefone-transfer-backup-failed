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

async function runScript() {
  // Loop through all the files and folders in the backup directory
  await fs.readdir(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH, {withFileTypes: true}, function (err, files) {
    if (err) {
      console.error("fs.readdir() -> Couldn't hit the directory =>", err);
      process.exit(1);
    }
  
    files.forEach(function (file, index) {
      // Make three passes and make the file complete
      var loopOneCurrentFileFolderCursor = path.join(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH, file.name);
  
      fs.stat(loopOneCurrentFileFolderCursor, async function (error, stat) {
          if (error) {
              console.error("Error stating file =>", error);
              return;
          }
  
          const loopOneCurrent = path.basename(loopOneCurrentFileFolderCursor);
  
          if (stat.isDirectory()) {
              console.log("Now -> @ '%s' => directory.", loopOneCurrentFileFolderCursor);
              console.log("About this directory =>", stat);
  
              if(loopOneCurrent === "Android") {
                await fs.readdir(loopOneCurrentFileFolderCursor, {withFileTypes: true}, function (err2, files2) {
                      if (err2) {
                          console.error("fs.readdir() -> Android Dir -> Couldn't hit the directory =>", err2);
                          process.exit(1);
                      }
                      
                      files2.reverse().forEach(function (file2, index2) {
                          var loopTwoCurrentFileFolderCursor = path.join(loopOneCurrentFileFolderCursor, file2.name);
                      
                          fs.stat(loopTwoCurrentFileFolderCursor, async function (error2, stat2) {
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
                                    await fs.readdir(loopTwoCurrentFileFolderCursor, {withFileTypes: true}, function (err3, files3) {
                                          if (err3) {
                                              console.error("fs.readdir() -> Media Dir -> Couldn't hit the directory =>", err3);
                                              process.exit(1);
                                          }
                                          
                                          files3.reverse().forEach(function (file3, index3) {
                                              var loopThreeCurrentFileFolderCursor = path.join(loopTwoCurrentFileFolderCursor, file3.name);
                                          
                                              fs.stat(loopThreeCurrentFileFolderCursor, async function (error3, stat3) {
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
                                                            await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                                if (err4) {
                                                                    console.error("fs.readdir() -> WhatsApp Voice Notes Dir -> Couldn't hit the directory =>", err4);
                                                                    process.exit(1);
                                                                }
                                                                
                                                                files4.forEach(function (file4, index4) {
                                                                    var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                                    fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
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
                                                                                "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Voice Notes\\${loopFourCurrent}`,
                                                                                "an_device_path":`Media/WhatsApp Voice Notes/${loopFourCurrent}`
                                                                            });
                                                                        } else if(stat4.isDirectory()) {
                                                                            await fs.readdir(loopFourCurrentFileFolderCursor, {withFileTypes: true}, function (err5, files5) {
                                                                                if (err5) {
                                                                                    console.error("fs.readdir() -> WhatsApp Voice Notes -> Subfolder Dir -> Couldn't hit the directory =>", err5);
                                                                                    process.exit(1);
                                                                                }
                                                                                
                                                                                files5.forEach(function (file5, index5) {
                                                                                    var loopFiveCurrentFileFolderCursor = path.join(loopFourCurrentFileFolderCursor, file5.name);
                                                                                
                                                                                    fs.stat(loopFiveCurrentFileFolderCursor, function (error5, stat5) {
                                                                                        if (error5) {
                                                                                            console.error("Error stating file =>", error5);
                                                                                            return;
                                                                                        }
                                                                                
                                                                                        const loopFiveCurrent = path.basename(loopFiveCurrentFileFolderCursor);
                                                                                
                                                                                        if (stat5.isFile()) {
                                                                                            
                                                                                            console.log("Now -> @ '%s' => file.", loopFiveCurrentFileFolderCursor);
                                                                                            SELECTED_OS_OUTPUT_AREA.push({
                                                                                                "file_type":0,
                                                                                                "ios_device_path":null,
                                                                                                "domain":null,
                                                                                                "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Voice Notes\\${(loopFiveCurrentFileFolderCursor.split('/'))[(loopFiveCurrentFileFolderCursor.split('/')).length-2]}\\${loopFiveCurrent}`,
                                                                                                "an_device_path":`Media/WhatsApp Voice Notes/${(loopFiveCurrentFileFolderCursor.split('/'))[(loopFiveCurrentFileFolderCursor.split('/')).length-2]}/${loopFiveCurrent}`
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                });
                                                                            });
                                                                        }
                                                                    });
                                                                });
                                                            });
                                                        }
                      
                                                        // if(loopThreeCurrent === "WhatsApp Video") {
                                                        //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                        //         if (err4) {
                                                        //             console.error("fs.readdir() -> WhatsApp Video Dir -> Couldn't hit the directory =>", err4);
                                                        //             process.exit(1);
                                                        //         }
                                                                
                                                        //         files4.forEach(function (file4, index4) {
                                                        //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                        //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                                        //                 if (error4) {
                                                        //                     console.error("Error stating file =>", error4);
                                                        //                     return;
                                                        //                 }
                                                                
                                                        //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                                                
                                                        //                 if (stat4.isFile()) {
                                                                            
                                                        //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                                        //                     SELECTED_OS_OUTPUT_AREA.push({
                                                        //                         "file_type":0,
                                                        //                         "ios_device_path":null,
                                                        //                         "domain":null,
                                                        //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Video\\${loopFourCurrent}`,
                                                        //                         "an_device_path":`Media/WhatsApp Video/${loopFourCurrent}`
                                                        //                     });
                                                        //                 } else if(stat4.isDirectory()) {
                                                        //                     if (loopFourCurrent === "Sent") {
                                                        //                         await fs.readdir(loopFourCurrentFileFolderCursor, {withFileTypes: true}, function (err5, files5) {
                                                        //                             if (err5) {
                                                        //                                 console.error("fs.readdir() -> WhatsApp Video -> Sent Dir -> Couldn't hit the directory =>", err5);
                                                        //                                 process.exit(1);
                                                        //                             }
                                                                                    
                                                        //                             files5.forEach(function (file5, index5) {
                                                        //                                 var loopFiveCurrentFileFolderCursor = path.join(loopFourCurrentFileFolderCursor, file5.name);
                                                                                    
                                                        //                                 fs.stat(loopFiveCurrentFileFolderCursor, function (error5, stat5) {
                                                        //                                     if (error5) {
                                                        //                                         console.error("Error stating file =>", error5);
                                                        //                                         return;
                                                        //                                     }
                                                                                    
                                                        //                                     const loopFiveCurrent = path.basename(loopFiveCurrentFileFolderCursor);
                                                                                    
                                                        //                                     if (stat5.isFile()) {
                                                                                                
                                                        //                                         console.log("Now -> @ '%s' => file.", loopFiveCurrentFileFolderCursor);
                                                        //                                         SELECTED_OS_OUTPUT_AREA.push({
                                                        //                                             "file_type":0,
                                                        //                                             "ios_device_path":null,
                                                        //                                             "domain":null,
                                                        //                                             "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Video\\Sent\\${loopFiveCurrent}`,
                                                        //                                             "an_device_path":`Media/WhatsApp Video/Sent/${loopFiveCurrent}`
                                                        //                                         });
                                                        //                                     }
                                                        //                                 });
                                                        //                             });
                                                        //                         });
                                                        //                     }
                                                        //                 }
                                                        //             });
                                                        //         });
                                                        //     });
                                                        // }
  
                                                        // if(loopThreeCurrent === "WhatsApp Stickers") {
                                                        //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                        //         if (err4) {
                                                        //             console.error("fs.readdir() -> WhatsApp Stickers Dir -> Couldn't hit the directory =>", err4);
                                                        //             process.exit(1);
                                                        //         }
                                                                
                                                        //         files4.forEach(function (file4, index4) {
                                                        //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                        //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                                        //                 if (error4) {
                                                        //                     console.error("Error stating file =>", error4);
                                                        //                     return;
                                                        //                 }
                                                                
                                                        //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                                                
                                                        //                 if (stat4.isFile()) {
                                                                            
                                                        //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                                        //                     SELECTED_OS_OUTPUT_AREA.push({
                                                        //                         "file_type":0,
                                                        //                         "ios_device_path":null,
                                                        //                         "domain":null,
                                                        //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Stickers\\${loopFourCurrent}`,
                                                        //                         "an_device_path":`Media/WhatsApp Stickers/${loopFourCurrent}`
                                                        //                     });
                                                        //                 }
                                                        //             });
                                                        //         });
                                                        //     });
                                                        // }
                      
                                                        // if(loopThreeCurrent === "WhatsApp Images") {
                                                        //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                        //         if (err4) {
                                                        //             console.error("fs.readdir() -> WhatsApp Images Dir -> Couldn't hit the directory =>", err4);
                                                        //             process.exit(1);
                                                        //         }
                                                                
                                                        //         files4.forEach(function (file4, index4) {
                                                        //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                        //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                                        //                 if (error4) {
                                                        //                     console.error("Error stating file =>", error4);
                                                        //                     return;
                                                        //                 }
                                                                
                                                        //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                                                
                                                        //                 if (stat4.isFile()) {
                                                                            
                                                        //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                                        //                     SELECTED_OS_OUTPUT_AREA.push({
                                                        //                         "file_type":0,
                                                        //                         "ios_device_path":null,
                                                        //                         "domain":null,
                                                        //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Images\\${loopFourCurrent}`,
                                                        //                         "an_device_path":`Media/WhatsApp Images/${loopFourCurrent}`
                                                        //                     });
                                                        //                 } else if(stat4.isDirectory()) {
                                                        //                     if (loopFourCurrent === "Sent") {
                                                        //                         await fs.readdir(loopFourCurrentFileFolderCursor, {withFileTypes: true}, function (err5, files5) {
                                                        //                             if (err5) {
                                                        //                                 console.error("fs.readdir() -> WhatsApp Images -> Sent Dir -> Couldn't hit the directory =>", err5);
                                                        //                                 process.exit(1);
                                                        //                             }
                                                                                    
                                                        //                             files5.forEach(function (file5, index5) {
                                                        //                                 var loopFiveCurrentFileFolderCursor = path.join(loopFourCurrentFileFolderCursor, file5.name);
                                                                                    
                                                        //                                 fs.stat(loopFiveCurrentFileFolderCursor, function (error5, stat5) {
                                                        //                                     if (error5) {
                                                        //                                         console.error("Error stating file =>", error5);
                                                        //                                         return;
                                                        //                                     }
                                                                                    
                                                        //                                     const loopFiveCurrent = path.basename(loopFiveCurrentFileFolderCursor);
                                                                                    
                                                        //                                     if (stat5.isFile()) {
                                                                                                
                                                        //                                         console.log("Now -> @ '%s' => file.", loopFiveCurrentFileFolderCursor);
                                                        //                                         SELECTED_OS_OUTPUT_AREA.push({
                                                        //                                             "file_type":0,
                                                        //                                             "ios_device_path":null,
                                                        //                                             "domain":null,
                                                        //                                             "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Images\\Sent\\${loopFiveCurrent}`,
                                                        //                                             "an_device_path":`Media/WhatsApp Images/Sent/${loopFiveCurrent}`
                                                        //                                         });
                                                        //                                     }
                                                        //                                 });
                                                        //                             });
                                                        //                         });
                                                        //                     }
                                                        //                 }
                                                        //             });
                                                        //         });
                                                        //     });
                                                        // }
  
                                                        if(loopThreeCurrent === "WhatsApp Documents") {
                                                            await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                                if (err4) {
                                                                    console.error("fs.readdir() -> WhatsApp Documents Dir -> Couldn't hit the directory =>", err4);
                                                                    process.exit(1);
                                                                }
                                                                
                                                                files4.forEach(function (file4, index4) {
                                                                    var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                                    fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
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
                                                                                "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Documents\\${loopFourCurrent}`,
                                                                                "an_device_path":`Media/WhatsApp Documents/${loopFourCurrent}`
                                                                            });
                                                                        } else if(stat4.isDirectory()) {
                                                                            if (loopFourCurrent === "Sent") {
                                                                                await fs.readdir(loopFourCurrentFileFolderCursor, {withFileTypes: true}, function (err5, files5) {
                                                                                    if (err5) {
                                                                                        console.error("fs.readdir() -> WhatsApp Documents -> Sent Dir -> Couldn't hit the directory =>", err5);
                                                                                        process.exit(1);
                                                                                    }
                                                                                    
                                                                                    files5.forEach(function (file5, index5) {
                                                                                        var loopFiveCurrentFileFolderCursor = path.join(loopFourCurrentFileFolderCursor, file5.name);
                                                                                    
                                                                                        fs.stat(loopFiveCurrentFileFolderCursor, function (error5, stat5) {
                                                                                            if (error5) {
                                                                                                console.error("Error stating file =>", error5);
                                                                                                return;
                                                                                            }
                                                                                    
                                                                                            const loopFiveCurrent = path.basename(loopFiveCurrentFileFolderCursor);
                                                                                    
                                                                                            if (stat5.isFile()) {
                                                                                                
                                                                                                console.log("Now -> @ '%s' => file.", loopFiveCurrentFileFolderCursor);
                                                                                                SELECTED_OS_OUTPUT_AREA.push({
                                                                                                    "file_type":0,
                                                                                                    "ios_device_path":null,
                                                                                                    "domain":null,
                                                                                                    "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Documents\\Sent\\${loopFiveCurrent}`,
                                                                                                    "an_device_path":`Media/WhatsApp Documents/Sent/${loopFiveCurrent}`
                                                                                                });
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
                      
                                                        // if(loopThreeCurrent === "WhatsApp Audio") {
                                                        //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                        //         if (err4) {
                                                        //             console.error("fs.readdir() -> WhatsApp Audio Dir -> Couldn't hit the directory =>", err4);
                                                        //             process.exit(1);
                                                        //         }
                                                                
                                                        //         files4.forEach(function (file4, index4) {
                                                        //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                        //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                                        //                 if (error4) {
                                                        //                     console.error("Error stating file =>", error4);
                                                        //                     return;
                                                        //                 }
                                                                
                                                        //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                                                
                                                        //                 if (stat4.isFile()) {
                                                                            
                                                        //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                                        //                     SELECTED_OS_OUTPUT_AREA.push({
                                                        //                         "file_type":0,
                                                        //                         "ios_device_path":null,
                                                        //                         "domain":null,
                                                        //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Audio\\${loopFourCurrent}`,
                                                        //                         "an_device_path":`Media/WhatsApp Audio/${loopFourCurrent}`
                                                        //                     });
                                                        //                 } else if(stat4.isDirectory()) {
                                                        //                     if (loopFourCurrent === "Sent") {
                                                        //                         await fs.readdir(loopFourCurrentFileFolderCursor, {withFileTypes: true}, function (err5, files5) {
                                                        //                             if (err5) {
                                                        //                                 console.error("fs.readdir() -> WhatsApp Audio -> Sent Dir -> Couldn't hit the directory =>", err5);
                                                        //                                 process.exit(1);
                                                        //                             }
                                                                                    
                                                        //                             files5.forEach(function (file5, index5) {
                                                        //                                 var loopFiveCurrentFileFolderCursor = path.join(loopFourCurrentFileFolderCursor, file5.name);
                                                                                    
                                                        //                                 fs.stat(loopFiveCurrentFileFolderCursor, function (error5, stat5) {
                                                        //                                     if (error5) {
                                                        //                                         console.error("Error stating file =>", error5);
                                                        //                                         return;
                                                        //                                     }
                                                                                    
                                                        //                                     const loopFiveCurrent = path.basename(loopFiveCurrentFileFolderCursor);
                                                                                    
                                                        //                                     if (stat5.isFile()) {
                                                                                                
                                                        //                                         console.log("Now -> @ '%s' => file.", loopFiveCurrentFileFolderCursor);
                                                        //                                         SELECTED_OS_OUTPUT_AREA.push({
                                                        //                                             "file_type":0,
                                                        //                                             "ios_device_path":null,
                                                        //                                             "domain":null,
                                                        //                                             "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Audio\\Sent\\${loopFiveCurrent}`,
                                                        //                                             "an_device_path":`Media/WhatsApp Audio/Sent/${loopFiveCurrent}`
                                                        //                                         });
                                                        //                                     }
                                                        //                                 });
                                                        //                             });
                                                        //                         });
                                                        //                     }
                                                        //                 }
                                                        //             });
                                                        //         });
                                                        //     });
                                                        // }
                      
                                                        // if(loopThreeCurrent === "WhatsApp Animated Gifs") {
                                                        //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                        //         if (err4) {
                                                        //             console.error("fs.readdir() -> WhatsApp Animated Gifs Dir -> Couldn't hit the directory =>", err4);
                                                        //             process.exit(1);
                                                        //         }
                                                                
                                                        //         files4.forEach(function (file4, index4) {
                                                        //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                        //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                                        //                 if (error4) {
                                                        //                     console.error("Error stating file =>", error4);
                                                        //                     return;
                                                        //                 }
                                                                
                                                        //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                                                
                                                        //                 if (stat4.isFile()) {
                                                                            
                                                        //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                                        //                     SELECTED_OS_OUTPUT_AREA.push({
                                                        //                         "file_type":0,
                                                        //                         "ios_device_path":null,
                                                        //                         "domain":null,
                                                        //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Animated Gifs\\${loopFourCurrent}`,
                                                        //                         "an_device_path":`Media/WhatsApp Animated Gifs/${loopFourCurrent}`
                                                        //                     });
                                                        //                 } else if(stat4.isDirectory()) {
                                                        //                     if (loopFourCurrent === "Sent") {
                                                        //                         await fs.readdir(loopFourCurrentFileFolderCursor, {withFileTypes: true}, function (err5, files5) {
                                                        //                             if (err5) {
                                                        //                                 console.error("fs.readdir() -> WhatsApp Animated Gifs -> Sent Dir -> Couldn't hit the directory =>", err5);
                                                        //                                 process.exit(1);
                                                        //                             }
                                                                                    
                                                        //                             files5.forEach(function (file5, index5) {
                                                        //                                 var loopFiveCurrentFileFolderCursor = path.join(loopFourCurrentFileFolderCursor, file5.name);
                                                                                    
                                                        //                                 fs.stat(loopFiveCurrentFileFolderCursor, function (error5, stat5) {
                                                        //                                     if (error5) {
                                                        //                                         console.error("Error stating file =>", error5);
                                                        //                                         return;
                                                        //                                     }
                                                                                    
                                                        //                                     const loopFiveCurrent = path.basename(loopFiveCurrentFileFolderCursor);
                                                                                    
                                                        //                                     if (stat5.isFile()) {
                                                                                                
                                                        //                                         console.log("Now -> @ '%s' => file.", loopFiveCurrentFileFolderCursor);
                                                        //                                         SELECTED_OS_OUTPUT_AREA.push({
                                                        //                                             "file_type":0,
                                                        //                                             "ios_device_path":null,
                                                        //                                             "domain":null,
                                                        //                                             "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WhatsApp Animated Gifs\\Sent\\${loopFiveCurrent}`,
                                                        //                                             "an_device_path":`Media/WhatsApp Animated Gifs/Sent/${loopFiveCurrent}`
                                                        //                                         });
                                                        //                                     }
                                                        //                                 });
                                                        //                             });
                                                        //                         });
                                                        //                     }
                                                        //                 }
                                                        //             });
                                                        //         });
                                                        //     });
                                                        // }
                                          
                                                        // if(loopThreeCurrent === "WallPaper") {                                                                                                                                                                                                
                                                        //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                                        //         if (err4) {
                                                        //             console.error("fs.readdir() -> WallPaper Dir -> Couldn't hit the directory =>", err4);
                                                        //             process.exit(1);
                                                        //         }
                                                                
                                                        //         files4.forEach(function (file4, index4) {
                                                        //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                                                
                                                        //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                                        //                 if (error4) {
                                                        //                     console.error("Error stating file =>", error4);
                                                        //                     return;
                                                        //                 }
                                                                
                                                        //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                                                
                                                        //                 if (stat4.isFile()) {
                                                                            
                                                        //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                                        //                     SELECTED_OS_OUTPUT_AREA.push({
                                                        //                         "file_type":0,
                                                        //                         "ios_device_path":null,
                                                        //                         "domain":null,
                                                        //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Media\\WallPaper\\${loopFourCurrent}`,
                                                        //                         "an_device_path":`Media/WallPaper/${loopFourCurrent}`
                                                        //                     });
                                                        //                 }
                                                        //             });
                                                        //         });
                                                        //     });
                                                        // }
                                                  }
                                              });
                                          });
                                      });
                                  }
  
                                //   if(loopTwoCurrent === "Backups") {
                                //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                //         if (err4) {
                                //             console.error("fs.readdir() -> Backups Dir -> Couldn't hit the directory =>", err4);
                                //             process.exit(1);
                                //         }
                                        
                                //         files4.forEach(function (file4, index4) {
                                //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                        
                                //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                //                 if (error4) {
                                //                     console.error("Error stating file =>", error4);
                                //                     return;
                                //                 }
                                        
                                //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                        
                                //                 if (stat4.isFile()) {
                                                    
                                //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                //                     SELECTED_OS_OUTPUT_AREA.push({
                                //                         "file_type":0,
                                //                         "ios_device_path":null,
                                //                         "domain":null,
                                //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Backups\\${loopFourCurrent}`,
                                //                         "an_device_path":`Backups/${loopFourCurrent}`
                                //                     });
                                //                 }
                                //             });
                                //         });
                                //     });
                                //   }
  
                                //   if(loopTwoCurrent === "Databases") {
                                //     await fs.readdir(loopThreeCurrentFileFolderCursor, {withFileTypes: true}, function (err4, files4) {
                                //         if (err4) {
                                //             console.error("fs.readdir() -> Databases Dir -> Couldn't hit the directory =>", err4);
                                //             process.exit(1);
                                //         }
                                        
                                //         files4.forEach(function (file4, index4) {
                                //             var loopFourCurrentFileFolderCursor = path.join(loopThreeCurrentFileFolderCursor, file4.name);
                                        
                                //             fs.stat(loopFourCurrentFileFolderCursor, function (error4, stat4) {
                                //                 if (error4) {
                                //                     console.error("Error stating file =>", error4);
                                //                     return;
                                //                 }
                                        
                                //                 const loopFourCurrent = path.basename(loopFourCurrentFileFolderCursor);
                                        
                                //                 if (stat4.isFile()) {
                                                    
                                //                     console.log("Now -> @ '%s' => file.", loopFourCurrentFileFolderCursor);
                                //                     SELECTED_OS_OUTPUT_AREA.push({
                                //                         "file_type":0,
                                //                         "ios_device_path":null,
                                //                         "domain":null,
                                //                         "local_path":`C:${convertToWindowsPath(ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH)}\\Android\\Databases\\${loopFourCurrent}`,
                                //                         "an_device_path":`Databases/${loopFourCurrent}`
                                //                     });
                                //                 }
                                //             });
                                //         });
                                //     });
                                //   }
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

async function init(){
    await runScript();

    const buff = new Buffer.from(JSON.stringify(JSON.parse(SELECTED_OS_OUTPUT_AREA)), 'utf-8');

    try {
        await fs.writeFileSync(`${ICAREFONE_TRANSFER_BACKUP_FOLDER_PATH}/IOSAnroidDecrypt/Android_LocalFilesMap.json`, buff);
        console.log("Backup Record Fix File Generated Successfully");
    } catch(e) {
        console.error("Faile to Write Backup Record Fix File", e);
    }
}

init();

function convertToWindowsPath(str) {
 return str.replace(/\//g, '\\');
}
var NodeUglifier = require("node-uglifier");
var nodeUglifier = new NodeUglifier("./source/main.js");
nodeUglifier.merge().uglify();

//exporting
nodeUglifier.exportToFile("./server.js");
// nodeUglifier.exportSourceMaps("./ugly-test/exportSourceMaps.js");
//DONE

//in case you need it get the string
//if you call it before uglify(), after merge() you get the not yet uglified merged source
var uglifiedString=nodeUglifier.toString();
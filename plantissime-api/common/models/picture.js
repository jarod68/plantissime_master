module.exports = function(Picture) {
	Picture.disableRemoteMethod('createContainer', true);
	Picture.disableRemoteMethod('destroyContainer', true);
	
	function randomString (length) {
		var charsNumbers = '0123456789';
		var charsLower   = 'abcdefghijklmnopqrstuvwxyz';
		var charsUpper   = charsLower.toUpperCase();
		
		var crypto = require('crypto');
		
		var chars = charsNumbers + charsLower + charsUpper;
		
		length = length || 32;
		var str = '';
		while(str.length < length){
			var bf = crypto.randomBytes(length);
			for(var i = 0; i < bf.length; i++){
				var index = bf.readUInt8(i) % chars.length;
				str += chars.charAt(index);
			}
		}
		return str;
	}
	
	function renameFile (containerName, fileName) {
		var fs = require('fs');
		var path = require('path');
		
		var oldPath = './static/storage/' + containerName + '/' + fileName;	

		var newName = randomString(16) + path.extname(fileName);
		var newPath = './static/storage/' + containerName + '/' + newName;
		
		fs.rename(oldPath, newPath, function (err) {
			if (err) throw err;
			fs.stat(newPath, function (err, stats) {
				if (err) throw err;
				console.log('stats: ' + JSON.stringify(stats));
			});
		});
		
		fileName = newName;
		
		return newName;
	}
	
	Picture.afterRemote('upload', function (ctx, modelInstance, next) {
		modelInstance.result.files.file[0].name = renameFile(modelInstance.result.files.file[0].container, modelInstance.result.files.file[0].name);

		next();
	});
};

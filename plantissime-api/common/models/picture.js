module.exports = function(Picture) {
	Picture.disableRemoteMethod('createContainer', true);
	Picture.disableRemoteMethod('destroyContainer', true);
};

/// <reference path="../../typings/jquery/jquery.d.ts"/>
$(document).ready(function () {
  $('#part-content').width($('#part-content').parent().width()-130);
	$( window ).resize(function() {
		$('#part-content').width($('#part-content').parent().width()-130);
	});
});
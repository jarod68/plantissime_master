/*  
 *  Plantissime Web Client 
 *
 *  Title       :  measureTypes filter
 *  Description :  a filter to show a correct label for this enum
 *  Year        :  2015
 */
planti.filters.filter('measureTypes', function() {
	return function(input) {
		var result = "";
		switch (input) {
			case "temperature":
				result = "Temperature";
				break;
				
			case "luminosity":
				result = "Luminosity";
				break;
				
			case "groundHumidity":
				result = "Ground humidity";
				break;
				
			case "airHumidity":
				result = "Air humidity";
				break;
		
			default:
				break;
		}
		return result;
	};
});
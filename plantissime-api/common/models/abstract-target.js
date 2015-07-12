module.exports = function(AbstractTarget) {

  AbstractTarget.setup = function setupAbstractTarget() {

    AbstractTarget.base.setup.apply(this, arguments);

  	this.prototype.averages = function(type, by, since, cb) {
  		var target = this;
  		console.log(target);
  		console.log(type, by, since);
  		
      // Date
      var sinceDate = new Date(0);
      if(since != null) {
        sinceDate = new Date(since);
      }
      
      // 
      var result = [];
      
  		target.measures({ where: { type: type, time: { gte: sinceDate } }, order: "time ASC" }, function(err, measures) {
                
        var periodBegin = null;
        var periodEnd = new Date(0);
        var periodSum = 0;
        var periodCount = 0;
        
        for (var index = 0; index < measures.length; index++) {
          var measure = measures[index];
          
          periodSum = periodSum + measure.value;
          periodCount = periodCount + 1;
          
          console.log(periodSum, periodCount);
          console.log(measure.time, periodEnd);
          
          if(measure.time > periodEnd) {
            
            if(periodBegin != null) {
              result.push({ period: 'day', date: periodBegin, value: (periodSum / periodCount) });  
            }
            
            periodSum = 0;
            periodCount = 0;
            
            switch (by) {
              case 'hour':
                periodBegin = new Date(measure.time.getFullYear(), measure.time.getMonth(), measure.time.getDate(), measure.time.getHours(), 0, 0, 0);
                periodEnd = new Date(measure.time.getFullYear(), measure.time.getMonth(), measure.time.getDate(), measure.time.getHours(), 59, 59, 999);
                console.log(periodBegin);
                break;
                
              case 'day':
                periodBegin = new Date(measure.time.getFullYear(), measure.time.getMonth(), measure.time.getDate(), 0, 0, 0, 0);
                periodEnd = new Date(measure.time.getFullYear(), measure.time.getMonth(), measure.time.getDate(), 23, 59, 59, 999);
                break;
            
              default:
                break;
            }
          }

        }
        
        cb(null, result);
  		});
    }

    this.remoteMethod(
      'averages',
      {
        http: {path: '/averages', verb: 'get'},
        accepts: [
          {arg: 'type', type: 'string', 'http': {source: 'query'}},
          {arg: 'by', type: 'string', 'http': {source: 'query'}},
          {arg: 'since', type: 'date', 'http': {source: 'query'}}
        ],
        returns: {arg: 'result', type: 'Object', root: true},
        isStatic: false
      }
    );

  };
	
};

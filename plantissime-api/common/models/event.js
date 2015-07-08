module.exports = function(Event) {

  Event.activeAlert = function(targetId, targetType, alertCode, alertActive) {
    console.log('activeAlert', targetId, alertCode, alertActive);
    
    // Search an active alert
    Event.findOne({ where: { targetId: targetId, targetType: targetType, code: alertCode, expiredAt: null }, order: 'time DESC' }, function(err, currentAlert) {
      console.log('-- Current Alert ==>', err, currentAlert);
      // If no active alert or alert expired and we must active one
      if ((currentAlert == null || (currentAlert.expiredAt != null && currentAlert.expiredAt < new Date())) && alertActive) {
        // Create an active alert
        Event.create({ time: new Date(), code: alertCode, source: 'activeAlert', level: 2, targetId: targetId, targetType: targetType }, function(err, data) {
          console.log('-- Alert created ==>', err, data);
        });
      }
      // Else if there is an current active alert and it's not expired and we must desactive it
      else if (currentAlert != null && currentAlert.expiredAt == null && !alertActive) {
        currentAlert.expiredAt = new Date();
        currentAlert.save(function(err, data) {
          console.log('-- Alert updated ==>', err, data);
        });
      }
    });
  };

};

// src/services/event/hooks/create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const moment = require('moment');

const defaults = {};

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  // eslint-disable-line no-unused-vars
  options = Object.assign({}, defaults, options);

  return function(hook) {
    // After a new event is uploaded we want to update the
    // corresponding weekly event
    const AASWeek = hook.app.service('api/aas-week');
    const aas = hook.result;
    const weekDay = moment(hook.result.date)
      .startOf('week')
      .format('YYYY-MM-DD');
    const dayOfWeek = moment(hook.result.date).weekday();

    return AASWeek.find({
      query: {
        date: weekDay
      }
    })
      .then(aasWeek => {
        if (aasWeek && aasWeek.length > 0) {
          return aasWeek[0];
        } else {
          return AASWeek.create({
            userId: hook.result.userId,
            patientId: hook.result.patientId,
            date: weekDay,
            total: 0
          });
        }
      })
      .then(aasWeek => {
        let data = aasWeek.data;
        data[dayOfWeek] = hook.result.value;
        let total =
          data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6];
        return AASWeek.patch(aasWeek._id, {
          data: data,
          total: total
        });
      })
      .then(aasWeek => {
        console.log(aasWeek);
        return hook;
      });
  };
};

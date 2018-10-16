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
    const UASWeek = hook.app.service('api/uas-week');
    const uas = hook.result;
    const weekDay = moment(hook.result.date)
      .startOf('week')
      .format('YYYY-MM-DD');
    const dayOfWeek = moment(hook.result.date).weekday();

    return UASWeek.find({
      query: {
        userId: hook.result.userId,
        date: weekDay
      }
    })
      .then(uasWeek => {
        if (uasWeek && uasWeek.length > 0) {
          return uasWeek[0];
        } else {
          return UASWeek.create({
            userId: hook.result.userId,
            patientId: hook.result.patientId,
            date: weekDay,
            total: 0
          });
        }
      })
      .then(uasWeek => {
        let data = uasWeek.data;
        data[dayOfWeek] = hook.result.value;
        let total =
          data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6];
        return UASWeek.patch(uasWeek._id, {
          data: data,
          total: total
        });
      })
      .then(uasWeek => {
        return hook;
      });
  };
};

module.exports = function(Model, patients, startDate, endDate) {
  return Model.aggregate([
    { $match: { patientId: { $in: patients } } },
    { $match: { date: { $gte: startDate, $lte: endDate } } },
    { $project: { _id: 0, date: 1, total: 1 } },
    { $sort: { date: 1 } }
  ]).then(results => {
    return results;
  });
};

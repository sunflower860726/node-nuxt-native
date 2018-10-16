module.exports = function(Model, patients, startDate, endDate) {
  let query = [];
  let projection = {
    _id: 0,
    date: 1,
    results: 1
  };

  if (patients) {
    query.push({ $match: { patientId: { $in: patients } } });
    projection.patientId = 1;
  }

  query.push({ $match: { date: { $gte: startDate, $lte: endDate } } });
  query.push({ $project: projection });
  query.push({ $sort: { date: 1 } });

  return Model.aggregate(query).then(results => {
    return results;
  });
};

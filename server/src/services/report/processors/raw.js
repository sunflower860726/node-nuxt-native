module.exports = function (Model, patients, startDate, endDate) {
  return Model.aggregate([
    { $match: { patientId: { $in:  patients }}},
    { $match: { date: { $gte: startDate, $lte: endDate }}},
    { $lookup: {
      from: "patients",
      localField: "patientId",
      foreignField: "_id",
      as: "patient"
    }},
    { $project: {
      _id: 1,
      type: 1,
      date: 1,
      time: 1,
      duration: 1,
      areasAffected: 1,
      severity: 1,
      daysOffWork: 1,
      treatmentLocation: 1,
      triggers: 1,
      timeBetween: 1,
      notes: 1,
      dose: 1,
      otherMedications: 1,
      areaPhoto: 1,
      'patient.name': 1,
      'patient._id': 1,
    }},
    { $unwind:  '$patient' },
    { $sort: { date: 1 } }
  ]).then(results => {
    return results;
  });
}

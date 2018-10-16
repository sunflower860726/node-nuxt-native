/* eslint-disable no-unused-vars */

const errors = require('feathers-errors');

const uas = require('./processors/uas');
const aas = require('./processors/aas');
const uasWeek = require('./processors/uas-week');
const aasWeek = require('./processors/aas-week');
const ct = require('./processors/ct');
const aqol = require('./processors/aqol');
const uqol = require('./processors/uqol');
const medications = require('./processors/medications');

const logger = require('winston');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  get(id, params) {
    const user = params.user;

    const patients = params.query.patients;
    const startDate = params.query.startDate;
    const endDate = params.query.endDate;
    const aggregate = params.query.aggregate;

    if (!startDate || !endDate) {
      throw new errors.BadRequest('Missing startDate and endDate');
    }

    if (startDate.length !== 10 || endDate.length !== 10) {
      throw new errors.BadRequest('Invalid startDate and endDate');
    }

    const UAS = this.app.service('api/uas').Model;
    const AAS = this.app.service('api/aas').Model;
    const UASWeek = this.app.service('api/uas-week').Model;
    const AASWeek = this.app.service('api/aas-week').Model;
    const AQOL = this.app.service('api/aqol').Model;
    const UQOL = this.app.service('api/uqol').Model;
    const CT = this.app.service('api/control-test').Model;
    const Medications = this.app.service('api/medications').Model;

    const Hcp = this.app.service('api/hcps');
    const Patient = this.app.service('api/patients');

    logger.debug('startDate:', startDate);
    logger.debug('endDate:', endDate);
    logger.debug('patients:', patients);
    logger.debug('aggregate', aggregate);

    // Get list of patients for this HCP
    return Hcp.find({ query: { userId: user._id } }).then(hcps => {
      const hcp = hcps[0];
      const matchPatients = patients
        ? this.intersect(patients, hcp.patients)
        : hcp.patients;

      logger.debug('hcp patients:', hcp.patients);
      logger.debug('matched:', matchPatients);

      if (matchPatients.length === 0) {
        return [];
      }

      if (aggregate) {
        switch (id) {
        case 'uas':
          return uas(UAS, null, startDate, endDate);
        case 'aas':
          return aas(AAS, null, startDate, endDate);
        case 'uas-week':
          return uasWeek(UASWeek, null, startDate, endDate);
        case 'aas-week':
          return aasWeek(AASWeek, null, startDate, endDate);
        case 'ct':
          return ct(CT, null, startDate, endDate);
        case 'aqol':
          return aqol(AQOL, null, startDate, endDate);
        case 'uqol':
          return uqol(UQOL, null, startDate, endDate);
        case 'medications':
          return medications(Medications, null, startDate, endDate).then(
            medications => {
              return Medications.find({
                query: {
                  date: { $lt: startDate },
                  $limit: 1
                }
              }).then(priorMedication => {
                if (priorMedication.length > 0) {
                  medications.splice(0, 0, priorMedication[0]);
                }
                return medications;
              });
            }
          );
        default:
          return [];
        }
      } else {
        return Patient.find({
          query: { _id: { $in: matchPatients }, generalConsent: true }
        }).then(patients => {
          let resolvedPatients = patients.map(patient => {
            return patient._id;
          });

          logger.debug(resolvedPatients);

          switch (id) {
          case 'uas':
            return uas(UAS, resolvedPatients, startDate, endDate);
          case 'aas':
            return aas(AAS, resolvedPatients, startDate, endDate);
          case 'uas-week':
            return uasWeek(UASWeek, resolvedPatients, startDate, endDate);
          case 'aas-week':
            return aasWeek(AASWeek, resolvedPatients, startDate, endDate);
          case 'ct':
            return ct(CT, resolvedPatients, startDate, endDate);
          case 'aqol':
            return aqol(AQOL, resolvedPatients, startDate, endDate);
          case 'uqol':
            return uqol(UQOL, resolvedPatients, startDate, endDate);
          case 'medications':
            return medications(
              Medications,
              resolvedPatients,
              false,
              startDate,
              endDate
            ).then(medications => {
              return Medications.find({
                query: {
                  date: { $lt: startDate },
                  $limit: 1
                }
              }).then(priorMedication => {
                if (priorMedication.length > 0) {
                  medications.splice(0, 0, priorMedication[0]);
                }
                return medications;
              });
            });
          default:
            return [];
          }
        });
      }
    });
  }

  intersect(a, b) {
    if (typeof a === 'string') {
      a = [a];
    }

    if (typeof b === 'string') {
      b = [b];
    }
    var t;
    if (b.length > a.length) (t = b), (b = a), (a = t); // indexOf to loop over shorter
    return a.filter(function(e) {
      if (b.indexOf(e) !== -1) return true;
    });
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;

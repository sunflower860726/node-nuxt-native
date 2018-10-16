'use strict';

const moment = require('moment');
const uuid = require('uuid');
const app = require('./src/app');
const User = app.service('api/users');
const Patient = app.service('api/patients');
const Hcp = app.service('api/hcps');
const UAS = app.service('api/uas');
const AAS = app.service('api/aas');
const Medications = app.service('api/medications');
const UASWeek = app.service('api/aas-week');
const AASWeek = app.service('api/uas-week');

const hcpEmail = 'hcp@demo.com';
const patientEmail = 'patient@demo.com';
const patient2Email = 'patient2@demo.com';
const password = 'asdfasdf';

var patientId;
var patient2Id;
var patientUserId;
var patient2UserId;
var hcpId;
var hcpUserId;

global.Promise = require('bluebird');
moment.locale('en');

Promise.all([
  User.remove(null),
  Patient.remove(null),
  Hcp.remove(null),
  UAS.remove(null),
  AAS.remove(null),
  UASWeek.remove(null),
  AASWeek.remove(null),
  Medications.remove(null)
])
  .then(() => {
    console.log('Removed all existing data');
    return User.create({
      email: hcpEmail,
      password: password,
      roles: ['hcp']
    })
      .then(hcpUser => {
        console.log('HCP user');
        console.log(hcpUser);
        hcpUserId = hcpUser._id;
        return Hcp.create({
          userId: hcpUser._id,
          name: 'HCP 1',
          email: 'hcp@demo.com'
        });
      })
      .then(hcp => {
        console.log('HCP');
        console.log(hcp);
        hcpId = hcp._id;
        return User.create({
          email: patientEmail,
          password: password,
          roles: ['patient']
        });
      })
      .then(patientUser => {
        console.log('patient user');
        console.log(patientUser);
        patientUserId = patientUser._id;
        return Patient.create({
          userId: patientUser._id,
          name: 'Patient 1',
          email: 'patient@demo.com',
          generalConsent: true,
          hcps: [hcpId]
        });
      })
      .then(patient => {
        console.log('patient');
        console.log(patient);
        patientId = patient._id;
        return User.create({
          email: patient2Email,
          password: password,
          roles: ['patient']
        });
      })
      .then(patient2User => {
        console.log('patient 2 user');
        console.log(patient2User);
        patient2UserId = patient2User._id;
        return Patient.create({
          userId: patient2User._id,
          name: 'Patient 2',
          email: 'patient2@demo.com',
          hcps: [hcpId]
        });
      })
      .then(patient2 => {
        console.log('patient2');
        console.log(patient2);
        patient2Id = patient2._id;
        return Hcp.patch(hcpId, {
          patients: [patientId, patient2Id]
        });
      })
      .then(hcp => {
        console.log('HCP');
        console.log(hcp);
      });
  })
  .then(() => {
    let events = [];
    let eventsCount = 0;

    let today = moment().startOf('week');
    let date = today.subtract(1, 'week');

    let uasEvents = [];
    let aasEvents = [];
    while (eventsCount < 100) {
      let itch = randomIntFromInterval(0, 3);
      let hive = randomIntFromInterval(0, 3);
      let uasEvent = {
        userId: patientUserId,
        patientId: patientId,
        date: date.format('YYYY-MM-DD'),
        // total: 0,
        // data: {}
        itch: itch,
        hive: hive,
        value: itch + hive
      };
      uasEvents.push(uasEvent);

      let results = [
        randomIntFromInterval(0, 3),
        randomIntFromInterval(0, 3),
        randomIntFromInterval(0, 3),
        randomIntFromInterval(0, 3)
      ];
      let value = results.reduce((value, current) => value + current);

      let aasEvent = {
        userId: patientUserId,
        patientId: patientId,
        date: date.format('YYYY-MM-DD'),
        results: results,
        value: value
      };
      aasEvents.push(aasEvent);

      date = date.subtract(1, 'day');
      eventsCount++;
    }

    let medicationDay = moment().startOf('week');
    let startOfMedication = medicationDay.subtract(8, 'week');
    /**
     * [
     *  cortisone: 5x5x1daily,
     *  cyclosporine: 1x5x1month,
     * ]
     */
    let medicationEvent = {
      userId: patientUserId,
      patientId: patientId,
      date: startOfMedication.format('YYYY-MM-DD'),
      medications: [
        {
          name: 'cortisone',
          frequency: '1daily',
          quantity: 5,
          dose: 5
        },
        {
          name: 'cyclosporine',
          frequency: '1month',
          quantity: 1,
          dose: 5
        }
      ]
    };
    events.push(
      Medications.create(medicationEvent).then(medication => {
        console.log(medication);
      })
    );

    let second = startOfMedication.add(4, 'week');
    /**
     * [
     *  cyclosporine: 2x5x1month,
     *  bilastine: 2x2x2week,
     * ]
     */
    let medication2Event = {
      userId: patientUserId,
      patientId: patientId,
      date: startOfMedication.format('YYYY-MM-DD'),
      medications: [
        {
          name: 'cyclosporine',
          frequency: '1month',
          quantity: 2,
          dose: 5
        },
        {
          name: 'bilastine',
          frequency: '2week',
          quantity: 2,
          dose: 2
        }
      ]
    };
    events.push(
      Medications.create(medication2Event).then(medication => {
        console.log(medication);
      })
    );

    let third = startOfMedication.add(2, 'week');
    /**
     * [
     *  cyclosporine: 2x5x1month,
     *  bilastine: 2x2x2week,
     * ]
     */
    let medication3Event = {
      userId: patientUserId,
      patientId: patientId,
      date: startOfMedication.format('YYYY-MM-DD'),
      medications: [
        {
          name: 'cyclosporine',
          frequency: '1month',
          quantity: 2,
          dose: 5
        },
        {
          name: 'bilastine',
          frequency: '2week',
          quantity: 2,
          dose: 2
        }
      ]
    };
    events.push(
      Medications.create(medication3Event).then(medication => {
        console.log(medication);
      })
    );

    return Promise.all([
      Promise.resolve(uasEvents).each(event => {
        return UAS.create(event).then(event => {
          console.log(event);
        });
      }),
      Promise.resolve(aasEvents).each(event => {
        return AAS.create(event).then(event => {
          console.log(event);
        });
      }),
      ...events
    ]);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    process.exit();
  });

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

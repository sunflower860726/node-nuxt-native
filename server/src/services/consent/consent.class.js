const errors = require('feathers-errors');
const uuid = require('uuid');

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  create(data, params) {
    const Invite = this.app.service('api/invites');
    const Patient = this.app.service('api/patients');
    const Hcp = this.app.service('api/hcps');
    const User = this.app.service('api/users');
    const Mailgun = this.app.service('mail');

    var errorMessages = [];
    if (!data.invite) {
      errorMessages.push({
        path: 'invite',
        value: data.invite,
        message: 'Invite code is required'
      });
    }

    // Needed instead of the other checks because they are boolean values
    if (data.generalConsent === undefined || data.generalConsent === null) {
      errorMessages.push({
        path: 'generalConsent',
        value: data.generalConsent,
        message: 'Missing value for general consent'
      });
    }

    if (errorMessages.length > 0) {
      throw new errors.BadRequest('Invalid Request', {
        errors: errorMessages
      });
    }

    // Fetch the corresponding invite and fail
    // if not found.
    return Invite.find({ query: { token: data.invite } }).then(invites => {
      if (!invites || invites.length == 0) {
        throw new errors.NotFound('No invitation found');
      }

      const invite = invites[0];
      const hcpId = invite.hcpId;

      // If general consent is true, follow through with consent
      // and patient setup. Otherwise stop, mark the Invite status as
      // declined and stop.
      if (data.generalConsent) {
        // - Does HCP exist?
        // - Link HCP to Patient
        // - Create Patient account
        return Hcp.get(hcpId).then(hcp => {
          if (!hcp) {
            throw new errors.NotFound(
              'Inviting healthcare provider no longer exist'
            );
          }

          return Patient.find({
            query: {
              userId: data.userId
            }
          })
            .then(patients => {
              if (patients && patients.length > 0) {
                const patient = patients[0];
                return Patient.patch(patient._id, {
                  $addToSet: {
                    hcps: hcpId
                  },
                  generalConsent: data.generalConsent
                });
              } else {
                throw new errors.Forbidden('Invalid Patient');
              }
            })
            .then(patient => {
              return Hcp.patch(hcpId, {
                $addToSet: {
                  patients: patient._id
                }
              })
                .then(() => {
                  // Invite accepted and patient created, delete the invitation
                  return Invite.remove(invite._id);
                })
                .then(() => {
                  const domain = this.app.get('url');
                  const sender = this.app.get('email') || 'noreply@urtic.ca';
                  const html = `You are now connected to your physician using the account ${
                    patient.email
                  }`;
                  const email = {
                    from: sender,
                    to: patient.email,
                    subject: 'Your are now connected to Urtic web',
                    html: html
                  };

                  Mailgun.create(email);
                });
            })
            .then(() => {
              return {};
            });
        });
      } else {
        // If General consent is not true, then we should
        // show this invite as declined, the HCP could resend
        // this event if he prefers but that is left up to him
        return Invite.patch(invite._id, {
          status: 'declined'
        }).then(invite => {
          return {};
        });
      }
    });
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;

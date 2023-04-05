const moment = require('moment');

const helpers = {
  formatDate: (date, format) => {
    return moment(date).format(format);
  },
};

module.exports = helpers;

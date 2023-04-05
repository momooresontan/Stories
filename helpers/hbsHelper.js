const moment = require('moment');

exports.formatDate = (date, format) => {
  return moment(date).format(format);
};

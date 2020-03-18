import moment from 'moment';

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const generateOtp = n => {
  var add = 1,
    max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ('' + number).substring(add);
};

export const decodePolyline = (t, e) => {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function(t) {
    return { latitude: t[0], longitude: t[1] };
  }));
};

export const jsonToFormData = (inJSON, inTestJSON, inFormData, parentKey) => {
  // http://stackoverflow.com/a/22783314/260665
  // Raj: Converts any nested JSON to formData.
  var form_data = inFormData || new FormData();
  var testJSON = inTestJSON || {};
  for (var key in inJSON) {
    // 1. If it is a recursion, then key has to be constructed like "parent.child" where parent JSON contains a child JSON
    // 2. Perform append data only if the value for key is not a JSON, recurse otherwise!
    var constructedKey = key;
    if (parentKey) {
      constructedKey = parentKey + '.' + key;
    }

    var value = inJSON[key];
    if (value && value.constructor === {}.constructor) {
      // This is a JSON, we now need to recurse!
      jsonToFormData(value, testJSON, form_data, constructedKey);
    } else {
      form_data.append(constructedKey, inJSON[key]);
      testJSON[constructedKey] = inJSON[key];
    }
  }
  return form_data;
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const getMiles = i => {
  return i * 0.000621371192;
};

export const getMeters = i => {
  return i * 1609.344;
};

export const getAge = birthday => {
  // birthday is a date
  let formattedDate = moment(birthday).format('LL');
  let dateDiff = moment().diff(formattedDate, 'years');
  return dateDiff;
};

export const getDaysLeft = date => {
  // birthday is a date
  let formattedDate = moment(date).format('LL');
  let dateDiff = moment().diff(formattedDate, 'days');

  let daysLeft = 30 - dateDiff;

  if (daysLeft > 0) {
    return daysLeft;
  } else {
    return 0;
  }
};

export const getSex = sex => {
  if (sex === 'Male') {
    return 'M';
  } else if (sex === 'Female') {
    return 'F';
  } else {
    return 'O';
  }
  return '';
};

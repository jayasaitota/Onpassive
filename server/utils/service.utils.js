
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

/**
 * generate UUID 5
 * @returns {token}
 */
export const generateUUID = (randomstring) => {
  const randomUUID4 = uuidv4();
  return uuidv5(randomstring, randomUUID4);
}

export const generateListQuery = ({ page = 1, limit = 20, sortfield = 'created', direction = 'desc' }) => {
  let criteria = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: {
      [sortfield]: direction == 'desc' ? -1 : 1
    },
    pagination: {
      sortfield: sortfield,
      direction: direction,
    },
    filter: { active: true }
  };

  return criteria
};


/**
 * get bearer token
 * @returns {token}
 */
export const getBearerToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

/**
 * remove body fields
 * @param req Object
 * @param res Object
 * @param next Function
 */
export const removeBodyFields = (req, res, next) =>{
  let removeFieldsArr = ['active','salt','refreshToken'];
  removeFieldsArr.forEach((field) => {
    if (req.body && (req.body[field])) {
      delete req.body[field];
    }
  });
  next();
};
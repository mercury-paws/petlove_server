export const mySQLSaveError = (user, options) => {
  if (user.errors) {
    const { name, code } = user.errors;
    const status = name === 'SequelizeUniqueConstraintError' ? 409 : 400;
     throw new Error(`Error: ${status} - ${name}, Code: ${code}`);
  }
};

export const setUpdateSettings = function (user, options) {
  options.returning = true;
  options.validate = true;
};

module.exports = (app, adminModel) => {
    const { VARCHAR, INTEGER, TIMESTAMP } = app.Sequelize;
  
    const User = adminModel.define('User', {
      login: VARCHAR,
      name: VARCHAR,
      password: VARCHAR,
      age: INTEGER,
      last_sign_in_at: TIMESTAMP,
      created_at: TIMESTAMP,
      updated_at: TIMESTAMP,
    });
  
    return User;
  };
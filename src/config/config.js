module.exports = {
  "development": {
    "username": "yt",
    "password": "yt",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "logging": false
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "ssl": true, 
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true,
      "require": true, // This will help you. But you will see nwe error
      "rejectUnauthorized": false // This line will fix new error
    }
  }
}
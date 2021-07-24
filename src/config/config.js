module.exports = {
    "development": {
        db_url: process.env.DATABASE_URL || "postgres://localhost/test"
    },
    "test": {
        db_url: process.env.DATABASE_URL || "postgres://localhost/test"
    },
    "production": {
        db_url: process.env.DATABASE_URL || "postgres://localhost/test"
    }
}

// development -> for Development 
// test -> for mocha test  
// production -> for production Server
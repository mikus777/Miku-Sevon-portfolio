let config = {};

const test = Deno.env.get('TEST_ENVIRONMENT')

if (test) {
  //TEST DATABASE
  config.database = {
    hostname: "suleiman.db.elephantsql.com",
    database: "nhvzbrtt",
    user: "nhvzbrtt",
    password: "No6OgdDhfQVU5Hq9aBntHTGWqQTLsUFf",
    port: 5432
  };
} else {
  //REAL DATABASE
  config.database = {
    hostname: "suleiman.db.elephantsql.com",
    database: "cqurehtk",
    user: "cqurehtk",
    password: "POaoYUnihTa-KU1mykQag7vJIMO0_mrA",
    port: 5432
  };
}

export { config };
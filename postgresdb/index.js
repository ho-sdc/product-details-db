const { Pool } = require('pg');

const pgPool = new Pool();
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports.dbInitialize = async () => {
  await sleep(5000);
  let client = await pgPool.connect().catch();
  console.log('connected to db');
  await client.query(
    `CREATE TABLE IF NOT EXISTS "products" (
      "productId"  SERIAL ,
      "name" VARCHAR(255),
      "images" VARCHAR(255)[],
      "sizes" JSON,
      "retailPrice" REAL,
      "salePrice" REAL,
      "reviewCount" REAL,
      "reviewRating" REAL,
      "tags" VARCHAR(255)[],
      "colors" VARCHAR(255)[],
      "heartToggle" BOOLEAN,
      PRIMARY KEY ("productId")
      )`
  );
  await client.query(
    `CREATE INDEX IF NOT EXISTS "products_name"
    ON "products" USING hash ("name")`
  );
  await client.query(
    `CREATE INDEX IF NOT EXISTS "products_productId"
    ON "products" USING hash ("productId")`
  );
  client.release();
};

module.exports.pgPool = pgPool;

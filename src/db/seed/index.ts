const main = async () => {
  // await userFactory(10);
  try {
    // const tables = await db.execute(
    //   sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`
    // );
    // for (const table of tables) {
    // console.log(table.table_name);
    // if (table.table_name) {
    //   await db.execute(sql.raw(`TRUNCATE TABLE ${table.table_name}`));
    // }
    // }
  } catch (error) {
    console.log("Error seeding users: ", error);
  }
  process.exit(0);
};

main();

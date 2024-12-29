
import { faker } from "@faker-js/faker";
import db from "../index";
import { user } from "../schema/index";

const userFactory = async (count: number) => {
  try {
    const fakeusers = [];
    for (let i = 0; i < count; i++) {
      const user = {
        uid: faker.string.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number({ style: "national" }).substring(0, 11),
        phoneVerified: faker.datatype.boolean(),
        emailVerified: faker.datatype.boolean(),
        confirmationCode: faker.string.numeric({ length: 6 }),
        confirmationCodeSentAt: faker.date.recent(),
        confirmedAt: faker.date.recent(),
        isActivated: faker.datatype.boolean(),
        deviceId: faker.string.uuid(),
        photoUrl: faker.image.avatar(),
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        platform: faker.helpers.arrayElement(["WEB", "ANDROID", "IOS"]),
        lastSignedInAt: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      };
      fakeusers.push(user);
    }
    await db.insert(user).values(fakeusers);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default userFactory;

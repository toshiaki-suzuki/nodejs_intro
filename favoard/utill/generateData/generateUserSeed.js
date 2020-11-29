const { v5: uuidv5  } = require('uuid');
const users = ['John', 'Alex', 'Sam', 'Mary'];
const USERS_NAME_SPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
const makeSampleUserDataList = () => {
  let sampleUserList = [];
  for(let i=0; i < users.length; i++) {
    sampleUserList.push({
      id: uuidv5(users[i], USERS_NAME_SPACE),
      name: users[i],
      password: 'password',
      mail: 'example@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return sampleUserList;
};
module.exports = {
  users,
  USERS_NAME_SPACE,
  makeSampleUserDataList
};

const { v5: uuidv5 } = require('uuid');
const { users, USERS_NAME_SPACE } = require('./generateUserSeed');
ARTICLES_NAME_SPACE= '710b962e-041c-11e1-9234-0123456789ab';
const makeSampleArticleDataList = ()=> {
  let sampleArticleList = [];
  for(let i=0; i < users.length; i++) {
    let title = `${users[i]}'s article`;
    sampleArticleList.push({
      id: uuidv5(title, ARTICLES_NAME_SPACE),
      title: title,
      content: `This article was written by ${users[i]}`,
      user_id: uuidv5(users[i], USERS_NAME_SPACE),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return sampleArticleList;
};

module.exports = {
  ARTICLES_NAME_SPACE,
  makeSampleArticleDataList,
}
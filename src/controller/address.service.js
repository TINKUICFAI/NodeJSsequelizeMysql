const config = require("config.json");
const db = require("_helpers/db");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};


async function getAll() {
  return await db.Address.findAll();
}

async function getById(id) {
  return await getAddress(id);
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { username: params.username } })) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  console.log("params", params);

  console.log("paramAddsd", params.Address);

  // save user
  const result = await db.User.create(params);
 
    console.log("result",result.id);

  //save Address
  // await db.Address.create({UserId:result.id, ...params.Address})

  await ({UserId:result.id, ...params.Address.forEach(element => {
    console.log("Elemejfh",element);
   db.Address.create({UserId:result.id,...element})
    
  })})
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const usernameChanged = params.username && user.username !== params.username;
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { username: params.username } }))
  ) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

const Clients = require("../models/client");

const createClient = (connectDate) => {
  const client = new Clients({
    connected: connectDate,
  });

  return new Promise(function (resolve, reject) {
    client
      .save()
      .then((result) => {
        resolve(result._id);
      })
      .catch((err) => console.error(err));
  });
};

const getClients = (_req, res) => {
  Clients.find()
    .then((clients) => {
       res.status(200).json(clients);
    })
    .catch((err) => console.error(err));
};

const deleteClients = () => {
  Clients
    .deleteMany()
    .catch((err) => console.error(err));
};

const updateClient = (id, data, io) => {

    const client = Clients.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    }).then(() => {
    
    }).catch((err) => console.error(err));
};

module.exports = {
  createClient,
  getClients,
  deleteClients,
  updateClient,
};

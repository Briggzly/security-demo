const bcrypt = require("bcrypt");

let chats = [];

module.exports = {
  createMessage: (req, res) => {
    console.log(req.body);
    const { pin, message } = req.body;

    if (message !== "" && pin !== "") {
      for (let i = 0; i < chats.length; i++) {
        const existingPin = bcrypt.compareSync(pin, chats[i].hashedPin);
        if (existingPin) {
          chats[i].messages.push(message);

          let secureMessage = { ...chats[i] };
          delete secureMessage.hashedPin;
          res.status(200).send(secureMessage);
          console.log(secureMessage);
          return;
        }
      }

      const salt = bcrypt.genSaltSync(12);
      const hashedPin = bcrypt.hashSync(pin, salt);

      let chatObj = {
        hashedPin,
        messages: [message],
      };

      chats.push(chatObj);

      let secureChatObj = { ...chatObj };

      delete secureChatObj.hashedPin;
      console.log(secureChatObj);
      res.status(200).send(secureChatObj);
    } else {
      res.sendStatus(400);
    }
  },
};

/* eslint-disable no-undef */
import { connect } from 'mongoose';
import { config } from 'dotenv';

(async () => {
  config();
  await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((bd) => console.log('DB ok', bd.connection.name))
    .catch((err) => console.log(err));
})();

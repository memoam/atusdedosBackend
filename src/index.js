/* eslint-disable no-undef */
import app from './app';
import './database';

// Settings
app.set('port', process.env.PORT || 4000);

//Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

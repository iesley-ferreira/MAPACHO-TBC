import { BlingLib } from '../mapacho-bling/src'

const bling = new BlingLib();

(async () => {
  const requestBling = await bling.initializer({
    authCode: '1c30ccd50fd5369c19f896ea3b5dc77bda6922a1',
    clientId: 'b65118d576a52ee94dba17f4718bd6fbe5177d5a',
    clientSecret: 'b32f647bd811ce9ea2c6e94586a53e3aa225838ea7e39ab820a2c70df7fa',
  });

  console.log(requestBling);
})()





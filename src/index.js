const { SuperfaceClient } = require('@superfaceai/one-sdk');

const run = async () => {
  // You can manage tokens here: https://superface.ai/insights
  const sdk = new SuperfaceClient({ 
     sdkAuthToken: 'sfs_7d91bd9bf504dae81a942c946ee0fbf4d0c17aee09e26772d86415b4820e5c74efd14bc5848c9c1493c3b869abb2521eebe97e4e52a07fbf24103a6b6c655ca8_62814778',
     superfacePath: 'superface1/super.json'});

    // Load the profile
  const profile = await sdk.getProfile('weather/current-city');

  // Use the profile
  const result = await profile
    .getUseCase('GetCurrentWeatherInCity')
    .perform({
      city: 'Prague, Czech Republic',
      units: 'C'
    }, {
      provider: 'wttr-in'
    });

  // Handle the result
  try {
    const data = result.unwrap();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

run();
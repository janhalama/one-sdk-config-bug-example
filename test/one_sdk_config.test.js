const { SuperfaceClient, SDKExecutionError } = require("@superfaceai/one-sdk");

describe("OneSDK config", () => {
  afterEach(() => {
    process.env.SUPERFACE_PATH = undefined;
  })

  it("should throw if default `superfacePath` is used", async () => {
    const sdk = new SuperfaceClient();
  
    //the profile is not installed in default superface/super.json location
    await expect(sdk.getProfile('weather/current-city')).rejects.toThrowError(SDKExecutionError); 
  });

  it("should get profile if `superfacePath` is configured using SuperfaceClient options parameter", async () => {
   const sdk = new SuperfaceClient({
      superfacePath: 'superface1/super.json'});
 
   const profile = await sdk.getProfile('weather/current-city');
 
    expect(profile).toBeTruthy();
  });

  it("should get profile if `superfacePath` is configured using env variable", async () => {
    process.env.SUPERFACE_PATH = 'superface1/super.json';

    const sdk = new SuperfaceClient();
  
    const profile = await sdk.getProfile('weather/current-city');
  
     expect(profile).toBeTruthy();
   });

   it("should get profile if `superfacePath` is configured using env variable and SuperfaceClient options param is defined", async () => {
    process.env.SUPERFACE_PATH = 'superface1/super.json';

    const sdk = new SuperfaceClient({});
  
    const profile = await sdk.getProfile('weather/current-city'); //this line throws SDKExecutionError error, because default Superface path is used
  
     expect(profile).toBeTruthy();
   });
});
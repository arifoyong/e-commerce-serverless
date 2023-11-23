const config = {
  s3: {
    REGION:"ap-southeast-1",
    BUCKET:"archipelago-coffee-api-dev-attachmentsbucket-b1tbaio50wjc",
  },
  cognito: {
    USER_POOL_ID: "ap-southeast-1_JckV9xyBt",
    APP_CLIENT_ID: "2fsjulonadt4vfnob5rf5fkn5p",
    REGION: "ap-southeast-1",
    IDENTITY_POOL_ID: "ap-southeast-1:05d4b14e-532e-467b-ad8a-75205e1894d5"
  },
  apiGateway: {
    URL: "https://a374gd7c6j.execute-api.ap-southeast-1.amazonaws.com/dev",
    REGION: "ap-southeast-1"
  },
  cdn: {
    URL: "https://d2qiddtpnkk837.cloudfront.net"
  },
  MAX_ATTACHMENT_SIZE: 1000000,
  PRODUCTS_PER_PAGE: 10
}

export default config
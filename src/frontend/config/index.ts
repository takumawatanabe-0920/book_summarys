export const WebOrigin =
  process.env.NODE_ENV === 'production'
    ? 'http://sharesummary.com'
    : `${process.env.HOST}${process.env.PORT}`;

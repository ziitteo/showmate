const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // 프록시 경로
    createProxyMiddleware({
      target: 'https://kopis.or.kr', // 외부 API의 기본 URL
      changeOrigin: true, // CORS 문제를 우회하기 위해 원본 변경
      pathRewrite: {
        '^/api': '', // API 호출 시 '/api'로 시작하는 경로를 제거
      },
    }),
  );
};

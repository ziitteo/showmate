const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    // 로컬 개발 환경에서만 프록시 설정
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://kopis.or.kr',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // '/api'로 시작하는 경로 제거
        },
      }),
    );
  }
};

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === 'development'
        ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
        : [])
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/theme.less"
        )
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
        modifyLessRule: function(lessRule, _context) {
          lessRule.test = /\.(less)$/;
          lessRule.exclude = path.join(__dirname, 'node_modules');
          return lessRule;
        },
      },
    },
  ],
}

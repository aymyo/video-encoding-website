module.exports = {
    async headers() {
      return [
        {
          source: '/video-encoder-converter-online',
          headers: [
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            },
          ],
        },
      ]
    },
  }
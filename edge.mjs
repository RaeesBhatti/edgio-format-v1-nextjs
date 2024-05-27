const config = {
  localDev: {
    edgioDevServer: {
      port: 3000,
      host: "localhost",
    },
  },
  build: {
    "cloud-functions": {
      "nextjs-app": {
        directory: "./.next/standalone",
      },
    },
  },
  cloudRuntime: "nodejs20.x",
  origins: [
    {
      name: "test-origin",
      override_host_header: "test-origin.edgio.net",
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: "test-origin.edgio.net",
        },
      ],
      tls_verify: {
        use_sni: true,
      },
    },
  ],
  rules: [
    {
      origin: {
        set_origin: "edgio_serverless",
      },
      headers: {
        set_request_headers: {
          "x-cloud-function": "nextjs-app",
        },
      },
    },
    // {
    //   if: [
    //     { "==": [{ request: "path" }, "/hello-world"] },
    //     {
    //       headers: {
    //         set_request_headers: {
    //           "x-cloud-function": "hello-world",
    //         },
    //       },
    //     },
    //   ],
    // },
  ],
};

export default config;
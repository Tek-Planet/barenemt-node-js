const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Barenemt',
        version: '1.0.0',
        description: 'API Documentation',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Update with your server URL
          description: 'Local Development Server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Update with the path to your route files
  };
  
  module.exports = swaggerOptions;
  
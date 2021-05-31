const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Yan', lastName: 'Stoyanov'},
    {id: 3, firstName: 'Test', lastName: 'Test'},
  ];

  res.json(customers);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);

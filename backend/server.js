  const data = JSON.parse(fs.readFileSync('data.json'));
  products = data.products || products;
  orders = data.orders || orders;
}
// Routes sederhana
app.get('/api/products', (req, res) => res.json(products));
app.post('/api/orders', (req, res) => {
  const newOrder = { id: orders.length + 1, ...req.body, date: new Date().toISOString() };
  orders.push(newOrder);
  // Simpan ke file
  fs.writeFileSync('data.json', JSON.stringify({ products, orders }));
  res.json(newOrder);
});
app.get('/api/orders', (req, res) => res.json(orders));  // Untuk admin
// Login sederhana (hardcode dulu)
app.post('/api/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin123') {
    res.json({ success: true, token: 'fake-token' });
  } else {
    res.json({ success: false });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));

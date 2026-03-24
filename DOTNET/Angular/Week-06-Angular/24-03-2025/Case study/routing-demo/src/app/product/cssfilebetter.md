.product-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Product Header */
.product-header {
  text-align: center;
  margin-bottom: 50px;
  padding: 40px 0;
}

.product-header h1 {
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
}

.product-header h1::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin: 10px auto 0;
  border-radius: 2px;
}

.product-header p {
  font-size: 1.1rem;
  color: #666;
  margin-top: 20px;
}

/* Filters Section */
.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 600;
  color: #333;
}

.filter-select {
  padding: 10px 15px;
  border: 2px solid #667eea;
  border-radius: 6px;
  background-color: white;
  color: #333;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.filter-select:hover,
.filter-select:focus {
  border-color: #764ba2;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  outline: none;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.25);
}

.product-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.product-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.product-card:hover .product-image::after {
  background: rgba(0, 0, 0, 0.2);
}

.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-info h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
  line-height: 1.5;
  flex: 1;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.stars {
  font-size: 1rem;
}

.rating-count {
  color: #999;
  font-size: 0.85rem;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.add-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.add-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.add-btn:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .product-header h1 {
    font-size: 2rem;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .product-card {
    margin-bottom: 10px;
  }
}
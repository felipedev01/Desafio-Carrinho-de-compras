import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
   const [products, setProducts] = useState<ProductFormatted[]>([]);
   const { addProduct, cart } = useCart();

   console.log()
   const cartItemsAmount = cart.reduce((sumAmount, product) => {
      const newSumAmount= {...sumAmount}

      newSumAmount[product.id] = product.amount

      return newSumAmount
      
   }, {} as CartItemsAmount)
  
   
   
  useEffect(() => {
    async function loadProducts() {
      api.get('products').then(response =>setProducts(response.data))
    }

    loadProducts();
  }, []);

  console.log(products)
  function handleAddProduct(id: number) {
    addProduct(id)
    
  }

  return (
    <ProductList>
      {products.map(prod => 

<li key={prod.id}>
<img src={prod.image}alt="Tênis de Caminhada Leve Confortável" />
<strong>{prod.title}</strong>
<span>{prod.price}</span>
<button
  type="button"
  data-testid="add-product-button"
onClick={() => handleAddProduct(prod.id)}
>
  <div data-testid="cart-product-quantity">
    <MdAddShoppingCart size={16} color="#FFF" />
    {cartItemsAmount[prod.id] || 0}  
  </div>

  <span>ADICIONAR AO CARRINHO</span>
</button>
</li>

      

      )}
     
    </ProductList>
  );
};

export default Home;

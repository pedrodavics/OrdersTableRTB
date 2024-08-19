<template>
    <div>
      <h1 class="title">Order Management Table</h1>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Seller ID</th>
            <th>Seller Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.orderId">
            <td>{{ order.orderId }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.seller }}</td>
            <td>{{ getSellerInfo(order.seller).id }}</td>
            <td>{{ getSellerInfo(order.seller).name }}</td>
            <td>{{ order.country }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        orders: [],
        sellers: []
      };
    },
    methods: {
      fetchOrders() {
        axios.get('http://localhost:5000/api/orders')
          .then(response => {
            this.orders = response.data;
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      },
      fetchSellers() {
        axios.get('http://localhost:5000/api/sellers')
          .then(response => {
            this.sellers = response.data;
          })
          .catch(error => {
            console.error('Error fetching sellers:', error);
          });
      },
      getSellerInfo(sellerId) {
        const seller = this.sellers.find(seller => seller.id === sellerId);
        return seller ? seller : { id: 'Unknown', name: 'Unknown Seller' };
      }
    },
    created() {
      this.fetchOrders();
      this.fetchSellers();
    }
  };
  </script>
  <style scoped>
  .title {
    color: black;
    font-size: 50px;
    text-align: left;
    margin-left: 30px;
    margin-bottom: 20px;
    width: fit-content;
  }
  </style>
  
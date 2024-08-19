<template>
    <div>
        <h1 class="title">Order Management Table</h1>
            <div class="filters-container">
                <div class="filter-item">
                    <label for="product-filter">Filter by Product:</label>
                    <select id="product-filter" v-model="selectedProduct">
                        <option value="">All Products</option>
                        <option v-for="product in uniqueProducts" :key="product" :value="product">
                            {{ product }}
                        </option>
                    </select>
                </div>
                <div class="filter-item">
                    <label for="country-filter">Filter by Country:</label>
                    <select id="country-filter" v-model="selectedCountry">
                        <option value="">All Countries</option>
                        <option v-for="country in uniqueCountries" :key="country" :value="country">
                            {{ country }}
                        </option>
                    </select>
                </div>
            </div>
        
        <div class="table-container">
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
                <tr v-for="order in paginatedOrders" :key="order.orderid">
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

        <div class="pagination-container">
            <div class="pagination-controls">
                <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
                <button 
                    v-for="page in totalPages" 
                    :key="page" 
                    @click="goToPage(page)"
                    :class="{ 'active-page': page === currentPage }" 
                    :disable="page === currentPage"
                >
                {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export  default {
    data() {
        return {
            orders: [],
            sellers: [],
            selectedProduct: '',
            selectedCountry: '',
            currentPage: 1,
            itemsPerPage: 8,
        };
    },
    computed: {
        uniqueProducts() {
            return [...new Set(this.orders.map(order => order.product))];
        },
        uniqueCountries() {
            return [...new Set(this.orders.map(order => order.country))];
        },
        filteredOrders() {
            return this.orders.filter(order => {
                return (
                    (this.selectedProduct === '' || order.product === this.selectedProduct) &&
                    (this.selectedCountry === '' || order.country === this.selectedCountry)
                );
            });
         },
         paginatedOrders() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredOrders.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
        }
    },
    methods: {
        fetchOrders() {
            axios.get('http://localhost:5000/api/orders')
                .then(response => {
                    console.log(response.data);
                    this.orders = response.data;
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        },
        fetchSellers() {
            axios.get('http://localhost:5000/api/sellers')
                .then(response => {
                    console.log(response.data);
                    this.sellers = response.data;
                })
                .catch(error => {
                    console.error('Error fetching sellers:', error);
                });
        },
        getSellerInfo(sellerId) {
        try {
            const seller = this.sellers.find(seller => seller.id === sellerId);
            if (seller) {
                return seller;
            } else {
                return {
                    id: 'sellerId',
                    name: 'Unknown Seller'
                };
            }
        } catch (error) {
            console.error('Error getting seller info:', error);
            return {
                id: 'unknown',
                name: 'Unknown Seller'
            };
        }
        },
        previousPage() {
        try {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        } catch (error) {
            console.error('Error navigating to previous page:', error);
        }
    },
    nextPage() {
        try {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        } catch (error) {
            console.error('Error navigating to next page:', error);
        }
    },
    goToPage(page) {
        try {
            this.currentPage = page;
        } catch (error) {
            console.error('Error navigating to page:', error);
        }
    }
    },
    created() {
        this.fetchOrders();
        this.fetchSellers();
    },
    mounted() {
        this.fetchOrders();
    }
}
</script>

<style scoped>
* {
    font-family: 'Roboto', sans-serif;
}
.table-container {
    width: 80%;
    max-width: 1200px;
    margin: 20px auto;
    border: 1px solid #ddd;
    padding: 10px;
    position: relative;
}
.filters-container {
    text-align: center;
    margin-bottom: 20px;
}
.filter-item {
    display: inline-block;
    margin-right: 20px;
    margin-left: 30px;
}
.filter-item label {
    margin-bottom: 5px;
}
.filter-item select {
    padding: 5px;
    font-size: 16px;
    margin-left: 10px;
}
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #008cff;
    color: white;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

select {
    padding: 5px;
    font-size: 16px;
}
button {
    margin: 5px;
    padding: 5px 10px;
    font-size: 16px;
    border: 1px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}
button.active-page {
    font-weight: bold;
    background-color: #e0e0e0;
}
button:hover {
    background-color: #d0d0d0;
}
.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.pagination-controls {
    display: flex;
    gap: 10px;
}
.title {
    color: black;
    font-size: 50px;
    text-align: left;
    margin-left: 30px;
    margin-bottom: 20px;
    width: fit-content;
}
</style>
  
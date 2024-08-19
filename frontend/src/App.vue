<template>
  <div id="app">
    <nav>
      <router-link to="/">Orders</router-link>
      <router-link to="/info">Info</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  background-color: #250dad;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid white;
  transition: border-width 0.15s ease-in-out;
}
nav a:hover {
  border-width: 4px;
}
.active-link {
  border-width: 4px;
}
</style>


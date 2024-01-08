<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView></RouterView>
</template>

<style>
:root {
  --primary-color: #eee8a9;
  --primary-color-hover: #e5df9d;

  --primary-text-color: #181a22;
  --secondary-text-color: #a8adc0;

  --darkest-background: #181a22;
  --darker-background: #2f3341;
  --dark-background: #353a4a;

  --dark-elements: #1e212a;

  --primary-radius: 9px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  min-height: 100vh;
  background: var(--darkest-background);
  font-family: Inter, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
  color: #fff;
}

p {
  color: #fff;
  font-size: 1rem;
}

.mb-24 {
  margin-bottom: 24px;
}

.mb-16 {
  margin-bottom: 16px;
}

.mt-24 {
  margin-top: 24px;
}

.mt-16 {
  margin-top: 16px;
}

.icon24 {
  width: 24px;
  height: 24px;
}

.red-text {
  color: rgb(231, 68, 68);
}

input[type='text'],
input[type='email'],
input[type='password'] {
  background: var(--darker-background);
  color: #fff;
  height: 48px;
  border-radius: var(--primary-radius);
  border: none;
  padding: 0 16px;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
}

input::placeholder {
  color: var(--secondary-text-color);
}

input[type='text']:active,
input[type='password']:active,
input[type='email']:active,
input[type='text']:focus,
input[type='password']:focus,
input[type='email']:focus {
  outline: none;
  background: var(--dark-background);
}

.btn {
  display: flex;
  background: var(--primary-color);
  color: var(--dark-color);
  text-decoration: none;
  border: none;
  border-radius: var(--primary-radius);
  --smooth-corners: 10;
  height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  font-weight: 500;
  font-size: 1rem;
}

.btn:hover {
  background: var(--primary-color-hover);
  color: var(--primary-text-color-);
  cursor: pointer;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  color: var(--primary-color-hover);
}

.container {
  display: grid;
  height: 100vh;
  width: 100vw;
}
</style>

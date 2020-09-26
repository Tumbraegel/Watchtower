<template>
    <div class='container-fluid'>
      <br>
      <h4 style="margin-bottom: 20px;">About this project:</h4>
      <p>This website was developed by Daniela Tumbraegel.</p>
      <p>Your email, username and password are stored in a database if you register an account.</p>
      <p>You can delete all data related to your account by going to your <router-link :to="{ name: 'profile' }">profile page</router-link> and using the <span class="badge badge-danger">Delete Account</span> button.</p>
      <p>This will remove any personal data as well as the collected information about reviews, comments etc. from the database indefinitely.</p>
    </div>
</template>

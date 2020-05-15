<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">
        <img src="../../assets/logo.jpg" width="35" height="35" alt="Watchtower Logo">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item active">
            <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item active">
            <router-link to="/genres" class="nav-link">Genres</router-link>
        </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button type="button" class="btn btn-dark my-2 my-sm-0">Sign Up</button>
    </div>
    </nav>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style scoped>

</style>
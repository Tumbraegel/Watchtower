<template>
  <div class="film-single">
    <section class="film-banner">
        <div class="container">
          <h1 class="title">
            Film Title
          </h1>
          <h2 class="subtitle ">
            Film Details
          </h2>
        </div>
    </section>
    <section class="film-content">
      <div class="container">
        <p class="description">Film description</p>
        <p class="">Plot:</p>
        <p class="">Genre:</p>
        <p class="">Cast:</p>
        <div class="film-image">
          <div class="">
            IMAGE PLACEHOLDER
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .film-banner{
    background-color: #00d1b2;
    color: #fff;
    font-weight: 200;
    line-height: 1.5;
    padding: 20px 0 20px;
    margin-bottom: 30px;
  }
  .film-single {
    margin-top: 30px;
  }
  .film-image {
    margin-top: 50px;
  }
  .description {
    margin-bottom: 30px;
  }
</style>
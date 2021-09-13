<template>
  <header class="flex">
    <div class="branding flex flex-column">
      <i class="fas fa-fw fa-building fa-2x"></i>
      <div>Office</div>
      <div>man</div>
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: #3a8ecb;
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #252945;
    color: #fff;
    justify-content: center;
    padding: 20px;
    @media (min-width: 900px) {
      width: 100%;
    }

    img {
      width: auto;
      height: 30px;
    }
  }
}
</style>

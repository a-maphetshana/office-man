<template>
  <router-link
    class="office flex"
    :to="{ name: 'Office', params: { officeId: office.officeId } }"
  >
    <div class="office-avatar">
      <i class="fas fa-fw fa-user-friends fa-3x"></i>
      <br />
      <span class="office-capacity"
        >{{ office.officeStaffList.length }}/{{ office.officeCapacity }}</span
      >
    </div>
    <div class="left">
      <span class="office-name">{{ office.officeName }}</span>
      <br />
      <span class="address"
        ><i class="fas fa-fw fa-map-marker"></i>
        {{ office.officeLocation }}</span
      >
      <br />
      <span class="email"
        ><i class="fas fa-fw fa-envelope"></i> {{ office.officeEmail }}</span
      >
    </div>
    <div class="right flex">
      <span class="phone"
        ><i class="fas fa-fw fa-phone"></i> {{ office.officeTell }}</span
      >
      <div class="icon">
        <i class="fas fa-fw fa-arrow-right"></i>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "office",
  props: ["office"],
};
</script>

<style lang="scss" scoped>
.office {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 70%;
    gap: 16px;

    span {
      flex: 1;
    }

    .office-name {
      text-transform: capitalize;
      font-weight: bold;
      font-size: 16px;
    }

    .office-avatar {
      max-width: 80px;
      .office-capacity {
        flex: 1;
        font-size: 16px;
        font-weight: 600px;
        padding-left: 40px;
      }
    }
  }

  .right {
    gap: 16px;
    flex-basis: 30%;
    align-items: center;

    .phone {
      flex: 1;
       max-width: 100px;
    }
  }
}
</style>

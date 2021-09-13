<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Offices</h1>
        <span>There are {{ officeData.length }} total offices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span class="filter-text">Filter by capacity
            <span v-if="filteredOffice">: {{ filteredOffice }}</span></span
          >
          <i class="fas fa-fw fa-angle-down"></i>
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredOffices">Filled</li>
            <li @click="filteredOffices">Available</li>
            <li @click="filteredOffices">Clear Filter</li>
          </ul>
        </div>
        <div @click="newOffice" class="button flex">
          <div>
            <i class="fas fa-fw fa-plus"></i>
          </div>
          <span>Add Office</span>
        </div>
      </div>
    </div>
    <!-- Offices -->
    <div v-if="officeData.length > 0">
      <Office
        v-for="(office, index) in filteredData"
        :office="office"
        :key="index"
      />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>
        Add an office by clicking the Add Office button and get started
      </p>
    </div>
  </div>
</template>

<script>
import Office from "../components/Office";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredOffice: null,
    };
  },
  components: {
    Office,
  },
  methods: {
    ...mapMutations(["TOGGLE_OFFICE"]),
    newOffice() {
      this.TOGGLE_OFFICE();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filteredOffices(e) {
      if (e.target.innerText === "Clear Filter") {
        this.filteredOffice = null;
        return;
      }
      this.filteredOffice = e.target.innerText;
    },
  },
  computed: {
    ...mapState(["officeData"]),

    filteredData() {
      return this.officeData.filter((office) => {
        if (this.filteredOffice === "Filled") {
          return office.officeCapacity <= office.officeStaffList.length;
        }
        if (this.filteredOffice === "Available") {
          return office.officeCapacity > office.officeStaffList.length;
        }
        return office;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .filter-text{
        font-size: 16px;
        font-weight: bold;
      }

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #252945;
        border-radius: 40px;
      }
    }
  }

  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>

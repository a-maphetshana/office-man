<template>
  <div v-if="currentOffice" class="office-view container">
    <div class="office-details flex flex-column">
      <div class="header flex">
        <div class="left flex">
          <router-link class="nav-link" :to="{ name: 'Home' }">
            <i class="fas fa-fw fa-arrow-left fa-2x"></i>
          </router-link>
          <div class="office-name">
            {{ currentOffice.officeName }}
          </div>
        </div>
        <div class="right flex">
          <button @click="toggleEditOffice" class="dark-purple">Edit</button>
          <button @click="deleteOffice(currentOffice.docId)" class="red">
            Delete
          </button>
        </div>
      </div>
      <div class="middle flex">
        <div class="details flex flex-column">
          <p>Address: {{ currentOffice.officeLocation }}</p>
          <p>Email: {{ currentOffice.officeEmail }}</p>
          <p>Office Tell: {{ currentOffice.officeTell }}</p>
          <p>Max Capacity: {{ currentOffice.officeCapacity }}</p>
        </div>
      </div>
    </div>

    <div class="staff-search flex flex-column"
    >
      <div class="input flex">
        <input
          required
          type="text"
          id="filterText"
          v-model="filterText"
          placeholder="Search"
        />
      </div>
      <div class="flex">
        <div class="left flex">
          Staff Members {{ currentOffice.officeStaffList.length }}/{{
            currentOffice.officeCapacity
          }}
        </div>
        <div class="right">
          <div @click="newStaff" class="button">
            <span>Add Staff</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentOffice.officeStaffList.length > 0"
      class="bottom flex flex-column"
    >
      <div class="staff-members">
        <div
          v-for="(staff, index) in filteredData"
          :key="index"
          class="item flex"
        >
          <div class="staff-avatar">
            <i class="fas fa-fw fa-user fa-2x"></i>
          </div>
          <div class="staff-name">
            {{ staff.firstName }} {{ staff.lastName }}
          </div>
          <div>
            <i class="fas fa-fw fa-ellipsis-v"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>Add office by clicking the Add Staff button and get started</p>
    </div>
    <div
      v-if="currentOffice.officeStaffList.length > 0 && filterText != null && filteredData.length === 0"
      class="empty-search flex flex-column"
    >
      <h3>Search yielded no results...</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "officeView",
  data() {
    return {
      currentOffice: null,
      filterText: null,
    };
  },
  created() {
    this.getCurrentOffice();
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_OFFICE",
      "TOGGLE_EDIT_OFFICE",
      "TOGGLE_OFFICE",
    ]),

    ...mapActions(["DELETE_OFFICE"]),

    getCurrentOffice() {
      this.SET_CURRENT_OFFICE(this.$route.params.officeId);
      this.currentOffice = this.currentOfficeArray[0];
    },

    toggleEditOffice() {
      this.TOGGLE_EDIT_OFFICE();
      this.TOGGLE_OFFICE();
    },

    async deleteOffice(docId) {
      await this.DELETE_OFFICE(docId);
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    ...mapState(["currentOfficeArray", "editOffice", "currentOffice"]),
    filteredData() {
      return this.currentOffice.officeStaffList.filter((staff) => {
        if (this.filterText != null) {
          return (
            staff.firstName.toLowerCase().includes(this.filterText.toLowerCase()) ||
            staff.lastName.toLowerCase().includes(this.filterText.toLowerCase())
          );
        }
        return staff;
      });
    },
  },
  watch: {
    editOffice() {
      if (!this.editOffice) {
        this.currentOffice = this.currentOfficeArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.office-view {
  .header,
  .office-details {
    background-color: #1e2139;
    border-radius: 0 0 20px 20px;
  }

  .header {
    align-items: center;
    font-size: 12px;
    .left {
      align-items: center;
      .nav-link {
        align-items: center;
        color: #fff;
        font-size: 12px;
      }
      .office-name {
        font-size: 24px;
        text-transform: capitalize;
        color: #fff;
        margin-left: 50px;
        margin-bottom: 8px;
      }

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .office-details {
    padding: 28px;
    margin-top: 24px;

    .middle {
      margin-top: 10px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .details {
        flex: 1;
      }

      .details {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }
    }
  }

  .staff-search {
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 18px;
    color: #fff;
    padding: 12px;

    .input {
      margin: 5px;
    }

    input {
      width: 100%;
      background-color: #fff;
      border: 1px solid #1e2139;
      color: #000;
      border-radius: 4px;
      padding: 4px 4px;
      border: none;

      &:focus {
        outline: none;
      }
    }
    .button {
      padding: 8px 10px;
      background-color: #252945;
      border-radius: 40px;
    }
    .left {
      flex: 5;
      justify-content: flex-start;
    }
    .right {
      flex: 1;
      justify-content: flex-end;
    }
  }

  .bottom {
    margin-top: 20px;
    border-radius: 20px 20px 0 0;

    .staff-members {
      text-transform: capitalize;
      font-weight: bold;
      .heading {
        color: #dfe3fa;
        font-size: 12px;
        margin-bottom: 32px;

        p:first-child {
          // flex: 3;
          text-align: left;
        }

        p {
          flex: 1;
          text-align: right;
        }
      }

      .item {
        margin-bottom: 5px;
        font-size: 13px;
        color: #fff;
        background-color: #252945;
        padding: 12px;

        .staff-avatar {
          max-width: 30px;
          height: 30px;
          background-color: #3a8ecb;
          color: #fff;
          border-radius: 50%;
          margin-right: 30px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        div:first-child {
          flex: 0;
          text-align: left;
        }

        div {
          flex: 3;
          text-align: left;
        }
        div:last-child {
          text-align: right;
        }

        .staff-name {
          padding-top: 5px;
        }
      }
    }
  }
  .empty {
    margin-top: 40px;
    align-items: center;
    color: #fff;

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

  .empty-search {
    margin-top: 40px;
    align-items: center;
    color: #fff;
    h3 {
      font-size: 20px;
      margin-top: 40px;
    }
  }
}
</style>

<template>
  <div
    @click="checkClick"
    ref="officeWrap"
    class="office-wrap flex flex-column"
  >
    <form @submit.prevent="submitForm" class="office-content">
      <Loading v-show="loading" />
      <h1 v-if="!editOffice">Add Office</h1>
      <h1 v-else>Edit Office</h1>

      <div class="office-details flex flex-column">
        <div class="input flex flex-column">
          <label for="officeName">Office Name</label>
          <input required type="text" id="officeName" v-model="officeName" />
        </div>
        <div class="input flex flex-column">
          <label for="officeEmail">Email Address</label>
          <input required type="text" id="officeEmail" v-model="officeEmail" />
        </div>
        <div class="input flex flex-column">
          <label for="officeTell">Office Tell</label>
          <input required type="text" id="officeTell" v-model="officeTell" />
        </div>

        <div class="input flex flex-column">
          <label for="officeLocation">Address</label>
          <input
            required
            type="text"
            id="officeLocation"
            v-model="officeLocation"
          />
        </div>
        <div class="input flex flex-column">
          <label for="officeCapacity">Max number of occupants</label>
          <input
            required
            type="number"
            id="officeCapacity"
            v-model="officeCapacity"
          />
        </div>
        <div class="input flex flex-column">
          <label for="officeColor">Office Color</label>
          <select required type="text" id="officeColor" v-model="officeColor">
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Navy">Navy</option>
          </select>
        </div>
      </div>

      <!-- Office Work Details -->
      <div class="office-work flex flex-column">
        <div class="work-items">
          <h3>Staff Members</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">First Name</th>
              <th class="item-name">Last Name</th>
              <th></th>
            </tr>
            <tr
              class="table-items flex"
              v-for="(item, index) in officeStaffList"
              :key="index"
            >
              <td class="item-name">
                <input type="text" required v-model="item.firstName" />
              </td>
              <td class="item-name">
                <input type="text" required v-model="item.lastName" />
              </td>
              <td>
                <div
                  class="delete-button-icon"
                  @click="deleteOfficeItem(item.id)"
                >
                  <i class="fas fa-fw fa-trash fa-2x"></i>
                </div>
              </td>
            </tr>
          </table>

          <div @click="addNewOfficeItem" class="flex button">
            <i class="fas fa-fw fa-plus"></i>
            Add New Staff
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeOffice" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button
            v-if="!editOffice"
            type="submit"
            @click="publishOffice"
            class="dark-purple"
          >
            Create Office
          </button>
          <button v-if="editOffice" type="sumbit" class="dark-purple">
            Update Office
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { app } from "../firebase/firebaseInit";
import * as firestore from "firebase/firestore/lite";
import Loading from "../components/Loading";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";

const db = firestore.getFirestore(app);
export default {
  name: "officeModal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,
      officeName: null,
      officeEmail: null,
      officeLocation: null,
      officeTell: null,
      officeColor: null,
      officeStaffList: [],
      officeCapacity: 0,
    };
  },
  components: {
    Loading,
  },
  created() {
    if (this.editOffice) {
      const currentOffice = this.currentOfficeArray[0];
      this.docId = currentOffice.docId;
      this.officeId = currentOffice.officeId;
      this.officeName = currentOffice.officeName;
      this.officeEmail = currentOffice.officeEmail;
      this.officeLocation = currentOffice.officeLocation;
      this.officeTell = currentOffice.officeTell;
      this.officeColor = currentOffice.officeColor;
      this.officeStaffList = currentOffice.officeStaffList;
      this.officeCapacity = currentOffice.officeCapacity;
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_OFFICE", "TOGGLE_MODAL", "TOGGLE_EDIT_OFFICE"]),

    ...mapActions(["UPDATE_OFFICE", "GET_OFFICES"]),

    checkClick(e) {
      if (e.target === this.$refs.officeWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeOffice() {
      this.TOGGLE_OFFICE();
      if (this.editOffice) {
        this.TOGGLE_EDIT_OFFICE();
      }
    },

    addNewOfficeItem() {
      if (this.officeStaffList.length >= this.officeCapacity) {
        alert("Max number of occupants has been reached!");
        return;
      }

      this.officeStaffList.push({
        id: uid(24),
        officeId: this.officeId,
        firstName: "",
        lastName: ""
      });
    },

    deleteOfficeItem(id) {
      this.officeStaffList = this.officeStaffList.filter(
        (item) => item.id !== id
      );
    },

    async uploadOffice() {
      if (this.officeStaffList.length > this.officeCapacity) {
        alert("Max number of occupants has been reached!");
        return;
      }

      this.loading = true;

      const officeId = uid(24);

      const office = {
        officeId: officeId,
        officeName: this.officeName,
        officeEmail: this.officeEmail,
        officeLocation: this.officeLocation,
        officeTell: this.officeTell,
        officeColor: this.officeColor,
        officeStaffList: this.officeStaffList,
        officeCapacity: this.officeCapacity,
      };

      await firestore.addDoc(firestore.collection(db, "offices"), office);
      this.loading = false;

      this.TOGGLE_OFFICE();

      this.GET_OFFICES();
    },

    async updateOffice() {
      if (this.officeStaffList.length > this.officeCapacity) {
        alert("Max number of occupants has been reached!");
        return;
      }

      this.loading = true;

      const office = {
        officeName: this.officeName,
        officeEmail: this.officeEmail,
        officeLocation: this.officeLocation,
        officeTell: this.officeTell,
        officeColor: this.officeColor,
        officeStaffList: this.officeStaffList,
        officeCapacity: this.officeCapacity,
      };

      const officesCollection = firestore.collection(db, "offices");
      const officeSnapshot = await firestore.getDocs(officesCollection);
      let officeRef = null;

      officeSnapshot.docs.forEach((doc) => {
        if (this.docId === doc.id) {
          officeRef = doc.ref;
        }
      });

      if (officeRef) {
        await firestore.updateDoc(officeRef, office);
      }
      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.officeId,
      };

      this.UPDATE_OFFICE(data);
    },

    submitForm() {
      if (this.editOffice) {
        this.updateOffice();
        return;
      }
      this.uploadOffice();
    },
  },
  computed: {
    ...mapState(["editOffice", "currentOfficeArray"]),
  },
};
</script>

<style lang="scss" scoped>
.office-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .office-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;

    background-color: #3a8ecb;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #fff;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    .office-details {
      margin-bottom: 48px;
    }

    // Office Work

    .office-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            .delete-button-icon {
              color: red;
              cursor: pointer;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 12px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
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
}
</style>

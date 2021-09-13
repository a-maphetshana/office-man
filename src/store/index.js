import { createStore } from "vuex";
import { app } from "../firebase/firebaseInit";
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore/lite';

const db = getFirestore(app);

export default createStore({
  state: {
    officeData: [],
    officeModal: null,
    modalActive: null,
    officesLoaded: null,
    currentOfficeArray: null,
    editOffice: null,
  },
  mutations: {
    TOGGLE_OFFICE(state) {
      state.officeModal = !state.officeModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_OFFICE_DATA(state, payload) {
      state.officeData.push(payload);
    },
    OFFICES_LOADED(state) {
      state.officesLoaded = true;
    },
    SET_CURRENT_OFFICE(state, payload) {
      state.currentOfficeArray = state.officeData.filter((office) => {
        return office.officeId === payload;
      });
    },
    TOGGLE_EDIT_OFFICE(state) {
      state.editOffice = !state.editOffice;
    },
    DELETE_OFFICE(state, payload) {
      state.officeData = state.officeData.filter((office) => office.docId !== payload);
    },

  },
  actions: {
    async GET_OFFICES({ commit, state }) {

      const officesCollection = collection(db, 'offices');
      const officeSnapshot = await getDocs(officesCollection);

      officeSnapshot.docs.forEach((doc) => {
        if (!state.officeData.some((office) => office.docId === doc.id)) {
          const data = {
            docId: doc.id,
            officeId: doc.data().officeId,            
            officeName: doc.data().officeName,
            officeEmail: doc.data().officeEmail,
            officeLocation: doc.data().officeLocation,
            officeTell: doc.data().officeTell,           
            officeColor: doc.data().officeColor,            
            officeStaffList: doc.data().officeStaffList,
            officeCapacity: doc.data().officeCapacity,
          };
          commit("SET_OFFICE_DATA", data);
        }
      });
      commit("OFFICES_LOADED");
    },
    async UPDATE_OFFICE({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_OFFICE", docId);
      await dispatch("GET_OFFICES");
      commit("TOGGLE_OFFICE");
      commit("TOGGLE_EDIT_OFFICE");
      commit("SET_CURRENT_OFFICE", routeId);
    },
    async GET_OFFICE(docId) {
      const officesCollection = collection(db, "offices");
      const officeSnapshot = await getDocs(officesCollection);
      let officeRef = null;
      officeSnapshot.docs.forEach((doc) => {
        if (docId === doc.id) {
          officeRef = doc.ref;
        }
      });
      return officeRef;
    },
    async DELETE_OFFICE({ commit }, docId) {
      const officesCollection = collection(db, "offices");
      const officeSnapshot = await getDocs(officesCollection);
      let officeRef = null;
      officeSnapshot.docs.forEach((doc) => {
        if (docId === doc.id) {
          officeRef = doc.ref;
        }
      });
      await deleteDoc(officeRef);
      commit("DELETE_OFFICE", docId);
    },    
  },
  modules: {},
});

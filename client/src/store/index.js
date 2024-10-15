import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: () => ({
    employees: [],
    loading: false,
  }),
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    ADD_EMPLOYEE(state, employee) {
      state.employees.push(employee);
    },
    UPDATE_EMPLOYEE(state, updatedEmployee) {
      const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees.splice(index, 1, updatedEmployee);
      }
    },
    DELETE_EMPLOYEE(state, id) {
      state.employees = state.employees.filter(emp => emp.id !== id);
    },
  },
  actions: {
    async fetchEmployees({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/employees');
        commit('SET_EMPLOYEES', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addEmployee({ commit }, employee) {
      try {
        const response = await axios.post('http://localhost:3000/employees', employee);
        commit('ADD_EMPLOYEE', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateEmployee({ commit }, employee) {
      try {
        await axios.put(`http://localhost:3000/employees/${employee.id}`, employee);
        commit('UPDATE_EMPLOYEE', employee);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEmployee({ commit }, id) {
      try {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        commit('DELETE_EMPLOYEE', id);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    allEmployees: state => state.employees,
  }
})

export default store

<template>
  <div id="app">
    <button @click="showForm" class="add-button">Thêm mới nhân viên</button>
    <EmployeeList @edit="editEmployee" />
    
    <EmployeeForm 
      :visible="formVisible" 
      :employeeData="selectedEmployee" 
      :isEditing="isEditing" 
      @close="closeForm" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EmployeeList from './components/EmployeeList.vue';
import EmployeeForm from './components/EmployeeForm.vue'

const formVisible = ref(false)
const selectedEmployee = ref(null)
const isEditing = ref(false)

const showForm = () => {
  formVisible.value = true
  isEditing.value = false
  selectedEmployee.value = null
}

const closeForm = () => {
  formVisible.value = false
}

const editEmployee = (employee) => {
  formVisible.value = true
  selectedEmployee.value = employee
  isEditing.value = true
}
</script>

<style scoped>
#app {
  width: 80%;
  margin: 20px auto;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>

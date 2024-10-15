<template>
    <div v-if="visible" class="form-container">
      <div class="form-content">
        <h2>{{ isEditing ? 'Sửa nhân viên' : 'Thêm mới nhân viên' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Họ và tên:</label>
            <input type="text" v-model="employee.name" required />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" v-model="employee.email" required />
          </div>
          <div class="form-group">
            <label>Ngày sinh:</label>
            <input type="date" v-model="employee.dob" required />
          </div>
          <div class="form-group">
            <label>Địa chỉ:</label>
            <input type="text" v-model="employee.address" />
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn submit">{{ isEditing ? 'Cập nhật' : 'Thêm mới' }}</button>
            <button type="button" class="btn close" @click="closeForm">Đóng</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, watch } from 'vue'
  import { useStore } from 'vuex'
  
  const props = defineProps({
    visible: Boolean,
    employeeData: Object,
    isEditing: Boolean,
  })
  
  const emit = defineEmits(['close'])
  
  const store = useStore()
  
  const employee = reactive({
    name: '',
    email: '',
    dob: '',
    address: '',
  })
  
  watch(() => props.employeeData, (newVal) => {
    if (newVal) {
      Object.assign(employee, newVal)
    }
  })
  
  const handleSubmit = () => {
    if (props.isEditing) {
      store.dispatch('updateEmployee', employee)
    } else {
      store.dispatch('addEmployee', employee)
    }
    closeForm()
  }
  
  const closeForm = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .form-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  
  .btn.submit {
    background-color: #4CAF50;
  }
  
  .btn.close {
    background-color: #f44336;
  }
  </style>
  
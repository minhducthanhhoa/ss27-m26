<template>
    <div class="employee-list-container">
      <div class="header">
        <h2>Nhân viên</h2>
        <button class="btn add-employee" @click="openAddEmployeeForm">Thêm mới nhân viên</button>
        <input type="text" v-model="searchEmail" placeholder="Tìm kiếm theo email" @input="handleSearch" />
      </div>
  
      <table class="employee-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in filteredEmployees" :key="employee.id">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.birthdate }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.address }}</td>
            <td>
              <span :class="{'active-status': employee.active, 'inactive-status': !employee.active}">
                {{ employee.active ? 'Đang hoạt động' : 'Ngừng hoạt động' }}
              </span>
            </td>
            <td>
              <button class="btn block" v-if="employee.active" @click="confirmBlock(employee.id)">Chặn</button>
              <button class="btn unblock" v-else @click="unblockEmployee(employee.id)">Bỏ chặn</button>
              <button class="btn edit" @click="editEmployee(employee.id)">Sửa</button>
              <button class="btn delete" @click="confirmDelete(employee.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="pagination">
        <select v-model="rowsPerPage" @change="changeRowsPerPage">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <span>Hiển thị {{ rowsPerPage }} bản ghi trên trang</span>
      </div>
  
      <!-- Confirmation Modal -->
      <ConfirmationModal
        :visible="showModal"
        :title="modalTitle"
        :message="modalMessage"
        @confirm="handleModalConfirm"
        @cancel="closeModal"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import ConfirmationModal from './ConfirmationModal.vue'
  
  // Mock data: Tạm thời sử dụng dữ liệu giả để mô phỏng danh sách nhân viên
  const employees = ref([
    { id: 1, name: 'Nguyễn Văn A', birthdate: '28/02/1990', email: 'nvana@gmail.com', address: 'Ba Đình, Hà Nội', active: true },
    { id: 2, name: 'Trần Thị B', birthdate: '15/07/1985', email: 'ttb@gmail.com', address: 'Cầu Giấy, Hà Nội', active: false },
    { id: 3, name: 'Lê Văn C', birthdate: '03/10/2000', email: 'lvc@gmail.com', address: 'Hai Bà Trưng, Hà Nội', active: false },
    { id: 4, name: 'Phạm Thị D', birthdate: '20/05/1995', email: 'ptd@gmail.com', address: 'Hoàn Kiếm, Hà Nội', active: true },
    { id: 5, name: 'Ngô Văn E', birthdate: '12/11/1988', email: 'nve@gmail.com', address: 'Cầu Giấy, Hà Nội', active: true }
  ])
  
  const searchEmail = ref('')
  const showModal = ref(false)
  const modalTitle = ref('')
  const modalMessage = ref('')
  const modalAction = ref(null) // Action hiện tại đang cần xác nhận (block, delete)
  const selectedEmployeeId = ref(null)
  const rowsPerPage = ref(10)
  
  // Computed để lọc danh sách nhân viên theo email tìm kiếm
  const filteredEmployees = computed(() => {
    if (!searchEmail.value) return employees.value
    return employees.value.filter((emp) => emp.email.includes(searchEmail.value))
  })
  
  // Mở form thêm nhân viên
  const openAddEmployeeForm = () => {
    console.log('Mở form thêm nhân viên')
  }
  
  // Tìm kiếm nhân viên theo email
  const handleSearch = () => {
    console.log('Tìm kiếm email:', searchEmail.value)
  }
  
  // Chặn nhân viên
  const confirmBlock = (employeeId) => {
    selectedEmployeeId.value = employeeId
    modalTitle.value = 'Xác nhận chặn'
    modalMessage.value = 'Bạn có chắc chắn muốn chặn nhân viên này không?'
    modalAction.value = 'block'
    showModal.value = true
  }
  
  // Bỏ chặn nhân viên
  const unblockEmployee = (employeeId) => {
    const employee = employees.value.find((emp) => emp.id === employeeId)
    if (employee) {
      employee.active = true
      console.log(`Bỏ chặn nhân viên: ${employee.name}`)
    }
  }
  
  // Sửa thông tin nhân viên
  const editEmployee = (employeeId) => {
    console.log('Sửa nhân viên có ID:', employeeId)
  }
  
  // Xóa nhân viên
  const confirmDelete = (employeeId) => {
    selectedEmployeeId.value = employeeId
    modalTitle.value = 'Xác nhận xóa'
    modalMessage.value = 'Bạn có chắc chắn muốn xóa nhân viên này không?'
    modalAction.value = 'delete'
    showModal.value = true
  }
  
  // Xác nhận trong modal (chặn/xóa)
  const handleModalConfirm = () => {
    if (modalAction.value === 'block') {
      blockEmployee(selectedEmployeeId.value)
    } else if (modalAction.value === 'delete') {
      deleteEmployee(selectedEmployeeId.value)
    }
    closeModal()
  }
  
  // Thực hiện chặn nhân viên
  const blockEmployee = (employeeId) => {
    const employee = employees.value.find((emp) => emp.id === employeeId)
    if (employee) {
      employee.active = false
      console.log(`Chặn nhân viên: ${employee.name}`)
    }
  }
  
  // Thực hiện xóa nhân viên
  const deleteEmployee = (employeeId) => {
    employees.value = employees.value.filter((emp) => emp.id !== employeeId)
    console.log('Đã xóa nhân viên có ID:', employeeId)
  }
  
  // Đóng modal
  const closeModal = () => {
    showModal.value = false
  }
  
  // Thay đổi số bản ghi trên trang
  const changeRowsPerPage = () => {
    console.log(`Hiển thị ${rowsPerPage.value} bản ghi trên trang`)
  }
  </script>
  
  <style scoped>
  .employee-list-container {
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-employee {
    background-color: #4CAF50;
    color: white;
  }
  
  .employee-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .employee-table th,
  .employee-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .employee-table th {
    background-color: #f2f2f2;
  }
  
  .active-status {
    color: green;
    font-weight: bold;
  }
  
  .inactive-status {
    color: red;
    font-weight: bold;
  }
  
  .block {
    background-color: orange;
    color: white;
  }
  
  .unblock {
    background-color: green;
    color: white;
  }
  
  .edit {
    background-color: #f0ad4e;
    color: white;
  }
  
  .delete {
    background-color: red;
    color: white;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  
  select {
    margin-right: 10px;
    padding: 5px;
  }
  </style>
  
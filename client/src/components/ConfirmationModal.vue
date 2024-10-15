<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-button" @click="handleCancel">✖</button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn cancel" @click="handleCancel">Hủy</button>
          <button class="btn confirm" @click="handleConfirm">Xác nhận</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    visible: Boolean,
    title: String,
    message: String,
  })
  
  const emit = defineEmits(['confirm', 'cancel'])
  
  const handleCancel = () => {
    emit('cancel')
  }
  
  const handleConfirm = () => {
    emit('confirm')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
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
  
  .modal-container {
    background: white;
    width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .modal-header h3 {
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .modal-body {
    margin-bottom: 20px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  .btn.cancel {
    background-color: #f44336;
  }
  
  .btn.confirm {
    background-color: #4CAF50;
  }
  </style>
  
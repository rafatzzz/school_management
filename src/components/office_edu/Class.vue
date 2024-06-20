<template>
  <v-app>
    <v-progress-linear v-if="loading" color="primary" indeterminate absolute top width="100%"></v-progress-linear>
    <v-main class="bg-grey-lighten-4">
      <div class="my-3 mx-3">
        <v-chip prepend-icon="mdi-circle" text="ថ្នាក់សិក្សា" color="success"></v-chip>
        <v-divider></v-divider>
      </div>

      <v-container>
        <div class="card shadow-sm my-3 py-3">
          <div class="text-end row justify-content-center align-items-center">
            <div class="col">
              <div class="input-group mx-3">
                <div class="input-group w-50">
                  <input type="text" class="form-control shadow-none rounded-1" v-model="search" placeholder="Search"
                    aria-label="Search" aria-describedby="basic-addon1" hide-details>
                  <button class="btn btn-outline-primary" type="submit" @click.prevent="submitSearch">
                    ស្វែងរក
                  </button>
                </div>


              </div>

            </div>
            <div class="col">
              <v-btn color="blue darken-1" class="mx-2" append-icon="mdi-plus"
                @click="showDialog = true">បញ្ចូលថ្នាក់បង្រៀនថ្មី</v-btn>
              <v-btn color="green darken-1" class="mx-2" append-icon="mdi-printer" @click="printTable">បោះពុម្ព</v-btn>
              <v-btn color="green darken-1" class="mx-2" append-icon="mdi-file-upload-outline"
                @click="exportToExcel">នាំចេញទៅ Excel</v-btn>
            </div>

          </div>

        </div>


        <v-data-table v-if="!loading" :headers="headers" :items="classes" :search="search" item-key="id"
          class="elevation-1">
          <template v-slot:item.action="{ item }">
            <div class="text-end">
              <v-icon small @click="viewDetail(item)" class="mx-3 text-primary">mdi-eye</v-icon>
              <v-icon small @click="showUpdateDialog(item)" class="mx-3 text-primary">mdi-pencil</v-icon>
              <v-icon small @click="deleteClass(item)" class="mx-3 text-danger">mdi-delete</v-icon>
            </div>
          </template>
        </v-data-table>

      </v-container>

      <!-- Dialog for viewing details -->
      <v-dialog v-model="showDetailDialog" max-width="1500px">
        <v-card>
          <v-card-title class="bg-primary ">ព័ត៌មានលម្អិត</v-card-title>
          <div class="row gap-2 my-3">
            <div class="card col">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ថ្នាក់ទី : {{ selectedClass.grade }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>គ្រូបន្ទុកថ្នាក់ : {{ selectedClass.classTeacher }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ចំនួនសិស្ស: {{ selectedClass.studentTotal }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ប្រភេទថ្នាក់: {{ selectedClass.classType }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>អាគារ : {{ selectedClass.building }}</v-list-item-title>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </div>
          </div>
          <v-card-actions>
            <v-btn color="blue darken-1 ms-auto " text @click="showDetailDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog for editing or adding a class -->
      <v-dialog v-model="showDialog" style="width: 70%; height: 600px;">
        <v-card>
          <v-toolbar flat color="primary">
            <v-toolbar-title>{{ editMode ? 'កែប្រែព័ត៌មាន' : 'បញ្ចូលថ្នាក់បង្រៀនថ្មី' }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedClass.grade" label="ថ្នាក់ទី" :items="['7', '8', '9', '10', '11', '12']"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>

                <v-col cols="12" md="3">
                  <v-combobox v-model="editedClass.classTeacher" label="គ្រូបន្ទុកថ្នាក់" :items="teacherList"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedClass.studentTotal" label="ចំនួនសិស្ស" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-combobox>
                </v-col>

                <v-col cols="12" md="3">
                  <v-combobox v-model="editedClass.classType" label="ប្រភេទថ្នាក់"
                    :items="['វិទ្យាសាស្ត្រពិត', 'វិទ្យាសាស្ត្រសង្គម', 'ផ្សេងៗ']" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedClass.building" label="អាគារ" :items="['A', 'B', 'C', 'D']"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>

              </v-row>
            </v-form>
          </v-card-text>
          <v-card class="text-end py-4 bg-primary">
            <v-btn color="blue darken-1" class="ms-4" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="green-lighten-1" class="mx-4 " text @click="saveClass">Save</v-btn>
          </v-card>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      teacherList: ["ទេព្យ រស្មី", "សោម រ៉ាហ្វាត់"],
      loading: true,
      search: '',
      showDialog: false,
      showDetailDialog: false,
      valid: true,
      editMode: false,
      headers: [
        { key: 'grade', title: 'ថ្នាក់ទី' },
        { key: 'classTeacher', title: 'គ្រូបន្ទុកថ្នាក់' },
        { key: 'studentTotal', title: 'ចំនួនសិស្សសរុប' },
        { key: 'classType', title: 'ប្រភេទថ្នាក់' },
        { key: 'building', title: 'អាគារ' },
        { text: 'សកម្មភាព', value: 'action', sortable: false },
      ],
      classes: [],
      selectedClass: {},
      editedClass: {
        id: null,
        grade: '',
        classTeacher: '',
        studentTotal: '',
        classType: '',
        building: '',
      },
    };
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.editedClass = {
        id: null,
        grade: '',
        classTeacher: '',
        studentTotal: '',
        classType: '',
        building: '',
      };
    },
    saveClass() {
      if (this.editMode) {
        const index = this.classes.findIndex(classItem => classItem.id === this.editedClass.id);
        if (index !== -1) {
          this.classes.splice(index, 1, { ...this.editedClass });
          this.showSuccessMessage('Class updated successfully!');
        }
        this.editMode = false;
      } else {
        if (this.editedClass.id) {
          const index = this.classes.findIndex(classItem => classItem.id === this.editedClass.id);
          if (index !== -1) {
            this.classes.splice(index, 1, { ...this.editedClass });
            this.showSuccessMessage('Class updated successfully!');
          }
        } else {
          this.editedClass.id = this.classes.length + 1;
          this.classes.push({ ...this.editedClass });
          this.showSuccessMessage('Class added successfully!');
        }
      }
      this.resetForm();
    },
    showSuccessMessage(message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: message
      });
    },
    showUpdateDialog(item) {
      this.editedClass = { ...item };
      this.editMode = true;
      this.showDialog = true;
    }, viewDetail(item) {
      this.selectedClass = { ...item };
      this.showDetailDialog = true;
    },
    deleteClass(item) {
      const index = this.classes.findIndex(classItem => classItem.id === item.id);
      if (index !== -1) {
        this.classes.splice(index, 1);
        this.showSuccessMessage('Class deleted successfully!');
      }
    },
    closeDialog() {
      this.showDialog = false;
      this.resetForm();
    },
    printTable() {
      const table = document.querySelector('.v-data-table');
      if (table) {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(table.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      } else {
        console.error('Table element not found');
      }
    },
    exportToExcel() {
      const ws = XLSX.utils.json_to_sheet(this.classes);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Classes');
      XLSX.writeFile(wb, 'classes.xlsx');
    },
  },
};

</script>

<style scoped>
.v-toolbar {
  color: white;
}

.custom-outline {
  --v-text-field-outline-color: #ff0000;
  /* Red outline color */
  --v-text-field-outline-width: 2px;
  /* Border width */
}

.custom-outline input:hover {
  outline-color: #00ff00;
  /* Green outline color on hover */
}

.custom-outline input:focus {
  outline-color: #0000ff;
  /* Blue outline color on focus */
}
</style>
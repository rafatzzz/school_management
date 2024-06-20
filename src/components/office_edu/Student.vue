<template>
  <v-app>
    <v-progress-linear v-if="loading" color="primary" indeterminate absolute top width="100%"></v-progress-linear>
    <v-main class="bg-grey-lighten-4">
      <div class="my-3 mx-3">
        <v-chip prepend-icon="mdi-circle" text="សិស្ស" color="success"></v-chip>
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
                @click="showDialog = true">បញ្ចូលសិស្ស</v-btn>
              <v-btn color="green darken-1" class="mx-2" append-icon="mdi-printer" @click="printTable">បោះពុម្ព</v-btn>
              <v-btn color="green darken-1" class="mx-2" append-icon="mdi-file-upload-outline"
                @click="exportToExcel">នាំចេញទៅ Excel</v-btn>
            </div>

          </div>

        </div>


        <v-data-table v-if="!loading" :headers="headers" :items="students" :search="search" item-key="id"
          class="elevation-1">
          <template v-slot:item.action="{ item }">
            <div class="text-end">
              <v-icon small @click="viewDetail(item)" class="mx-3 text-primary">mdi-eye</v-icon>
              <v-icon small @click="showUpdateDialog(item)" class="mx-3 text-primary">mdi-pencil</v-icon>
              <v-icon small @click="deleteStudent(item)" class="mx-3 text-danger">mdi-delete</v-icon>
            </div>

          </template>

        </v-data-table>



      </v-container>

      <!-- Dialog for viewing details -->
      <v-dialog v-model="showDetailDialog" max-width="1500px">
        <v-card>

          <v-card-title class="bg-primary ">ព័ត៌មានលម្អិត</v-card-title>
          <div class="row gap-2 my-3">

            <div class="card col ">
              <div class="d-flex justify-content-center align-items-center">
                <img src="../user-icon.png" class="w-25 m-auto" alt="">
              </div>

              <div class="d-flex flex-column">
                <div class="">
                  <p class="text-center my-2">{{ selectedStudent.lastName + ` ` + selectedStudent.firstName }}</p>
                </div>
                <div class="">
                  <p class="text-center">
                    <v-chip color="primary">
                      ស្ថានភាព : {{ SelectedStudent.status }}
                    </v-chip>
                  </p>
                </div>
              </div>

            </div>

            <div class="card col">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>គោត្តនាម: {{ SelectedStudent.lastName }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>នាមខ្លួន: {{ SelectedStudent.firstName }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ឈ្មោះឡាតាំង: {{ SelectedStudent.latinName }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ភេទ: {{ SelectedStudent.gender }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>អត្តលេខ: {{ SelectedStudent.idNumber }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ផ្ទេរពីសាលា: {{ SelectedStudent.specialization }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ថ្ងៃខែឆ្នាំកំណើត: {{ SelectedStudent.birthDate }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ទីកន្លែងកំណើត: {{ SelectedStudent.birthPlace }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>អាស័យដ្ធានបច្ចប្បន្ន: {{ SelectedStudent.currentAddress }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ឈ្មោះឪពុក: {{ SelectedStudent.startTeachingDate }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ឈ្មោះម្តាយ: {{ SelectedStudent.phone }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>លេខទូរស័ព្ទឪពុក/ម្តាយ: {{ SelectedStudent.email }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ថ្នាក់ទី: {{ SelectedStudent.position }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>លេខទូរស័ព្ទផ្ទាល់ខ្លួន: {{ SelectedStudent.status }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ផ្សេងៗ: {{ SelectedStudent.others }}</v-list-item-title>
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

      <!-- Dialog for editing or adding a teacher -->
      <v-dialog v-model="showDialog" style="width: 70%; height: 600px;">
        <v-card>
          <v-toolbar flat color="primary">
            <v-toolbar-title>{{ editMode ? 'កែប្រែព័ត៌មាន' : 'បញ្ចូលគ្រូបង្រៀនថ្មី' }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.lastName" label="គោត្តនាម" :rules="[v => !!v || 'Required']"
                    required variant="outlined" class="custom-outline"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.firstName" label="នាមខ្លួន" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.latinName" label="ឈ្មោះឡាតាំង" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedStudent.gender" label="ភេទ" :items="['ប្រុស', 'ស្រី', 'ផ្សេងៗ']"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.idNumber" label="អត្តលេខ" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedStudent.schoolTransfer" label="ផ្ទេរពីសាលា"
                    :items="['វិទ្យាល័យស្តៅ', 'វិទ្យាល័យនេតយ៉ង', 'វិទ្យាល័យសោហឺ', 'វិទ្យាល័យព្រះមុនីវង្ស', 'វិទ្យាល័យឯកភ្នំ',]"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.birthDate" label="ថ្ងៃខែឆ្នាំកំណើត"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.birthPlace" label="ទីកន្លែងកំណើត"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.currentAddress" label="អាស័យដ្ធានបច្ចប្បន្ន"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.fatherName" label="ឈ្មោះឪពុក" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.motherName" label="ឈ្មោះម្តាយ" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.phoneParent" label="លេខទូរស័ព្ទឪពុក/ម្តាយ"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-combobox v-model="editedStudent.grade" label="ថ្នាក់ទី"
                    :items="['៧', '៨', '៩', '១០', '១១', '១២', '១២']" :rules="[v => !!v || 'Required']" required
                    variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedStudent.personalPhone" label="លេខទូរស័ព្ទផ្ទាល់ខ្លួន"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="editedStudent.others" label="ផ្សេងៗ" :rules="[v => !!v || 'Required']" required
                    variant="outlined"></v-text-field>
                </v-col>

              </v-row>
            </v-form>
          </v-card-text>
          <v-card class="text-end py-4 bg-primary">

            <v-btn color="blue darken-1" class="ms-4" text @click="closeDialog">បដិសេធ</v-btn>
            <v-btn color="green-lighten-1" class="mx-4 " text @click="saveStudent">រក្សាទុក</v-btn>
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
      loading: true,
      search: '',
      showDialog: false,
      showDetailDialog: false,
      valid: true,
      editMode: false,
      headers: [
        {
          align: 'start',
          key: 'lastName',
          sortable: false,
          title: 'គោត្តនាម',
        },
        { key: 'firstName', title: 'នាមខ្លួន' },
        { key: 'latinName', title: 'ឈ្មោះឡាតាំង' },
        { key: 'gender', title: 'ភេទ' },
        { key: 'idNumber', title: 'អត្តលេខ' },
        { key: 'specialization', title: 'ឯកទេស' },
        // Add entry for the actions column
        { text: 'សកម្មភាព', value: 'action', sortable: false },
      ],


      students: [],
      SelectedStudent: {},
      editedStudent: {
        id: null,
        lastName: '',
        firstName: '',
        latinName: '',
        gender: '',
        idNumber: '',
        specialization: '',
        birthDate: '',
        birthPlace: '',
        currentAddress: '',
        startTeachingDate: '',
        phone: '',
        email: '',
        position: '',
        status: '',
        others: '',
      },
    };
  },
  mounted() {
    // Simulate loading for a few seconds
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Adjust the time as needed
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.editedStudent = {
        id: null,
        lastName: '',
        firstName: '',
        latinName: '',
        gender: '',
        idNumber: '',
        specialization: '',
        birthDate: '',
        birthPlace: '',
        currentAddress: '',
        startTeachingDate: '',
        phone: '',
        email: '',
        position: '',
        status: '',
        others: '',
      };
    },
    saveStudent() {
      if (this.editMode) {
        const index = this.students.findIndex(student => student.id === this.editedStudent.id);
        if (index !== -1) {
          this.students.splice(index, 1, { ...this.editedStudent });
          this.showSuccessMessage('Student updated successfully!');
        }
        this.editMode = false; // Set editMode to false after updating
      } else {
        if (this.editedStudent.id) {
          const index = this.students.findIndex(student => student.id === this.editedStudent.id);
          if (index !== -1) {
            this.students.splice(index, 1, { ...this.editedStudent });
            this.showSuccessMessage('Student updated successfully!');
          }
        } else {

          this.editedStudent.id = this.students.length + 1;
          this.student.push({ ...this.editedStudent });
          this.showSuccessMessage('Student added successfully!');
        }
      }
      this.resetForm();
    },

    showSuccessMessage(message) {
      // Show success message using SweetAlert
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
      this.editedStudent = { ...item };
      this.editMode = true;
      this.showDialog = true;
    },
    viewDetail(item) {
      this.SelectedStudent = { ...item };
      this.showDetailDialog = true;
    },
    deleteStudent(item) {
      const index = this.students.findIndex(student => student.id === item.id);
      if (index !== -1) {
        this.students.splice(index, 1);
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
      const ws = XLSX.utils.json_to_sheet(this.students);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Students');
      XLSX.writeFile(wb, 'students.xlsx');
    },
  },
};
</script>


<style scoped>
.v-toolbar {
  color: white;

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
}
</style>

<template>
  <v-app>
    <v-progress-linear v-if="loading" color="primary" indeterminate absolute top width="100%"></v-progress-linear>
    <v-main class="bg-grey-lighten-4">
      <div class="my-3 mx-3">
        <v-chip prepend-icon="mdi-circle" text="" color="success">{{ $t('navigation.teacher') }}</v-chip>
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
                @click="showDialog = true">បញ្ចូលគ្រូបង្រៀន</v-btn>
              <v-btn color="green darken-1" class="mx-2" append-icon="mdi-printer" @click="printTable">បោះពុម្ព</v-btn>
              <v-btn color="green darken-1" class="mx-2" append-icon="mdi-file-upload-outline"
                @click="exportToExcel">នាំចេញទៅ Excel</v-btn>
            </div>

          </div>

        </div>



        <v-data-table v-if="!loading" :headers="headers" :items="teachers" :search="search" item-key="id"
          class="elevation-1 ">
          <template v-slot:item.action="{ item }">
            <div class="text-end">
              <v-icon small @click="viewDetail(item)" class="mx-3 text-primary">mdi-eye</v-icon>
              <v-icon small @click="showUpdateDialog(item)" class="mx-3 text-primary">mdi-pencil</v-icon>
              <v-icon small @click="deleteTeacher(item)" class="mx-3 text-danger">mdi-delete</v-icon>
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
                  <p class="text-center my-2">{{ selectedTeacher.lastName + ` ` + selectedTeacher.firstName }}</p>
                </div>
                <div class="">
                  <p class="text-center">
                    <v-chip color="primary">
                      ស្ថានភាព : {{ selectedTeacher.status }}
                    </v-chip>
                  </p>
                </div>
              </div>

            </div>

            <div class="card col">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>គោត្តនាម: {{ selectedTeacher.lastName }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>នាមខ្លួន: {{ selectedTeacher.firstName }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ឈ្មោះឡាតាំង: {{ selectedTeacher.latinName }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ភេទ: {{ selectedTeacher.gender }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>អត្តលេខ: {{ selectedTeacher.idNumber }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ឯកទេស: {{ selectedTeacher.specialization }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ថ្ងៃខែឆ្នាំកំណើត: {{ selectedTeacher.birthDate }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ទីកន្លែងកំណើត: {{ selectedTeacher.birthPlace }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>អាស័យដ្ធានបច្ចប្បន្ន: {{ selectedTeacher.currentAddress }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ថ្ងៃបង្រៀនដំបូង: {{ selectedTeacher.startTeachingDate }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>លេខទូរស័ព្ទ: {{ selectedTeacher.phone }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>សារអេឡិចត្រូនិច: {{ selectedTeacher.email }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>តួនាទី: {{ selectedTeacher.position }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ស្ថានភាព: {{ selectedTeacher.status }}</v-list-item-title>
                  <v-divider></v-divider>
                  <v-list-item-title>ផ្សេងៗ: {{ selectedTeacher.others }}</v-list-item-title>
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
                  <v-text-field v-model="editedTeacher.lastName" label="គោត្តនាម" :rules="[v => !!v || 'Required']"
                    required variant="outlined" class="custom-outline"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.firstName" label="នាមខ្លួន" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.latinName" label="ឈ្មោះឡាតាំង" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedTeacher.gender" label="ភេទ" :items="['ប្រុស', 'ស្រី', 'ផ្សេងៗ']"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.idNumber" label="អត្តលេខ" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedTeacher.specialization" label="ឯកទេស"
                    :items="['អក្សរសាស្ត្រខ្មែរ', 'អក្សរសាស្ត្រអង់គ្លេស', 'គណិតវិទ្យា', 'រូបវិទ្យា', 'គីមីវិទ្យា', 'ជីវៈវិទ្យា', 'គេហៈ', 'កីឡា']"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.birthDate" label="ថ្ងៃខែឆ្នាំកំណើត"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.birthPlace" label="ទីកន្លែងកំណើត"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.currentAddress" label="អាស័យដ្ធានបច្ចប្បន្ន"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.startTeachingDate" label="ថ្ងៃបង្រៀនដំបូង"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.phone" label="លេខទូរស័ព្ទ" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedTeacher.status" label="ស្ថានភាព"
                    :items="['ធម្មតា', 'ឈប់សម្រាក', 'ចូលនិវត្តន៍', 'ចេញពីមុខដំណែង']" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-combobox>

                </v-col>
                <v-col cols="12" md="3">
                  <v-combobox v-model="editedTeacher.position" label="តួនាទី"
                    :items="['គ្រូនាយក', 'នាយករង', 'ជំនួយការនាយក', 'លេធិការ', 'ទីចាត់ការ', 'គ្រូបន្ទុក', 'សិក្ខាបនធារី']"
                    :rules="[v => !!v || 'Required']" required variant="outlined"></v-combobox>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedTeacher.email" label="សារអេឡិចត្រូនិច" :rules="[v => !!v || 'Required']"
                    required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="editedTeacher.email" label="ផ្សេងៗ" :rules="[v => !!v || 'Required']" required
                    variant="outlined"></v-text-field>
                </v-col>

              </v-row>
            </v-form>
          </v-card-text>
          <v-card class="text-end py-4 bg-primary">

            <v-btn color="blue darken-1" class="ms-4" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="green-lighten-1" class="mx-4 " text @click="saveTeacher">Save</v-btn>
          </v-card>


        </v-card>


      </v-dialog>

      <div class="row mx-3 my-3" v-if="!loading">
        <div class="card w-50 col">
          <div class="card-body ">
            <v-sheet>
              <v-calendar v-calendar color="primary" class="py-5"></v-calendar>
            </v-sheet>
          </div>
        </div>

        <div class="col">
          <div class="card">
            <div class="card-body">
              <v-chip color="primary" text-2xl>គ្រូបង្រៀនសរុបគិតជាភាគរយ</v-chip>
              <div class="my-3">
                <div class="d-flex flex-row">
                  <v-btn class="rounded-pill " prepend-icon="mdi-account-outline" color="success" text="20" </v-btn>
                    <p class="my-auto mx-3">គ្រូបង្រៀនសរុប</p>
                </div>

                <div class="d-flex flex-row my-3">
                  <v-btn class="rounded-pill " prepend-icon="mdi-file-document-multiple-outline" color="primary"
                    text="12" </v-btn>
                    <p class="my-auto mx-3">មុខវិជ្ជាសម្រាប់ប្រឡង</p>
                </div>



              </div>
              <apexchart width="500" type="radialBar" :options="chartOptions" :series="series" class="m-auto">
              </apexchart>

            </div>
          </div>
        </div>

      </div>


    </v-main>
  </v-app>
</template>



<script>
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { VCalendar } from 'vuetify/labs/VCalendar'
import VueApexCharts from 'vue3-apexcharts'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  components: {
    VCalendar,
    apexchart: VueApexCharts,
  },

  data() {

    return {




      series: [75],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val);
                },
                color: '#111',
                fontSize: '36px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Percent'],
      },



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


      teachers: [],
      selectedTeacher: {},
      editedTeacher: {
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
      this.editedTeacher = {
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
    saveTeacher() {
      if (this.editMode) {
        const index = this.teachers.findIndex(teacher => teacher.id === this.editedTeacher.id);
        if (index !== -1) {
          this.teachers.splice(index, 1, { ...this.editedTeacher });
          this.showSuccessMessage('Teacher updated successfully!');
        }
        this.editMode = false; // Set editMode to false after updating
      } else {
        if (this.editedTeacher.id) {
          const index = this.teachers.findIndex(teacher => teacher.id === this.editedTeacher.id);
          if (index !== -1) {
            this.teachers.splice(index, 1, { ...this.editedTeacher });
            this.showSuccessMessage('Teacher updated successfully!');
          }
        } else {
          this.editedTeacher.id = this.teachers.length + 1;
          this.teachers.push({ ...this.editedTeacher });
          this.showSuccessMessage('Teacher added successfully!');
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
      this.editedTeacher = { ...item };
      this.editMode = true;
      this.showDialog = true;
    },
    viewDetail(item) {
      this.selectedTeacher = { ...item };
      this.showDetailDialog = true;
    },
    deleteTeacher(item) {
      const index = this.teachers.findIndex(teacher => teacher.id === item.id);
      if (index !== -1) {
        this.teachers.splice(index, 1);
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
        printWindow.document.write('<html><head><title>Print</title><style>body { font-family: Khmer OS Siemreap; }</style></head><body>');
        printWindow.document.write('<div class="d-flex align-items-center justify-content-between my-3">');
        printWindow.document.write('<img src="moey_logo.png" alt="MOEY logo" style="width: 50px;">');
        printWindow.document.write('<h2 class="font-custom text-center">បញ្ជីវត្តមានគ្រូបង្រៀន</h2>');
        printWindow.document.write('<h3 class="font-custom text-right">វិទ្យាល័យសម្តេចឪ</h3>');
        printWindow.document.write('</div>');
        printWindow.document.write('<hr>');
        printWindow.document.write('<table border="1" style="width:100%; border-collapse: collapse;">');
        printWindow.document.write(table.outerHTML);
        printWindow.document.write('</table></body></html>');
        printWindow.document.close();
        printWindow.print();
      } else {
        console.error('Table element not found');
      }
    },


    exportToExcel() {
      const ws = XLSX.utils.json_to_sheet(this.teachers);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
      XLSX.writeFile(wb, 'teachers.xlsx');
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

  .bordered-table .v-data-table-header th,
  .bordered-table .v-data-table tbody tr td {
    border: 1px solid black;
  }

  .title {
    font-size: 1.2rem;
  }

  .v-data-table {
    font-family: 'Khmer OS Siemreap', serif;
    margin-top: 20px;
  }

  .highlighted-row {
    background-color: #f9f9f9;
  }

  .v-main {
    background-color: white;
  }
}
</style>

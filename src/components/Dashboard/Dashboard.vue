<template>

  <v-app>
    <v-main class="bg-grey-lighten-4">
      <div class="my-3 mx-3">
        <v-chip prepend-icon="mdi-circle" color="success">{{ $t('navigation.other_infor') }}</v-chip>
        <v-divider></v-divider>

        <!-- Analysis section -->
        <div class="row">
          <!-- Column 1: Analysis -->
          <div class="col-md-4">
            <div class="card rounded-lg bg-white shadow-sm h-100">
              <div class="card-body text-center">
                <v-icon size="64" class="mb-3 text-primary">mdi-chart-line</v-icon>
                <h2 class="text-primary">ការវិភាគ</h2>
                <p>សិស្សសរុប: 500</p>
                <p>គ្រូសរុប: 20</p>
              </div>
            </div>
          </div>

          <!-- Column 2: Teachers -->
          <router-link to="/teacher" class="col-md-4 text-decoration-none">
            <div class="card rounded-lg bg-white shadow-sm h-100">
              <div class="card-body">
                <v-icon size="64" class="float-left mr-3 text-warning">mdi-account-group</v-icon>
                <h2 class="text-warning fs-4">ទិន្ន័យគ្រូបង្រៀន</h2>
                <p>ទិន្ន៏យសរុប: 20</p>
                <p>បទពិសោធន៌: 5 years</p>
                <p>ឯកទេស : គ្រប់មុខវិជ្ជា</p>
              </div>
            </div>
          </router-link>

          <!-- Column 3: Students -->
          <router-link to="/student" class="col-md-4 text-decoration-none">
            <div class="card rounded-lg bg-white shadow-sm h-100">
              <div class="card-body">
                <v-icon size="64" class="float-left mr-3 text-info">mdi-account-child</v-icon>
                <h2 class="text-info">ទិន្ន័យសិស្ស</h2>
                <p>ទិន្ន៏យសរុប: 500</p>
                <p>ចំណាត់ថ្នាក់: A+</p>
              </div>
            </div>
          </router-link>

          <div class="card my-4 mx-1 bg-white ">
            <div class="card-body ">
              <div class="row">

                <div class="col-9">
                  <VueApexCharts type="bar" height="300" :options="barChartOptions" :series="barSeries">
                  </VueApexCharts>
                </div>
                <div id="chart" class="col">
                  <VueApexCharts type="donut" :options="donutChartOptions" :series="donutSeries"></VueApexCharts>
                </div>
              </div>

            </div>

          </div>






          <div>
            <div class="card bg-white my-2 mx-2">
              <div class="card-body">
                <v-data-table v-model="selected" :items="students" item-key="id" show-select>
                  <template #item.avatar="{ item }">
                    <v-avatar>
                      <v-img :src="item.avatar" />
                    </v-avatar>
                  </template>
                  <template #item.name="{ item }">
                    {{ item.name.first }} {{ item.name.last }}
                  </template>
                  <template #item.age="{ item }">
                    {{ item.age }}
                  </template>
                  <template #item.gender="{ item }">
                    {{ item.gender }}
                  </template>
                  <template #item.address="{ item }">
                    {{ item.address.street.number }} {{ item.address.street.name }}, {{ item.address.city }}, {{
                      item.address.state }}, {{ item.address.country }}
                  </template>
                  <template #item.email="{ item }">
                    {{ item.email }}
                  </template>
                  <template #item.phone="{ item }">
                    {{ item.phone }}
                  </template>
                  <template #item.courses="{ item }">
                    <div v-for="(course, index) in item.courses" :key="index">{{ course }}</div>
                  </template>
                  <template #item.gpa="{ item }">
                    {{ item.gpa }}
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>



        </div>
      </div>


    </v-main>

    <router-view></router-view>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { VDataTable, VAvatar, VImg } from 'vuetify/components';

const selected = ref([]);
const students = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=10&nat=us,gb');
    students.value = response.data.results.map((user, index) => ({
      id: index + 1,
      avatar: user.picture.thumbnail,
      name: user.name,
      age: user.dob.age,
      gender: user.gender,
      address: user.location,
      email: user.email,
      phone: user.phone,
      courses: ['Mathematics', 'Physics', 'Chemistry'], // Example courses
      gpa: 3.5, // Example GPA
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const getAvatarUrl = (student) => {
  // Generate avatar URL based on student's image or use a placeholder image if not provided
  if (student.image) {
    return student.image;
  } else {
    // Use a placeholder image from Lorem Picsum
    return `https://picsum.photos/200?random=${student.id}`;
  }
};

const barSeries = ref([
  {
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
  },
]);

const barChartOptions = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + '%';
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    position: 'top',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + '%';
      },
    },
  },
  title: {
    text: 'Monthly Inflation in Argentina, 2002',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444',
    },
  },
});

const donutSeries = ref([44, 55, 41, 17, 15]);

const donutChartOptions = ref({
  chart: {
    type: 'donut',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
});



</script>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    VueApexCharts,

  }

}
</script>

<style scoped>
.card {
  background-color: #f8f9fa;
  border: none;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.stat-card {
  background: linear-gradient(to bottom right, #42a5f5, #0d47a1);
  /* Gradient background */
  /* Add any additional styling here */
}
</style>

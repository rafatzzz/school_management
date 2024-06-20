<template>

  <v-app>
    <v-main class="bg-grey-lighten-4">
      <div class="my-3 mx-3">
        <v-chip prepend-icon="mdi-circle" text="ពត៌មានផ្សេងៗ" color="success"></v-chip>
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
          <div class="col-md-4">
            <div class="card rounded-lg bg-white shadow-sm h-100">
              <div class="card-body">
                <v-icon size="64" class="float-left mr-3 text-warning">mdi-account-group</v-icon>
                <h2 class="text-warning fs-4">ទិន្ន័យគ្រូបង្រៀន</h2>
                <p>ទិន្ន៏យសរុប: 20</p>
                <p>បទពិសោធន៌: 5 years</p>
                <p>ឯកទេស : គ្រប់មុខវិជ្ជា</p>
              </div>
            </div>
          </div>

          <!-- Column 3: Students -->
          <div class="col-md-4">
            <div class="card rounded-lg bg-white shadow-sm h-100">
              <div class="card-body">
                <v-icon size="64" class="float-left mr-3 text-info">mdi-account-child</v-icon>
                <h2 class="text-info">ទិន្ន័យសិស្ស</h2>
                <p>ទិន្ន៏យសរុប: 500</p>
                <p>ចំណាត់ថ្នាក់: A+</p>
              </div>
            </div>
          </div>
        </div>


        <div class="card my-4 bg-white">
          <div class="card-body">
            <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series"></VueApexCharts>

          </div>
        </div>



        <div class="card bg-white my-3">
          <div class="card-body">
            <div class="card-title">
              <v-timeline align="start">
                <v-timeline-item v-for="(year, i) in years" :key="i" :dot-color="year.color" size="small">
                  <template v-slot:opposite>
                    <div :class="`pt-1 headline font-weight-bold text-${year.color}`" v-text="year.year"></div>
                  </template>
                  <div>
                    <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
                      សាលាវិទ្យាល័យសម្តេចឪ
                    </h2>
                    <div>
                      Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                      convenire
                      principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi
                      sententiae.
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </div>
        </div>


      </div>
    </v-main>

    <router-view></router-view>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'




const series = ref([{
  name: 'Inflation',
  data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
}])

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top' // top, center, bottom
      }
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%"
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    position: 'top',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5
        }
      }
    },
    tooltip: {
      enabled: true
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%"
      }
    }
  },
  title: {
    text: 'Monthly Inflation in Argentina, 2002',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444'
    }
  }
})
</script>

<script>
import VueApexCharts from 'vue3-apexcharts'
export default {
  components: {
    VueApexCharts,
    computed: {
      authenticated() {
        return authState.authenticated;
      },
    },
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

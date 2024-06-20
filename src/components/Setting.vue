<script setup>
</script>
<template>

  <v-app class="">
    <v-main class="bg-grey-lighten-4">
      <v-progress-linear v-if="loading" color="primary" indeterminate absolute top width="100%"></v-progress-linear>
      <div class="my-3 mx-3">
        <v-chip prepend-icon="mdi-circle" text="ការកំណត់" color="success"></v-chip>
        <v-divider></v-divider>
      </div>
      <div class="py-3 px-3">

        <div class="">
          <div class="card">
            <div class="card-body">
              <div class="row" v-if="!loading">

                <div class="card-title col-3 h-25 img-center ">
                  <img src="../assets/user-icon.png" class="custom-img " alt="" srcset="">

                </div>



                <div class="col">
                  <h3>កំណត់ពត៌មានប្រើប្រាស់</h3>
                  <div class="">
                    <label for="name" class="my-3">ប្តូរឈ្មោះ </label>
                    <input type="text" class="form-control w-50 shadow-none" id="name" placeholder=""
                      value="សោម រ៉ាហ្វាត់">
                  </div>

                  <div class="my-4">
                    <label for="password" class="my-3">លេខសម្ងាត់បច្ចុប្បន្ន</label>
                    <input type="password" class="form-control w-50 shadow-none" id="password">
                  </div>

                  <div class="my-4">
                    <label for="newpassword" class="my-3">លេខសម្ងាត់ថ្មី</label>
                    <input type="password" class="form-control w-50 shadow-none" id="newpassword">
                  </div>



                  <div class="">


                    <div class="col ">
                      <div class="row">
                        <h3 class="col-7">កំណត់សិទ្ធិអ្នកប្រើប្រាស់</h3>
                        <div class="col">
                          <button class="btn btn-primary bg-blue dark-lighten-2 ">បន្ថែមតួនាទីអ្នកប្រើប្រាស់</button>
                        </div>
                      </div>

                      <div class="col card w-75 my-5">
                        <v-table height="300px" fixed-header>
                          <thead>
                            <tr>
                              <th class="text-left">
                                Name
                              </th>
                              <th class="text-left">
                                Calories
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in desserts" :key="item.name">
                              <td>{{ item.name }}</td>
                              <td>{{ item.calories }}</td>
                            </tr>
                          </tbody>
                        </v-table>
                      </div>
                      <div class="my-4 text-end w-75">
                        <button class="btn btn-primary bg-red dark-lighten-2 mx-2">សម្អាត</button>
                        <button class="btn btn-primary bg-blue dark-lighten-2">កែប្រែ</button>
                      </div>

                    </div>


                  </div>



                </div>
              </div>

            </div>
          </div>
        </div>







      </div>


      <router-view></router-view>
    </v-main>

  </v-app>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Setting',
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
      loading: ref(true),
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>
<style>
.custom-img {
  width: 250px;
}

.img-center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}
</style>
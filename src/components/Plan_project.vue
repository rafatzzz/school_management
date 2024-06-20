<script setup>
</script>
<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <div class="my-3 mx-3">
        <v-chip prepend-icon="mdi-circle" text="គម្រោងផ្សេងៗ" color="success"></v-chip>
        <v-divider></v-divider>
      </div>

      <v-progress-linear v-if="loading" color="primary" indeterminate absolute top width="100%"></v-progress-linear>
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
              @click="showDialog = true">បញ្ចូលគម្រោងថ្មី</v-btn>
            <v-btn color="green darken-1" class="mx-2" append-icon="mdi-printer" @click="printTable">បោះពុម្ព</v-btn>
            <v-btn color="green darken-1" class="mx-2" append-icon="mdi-file-upload-outline"
              @click="exportToExcel">នាំចេញទៅ Excel</v-btn>
          </div>

        </div>

      </div>



      <div class="row" v-if="!loading">
        <div class="col card_custom">
          <v-card class=" mx-3 my-3" max-width="400">
            <v-img class="align-end text-white" height="200" src="../assets/sdo_pic.jpg" cover>
              <v-card-title>គម្រោងទី១</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Number 10
            </v-card-subtitle>

            <v-card-text>
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text="Share"></v-btn>

              <v-btn color="orange" text="Explore"></v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <div class="col card_custom">
          <v-card class=" mx-3 my-3" max-width="400">
            <v-img class="align-end text-white" height="200" src="../assets/sdo_pic.jpg" cover>
              <v-card-title>គម្រោងទី២</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Number 10
            </v-card-subtitle>

            <v-card-text>
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text="Share"></v-btn>

              <v-btn color="orange" text="Explore"></v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <div class="col card_custom">
          <v-card class=" mx-3 my-3" max-width="400">
            <v-img class="align-end text-white" height="200" src="../assets/sdo_pic.jpg" cover>
              <v-card-title>គម្រោងទី៣</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Number 10
            </v-card-subtitle>

            <v-card-text>
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text="Share"></v-btn>

              <v-btn color="orange" text="Explore"></v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col card_custom">
          <v-card class=" mx-3 my-3" max-width="400">
            <v-img class="align-end text-white" height="200" src="../assets/sdo_pic.jpg" cover>
              <v-card-title>គម្រោងទី៤</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Number 10
            </v-card-subtitle>

            <v-card-text>
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text="Share"></v-btn>

              <v-btn color="orange" text="Explore"></v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>


    </v-main>

  </v-app>
</template>
<script>
export default {
  name: 'Plan_project',
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    // Simulate loading for a few seconds
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Adjust the time as needed
  },
};
</script>


<style>
.card_custom {
  background-color: #f8f9fa;
  border: none;
  transition: transform 0.3s ease;
  cursor: pointer
}

.card_custom:hover {
  transform: translateY(-5px);
}
</style>
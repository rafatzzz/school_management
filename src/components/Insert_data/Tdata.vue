<script setup>
</script>
<template>

    <v-app class="bg-light">
        <v-main>
        <div class="py-3 px-3">
        
        <v-btn prepend-icon="mdi-view-dashboard" variant="plain">
            ពត៌មានថ្មីៗ
        </v-btn>
        
        <v-divider></v-divider>




        </div>

     

        
        

        
        <div class="row">
            <div class="card w-50 mx-4 col-8">
                <div class="card-body">
                    <div class="card-title">
                       <v-icon icon="mdi-database-outline"></v-icon>
                        ទិន្ន័យសរុប
                    </div>

                    
                </div>
            </div>


            <div class="card w-25 mx-4 col-3">
                <div class="card-body">
                    <div class="card-title">
                        Test
                    </div>
                </div>
            </div>

            <div class="card w-25 mx-4 col">
                <div class="card-body">
                    <div class="card-title">
                        Test
                    </div>
                </div>
            </div>
            
        </div>
       
        </v-main>
       
 

    </v-app>
    <router-view></router-view>
    

</template>
<script>
export default {
  name: '/Dashboard',
}
</script>
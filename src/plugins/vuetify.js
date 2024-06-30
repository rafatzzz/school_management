import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// import { VDateInput } from 'vuetify/labs/VDateInput'
export default createVuetify({
  // components: {
  //   VDateInput,
  // },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

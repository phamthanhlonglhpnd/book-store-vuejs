import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import './assets/tailwind.css'

const app = createApp(App)

app.use(router).mount('#app')


// Setup plugin for defaults or `$screens` (optional)
app.use(SetupCalendar, {})
// Use the components
app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)

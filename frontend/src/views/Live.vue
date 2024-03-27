<template>
  <v-container fluid align=" center" color=" surface"  >
   <v-row max-width="1200px" justify="center" align="center" >
       <v-col class="col col1" cols="9" align = 'center'>
           <figure class="highcharts-figure">
               <div id="container"></div>
           </figure>
       </v-col>
      
    <v-col class="col col2" cols="3" align="center">
       <v-card color="teal-lighten-1" class="mx-auto" max-width="368" loading>
    <v-card-item title="Kingston">
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"
          color="error"
          icon="mdi-thermometer"
          size="18"
        ></v-icon>
        Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="6">
          <span class="text-h4  text-onTertiaryContainer" >
            {{ farTemperature }}
          </span>
        </v-col>

        <v-col class="text-right" cols="6">
          <v-icon
            color="error"
            icon="mdi-weather-hurricane"
            size="88"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item
        density="compact"
        prepend-icon="mdi-ladder"
        color="teal-darken-2"
      >
      
        <v-list-item-subtitle>
          <span class="text-h7  text-onTertiaryContainer">
            {{ Altitude }}
          </span>
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        density="compact"
        prepend-icon="mdi-gauge"
        color="teal-darken-2"
      >
        <v-list-item-subtitle> 
          <span class="text-h7  text-onTertiaryContainer">
            {{ soil_moisture }}
          </span>
        </v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <div class="py-2">
          <v-slider
            v-model="time"
            :max="6"
            :step="1"
            :ticks="labels"
            class="mx-4"
            color="primary"
            density="compact"
            show-ticks="always"
            thumb-size="10"
            hide-details
          ></v-slider>
        </div>

        <v-list class="bg-transparent">
          <v-list-item
            v-for="item in forecast"
            :key="item.day"
            :append-icon="item.icon"
            :subtitle="item.temp"
            :title="item.day"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="expand = !expand">
        {{ !expand ? 'Full Report' : 'Hide Report' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>    
   </v-row>

   <v-row max-width="1200px" justify="start" align="center">
       <v-col class="col col3" cols="9" align = 'center'>
           <figure class="highcharts-figure">
               <div id="container1"></div>
           </figure>
       </v-col>
       
       <v-col class="col col2" cols="3" align="center">
         
         <v-card class="mb-5" margin-bottom="5" max-width="500" color="primaryContainer" subtitle="Temperature C" loading append-icon="mdi-thermometer">
             <v-card-item> 
                 
                 <span class="text-h3  text-onPrimaryContainer">
                     {{ temperature }}
                 </span>
                 
             </v-card-item>
         </v-card>

         <v-card class="mb-5" margin-bottom="5" max-width="500" color="tertiaryContainer" subtitle="Heat Index (Feels like)" loading append-icon="mdi-fire" >
             <v-card-item>
               
              <span class="text-h3  text-onTertiaryContainer">
                     {{ hindex }}
                 </span>
             </v-card-item>
         </v-card>
         
         <v-card class="mb-5" margin-bottom="5" max-width="500" color="secondaryContainer" subtitle="Humidity" loading append-icon="mdi-water-percent">
             <v-card-item>
               
                 <span class="text-h3  text-onSecondaryContainer">
                     {{ humidity }}
                 </span>
             </v-card-item>
         </v-card>

     </v-col>
   </v-row>

   <v-row max-width="1200px" justify="center" align="center" >
       <v-col class="col col1" cols="9" align = 'center'>
           <figure class="highcharts-figure">
               <div id="container2"></div>
           </figure>
       </v-col>

       <v-col class="col col2" cols="3" align="center"> 

         <v-card class="mb-5" margin-bottom="5" max-width="500" color="primaryContainer" subtitle="Temperature F" loading append-icon="mdi-thermometer">
             <v-card-item>
               
                 <span class="text-h3  text-onPrimaryContainer">
                     {{ farTemperature }}
                 </span>
             </v-card-item>
         </v-card>

           <v-card class="mb-5" margin-bottom="5" max-width="500" color="tertiaryContainer" subtitle="Soil Moisture %" loading append-icon="mdi-water-outline">
               <v-card-item>
                 
                <span class="text-h3  text-onTertiaryContainer">
                       {{ soil_moisture }}
                   </span>
               </v-card-item>
           </v-card>
           
           <v-card class="mb-5" margin-bottom="5" max-width="500" color="secondaryContainer" subtitle="BMP Temperature" loading append-icon="mdi-thermometer-lines">
               <v-card-item>
                 
                   <span class="text-h3  text-onSecondaryContainer">
                       {{BMP_temperature }}
                   </span>
               </v-card-item>
           </v-card>

     </v-col>
       
   </v-row>

   <v-row max-width="1200px" justify="center" align="center" >
       <v-col class="col col1" cols="9" align = 'center'>
           <figure class="highcharts-figure">
               <div id="container3"></div>
           </figure>
       </v-col>

       <v-col class="col col2" cols="3" align="center">
         
         <v-card class="mb-5" margin-bottom="5" max-width="500" color="primaryContainer" subtitle="Pressure Pa" loading append-icon="mdi-trending-up">
             <v-card-item> 
                 
                 <span class="text-h3  text-onPrimaryContainer">
                     {{ pressure }}
                 </span>
                 
             </v-card-item>
         </v-card>

         <v-card class="mb-5" margin-bottom="5" max-width="500" color="tertiaryContainer" subtitle="Altitude" loading append-icon="mdi-altimeter">
             <v-card-item>
               
              <span class="text-h3  text-onTertiaryContainer">
                     {{ Altitude }}
                 </span>
             </v-card-item>
         </v-card>

     </v-col>
   </v-row> 
   
   <v-row max-width="1200px" justify="left" align="center" >
       <v-col class="col col1" cols="9" align = 'center'>
           <figure class="highcharts-figure">
               <div id="container4"></div>
           </figure>
       </v-col>
   </v-row> 

   <v-row max-width="1200px" justify="left" align="center" >
       <v-col class="col col1" cols="9" align = 'center'>
           <figure class="highcharts-figure">
               <div id="container5"></div>
           </figure>
       </v-col>
   </v-row> 
</v-container>
</template>

<script setup>
/** JAVASCRIPT HERE */

// IMPORTS
import { ref,reactive,watch ,onMounted,onBeforeUnmount,computed } from "vue";  
import { useRoute ,useRouter } from "vue-router";
import { useMqttStore } from "@/store/mqttStore";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/appStore";
// Highcharts, Load the exporting module and Initialize exporting module.
import Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts); 
more(Highcharts);

// VARIABLES
const Mqtt = useMqttStore();
const { payload, payloadTopic } = storeToRefs(Mqtt);
const router      = useRouter();
const route       = useRoute();  
let timer, ID = 1000;
const tempHiChart = ref(null); // Chart object
const humidHiChart = ref(null); // Chart object
const heatHiChart = ref(null); // Chart object
const soilHiChart = ref(null); // Chart object
const pressHiChart = ref(null); // Chart object
const altHiChart = ref(null); // Chart object
const points = ref(600); // Specify the quantity of points to be shown on the live graph simultaneously.
const shift = ref(false); // Delete a point from the left side and append a new point to the right side of the graph.
const AppStore = useAppStore();

const temperature = computed(()=>{
if(!!payload.value){
return `${payload.value.temperature.toFixed(2)} °C`;
}
});

const hindex = computed(()=>{
if(!!payload.value){
return `${payload.value.hindex.toFixed(2)} °F`;
}
});

const humidity = computed(()=>{
if(!!payload.value){
return `${payload.value.humidity.toFixed(2)} %`;
}
});


const farTemperature = computed(()=>{
if(!!payload.value){
return `${payload.value.farTemperature.toFixed(2)} °F`;
}
});

const soil_moisture = computed(()=>{
if(!!payload.value){
return `${payload.value.soil_moisture.toFixed(2)} %`;
}
});

const BMP_temperature = computed(()=>{
if(!!payload.value){
return `${payload.value.BMP_temperature.toFixed(2)} °C`;
}
});

const pressure = computed(()=>{
if(!!payload.value){
return `${payload.value.pressure.toFixed(2)} Pa`;
}
});

const Altitude = computed(()=>{
if(!!payload.value){
return `${payload.value.Altitude.toFixed(2)} m`;
}
});

const labels = { 0: 'SU', 1: 'MON', 2: 'TUES', 3: 'WED', 4: 'THUR', 5: 'FRI', 6: 'SAT' }
  const forecast = [
    { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\u00B0/12\u00B0' },
    { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\u00B0/14\u00B0' },
    { day: 'Thursday', icon: 'mdi-cloud', temp: '25\u00B0/15\u00B0' },
  ]

const expand = ref(false)
  const time = ref(0)



// FUNCTIONS
const refreshAllData = () => {

   // Reload the entire page
   window.location.reload();
};

// Trigger the refresh every 30 seconds
setInterval(refreshAllData, 30000);


const CreateCharts = async () => {
// TEMPERATURE CHART
tempHiChart.value = Highcharts.chart('container', {
chart: { zoomType: 'x' },
title: { text: 'DHT Air Temperature and BMP Air Temperature Analysis', align: 'left' },
yAxis: { 
   title: { text: 'Air Temperature ' , style:{color:'#000000'}},
   labels: { format: '{value} °C' } 
},
xAxis: {
   type: 'datetime', 
   title: { text: 'Time', style:{color:'#000000'} },
},
tooltip: { shared:true, },
series: [
   {
       name: 'DHT Temperature',
       type: 'spline',
       data: [],
       turboThreshold: 0,
       color: Highcharts.getOptions().colors[0]
   }, 
   {
       name: 'BMP Temperature',
       type: 'spline',
       data: [],
       turboThreshold: 0,
       color: Highcharts.getOptions().colors[2]
   }],
});

// HUMIDITY CHART
humidHiChart.value = Highcharts.chart('container1', {
chart: { zoomType: 'x' },
title: { text: 'Humidity Analysis', align: 'left' },
yAxis: { 
   title: { text: 'Humidity' , style:{color:'#000000'}},
   labels: { format: '{value} °C' } 
},
xAxis: {
   type: 'datetime', 
   title: { text: 'Time', style:{color:'#000000'} },
},
tooltip: { shared:true, },
series: [
   {
       name: 'Humidity',
       type: 'spline',
       data: [],
       turboThreshold: 0,
       color: Highcharts.getOptions().colors[4]
   }],
});

// HEAT INDEX CHART
heatHiChart.value = Highcharts.chart('container2', {
chart: { zoomType: 'x' },
title: { text: 'Heat Index Analysis', align: 'left' },
yAxis: { 
   title: { text: 'Heat Index' , style:{color:'#000000'}},
   labels: { format: '{value} °F' } 
},
xAxis: {
   type: 'datetime', 
   title: { text: 'Time', style:{color:'#000000'} },
},
tooltip: { shared:true, },
series: [
   {
       name: 'Heat Index',
       type: 'scatter',
       data: [],
       turboThreshold: 0,
       color: Highcharts.getOptions().colors[3]
   }],
});

// SOIL MOISTURE CHART
soilHiChart.value = Highcharts.chart('container3', {
chart: { zoomType: 'x' },
title: { text: 'Soil Moisture Analysis', align: 'left' },
yAxis: { 
   title: { text: 'Soil Moisture' , style:{color:'#000000'}},
   labels: { format: '{value} %' } 
},
xAxis: {
   type: 'datetime', 
   title: { text: 'Time', style:{color:'#000000'} },
},
tooltip: { shared:true, },
series: [
   {
       name: 'Soil Moisture',
       type: 'scatter',
       data: [],
       turboThreshold: 0,
       color: Highcharts.getOptions().colors[5]
   }],
});

//PRESSURE  CHART
pressHiChart.value = Highcharts.chart('container4', {
chart: { zoomType: 'x' },
title: { text: 'Atmospheric Pressure Analysis', align: 'left' },
yAxis: { 
   title: { text: 'Atmospheric Pressure' , style:{color:'#000000'}},
   labels: { format: '{value} Pa' } 
},
xAxis: {
   type: 'datetime', 
   title: { text: 'Time', style:{color:'#000000'} },
},
tooltip: { shared:true, },
series: [
   {
       name: 'Atmospheric Pressure',
       type: 'areaspline',
       data: [],
       turboThreshold: 0,
       color: Highcharts.getOptions().colors[9]
   }],
});

//ALTITUDE  CHART
altHiChart.value = Highcharts.chart('container5', {
chart: { zoomType: 'x' },
title: { text: 'Altitude Analysis', align: 'left' },
yAxis: { 
   title: { text: 'Altitude' , style:{color:'#000000'}},
   labels: { format: '{value} m' } 
},
xAxis: {
   type: 'datetime', 
   title: { text: 'Time', style:{color:'#000000'} },
},
tooltip: { shared:true, },
series: [
   {
       name: 'Altitude',
       type: 'areaspline',
       data: [],
       turboThreshold: 0,
       color: Highcharts.getOptions().colors[8]
   }],
});
};

onMounted(()=>{
// THIS FUNCTION IS CALLED AFTER THIS COMPONENT HAS BEEN MOUNTED 
CreateCharts();
Mqtt.connect(); // Connect to Broker located on the backend
setTimeout( ()=>{
   // Subscribe to each topic
   Mqtt.subscribe("620152241"); 
   Mqtt.subscribe("620152241_sub");
},3000);
});

onBeforeUnmount(()=>{
// THIS FUNCTION IS CALLED RIGHT BEFORE THIS COMPONENT IS UNMOUNTED
Mqtt.unsubcribeAll();
});





// WATCHERS
watch(payload,(data)=> {
if(points.value > 0){ points.value -- ; }
else{ shift.value = true; }

tempHiChart.value.series[0].addPoint({y:parseFloat(data.temperature.toFixed(2)) ,x: data.timestamp * 1000 },
true, shift.value);

tempHiChart.value.series[1].addPoint({y:parseFloat(data.BMP_temperature.toFixed(2)) ,x: data.timestamp * 1000 },
true, shift.value);

heatHiChart.value.series[0].addPoint({y:parseFloat(data.hindex.toFixed(2)) ,x: data.timestamp * 1000 },
true, shift.value);

humidHiChart.value.series[0].addPoint({y:parseFloat(data.humidity.toFixed(2)) ,x: data.timestamp * 1000 }, true, shift.value); 


soilHiChart.value.series[0].addPoint({y:parseFloat(data.temperature.toFixed(2)) ,x: data.timestamp * 1000 },
true, shift.value);

pressHiChart.value.series[0].addPoint({y:parseFloat(data.hindex.toFixed(2)) ,x: data.timestamp * 1000 },
true, shift.value);

altHiChart.value.series[0].addPoint({y:parseFloat(data.humidity.toFixed(2)) ,x: data.timestamp * 1000 }, true, shift.value); 

})
</script>

<script>
  export default {
    data: () => ({
      labels: { 0: 'SU', 1: 'MON', 2: 'TUES', 3: 'WED', 4: 'THUR', 5: 'FRI', 6: 'SAT' },
      expand: false,
      time: 0,
      forecast: [
        { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
        { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
        { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
      ],
    }),

    data() {
    return {
      // Dummy variable to trigger re-render
      dummyVariable: 0
    };
  },
  methods: {
    // Method to refresh all data on the page
    refreshAllData() {
      // Call the same refreshAllData function defined above
      refreshAllData();
    }
  }
  }
</script>


<style scoped>
/** CSS STYLE HERE */

Figure {
border: 2px solid black;
}
.container {
background-color: #f5f5f5;
width: 1200px;
height: 900px;
}


.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

</style>

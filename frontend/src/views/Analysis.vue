<template>
  <v-container fluid align=" center" color=" surface" class="vg-surface" >
    <v-row class="row1" max-width="1200px" justify="center" align="center" padding="1">
        <v-col class="col col1"  >
            <v-sheet class="pa-2" height="250"  elevation="6" border color="blue-grey-lighten-5">
                <p>Enter date range for Analysis</p>
                <v-divider></v-divider>
                <v-text-field label="Start date" type="Date" density="compact" solo-inverted class="mr-5" max-width="300px" flat v-model="start"></v-text-field>
                <v-text-field label="End date" type="Date" density="compact" solo-inverted class="mr-5" max-width="300px" flat v-model="end"></v-text-field>
                
                <v-spacer></v-spacer>
                <VBtn @click="updateLineCharts(); updateCards(); updateHistogramCharts();updateScatter(); " text="Analyze" color="primaryContainer" tonal></VBtn>
                </v-sheet> 
        </v-col>

        <v-col class="col col2" cols="3" align="center"> 
            <v-card title="Temperature" width="250" outlines color="secondaryContainer" density="compact" rounded="lg" border>
                <v-card-item class="mb-n5">
                    <v-chip-group class="d-flex flex-row justify-center" color="primaryContainer" flat>
                        <v-tooltip text="Min" location="start">
                            <template v-slot:activator="{props}">
                                <v-chip v-bind="props">{{ temperature.min }}</v-chip>
                            </template>             
                        </v-tooltip>
                        <v-tooltip text="Range" location="top">
                            <template v-slot:activator="{props}">
                                <v-chip v-bind="props">{{ temperature.range }}</v-chip>
                            </template>     
                        </v-tooltip>
                        <v-tooltip text="Max" location="end">
                            <template v-slot:activator="{props}">
                                <v-chip v-bind="props">{{ temperature.max }}</v-chip>
                            </template>     
                        </v-tooltip>
                    </v-chip-group>
                </v-card-item>
                <v-card-item align="center">
                    <span class="text-h1 text-primary font-weight-bold">
                        {{ temperature.avg }}
                    </span>
                </v-card-item>
            </v-card>
        </v-col>

    <v-col class="col col3" cols="3" align="center"> 
                    <v-card title="Humidity" width="250" outlines color="secondaryContainer" density="compact" rounded="lg" border>
                        <v-card-item class="mb-n5">
                            <v-chip-group class="d-flex flex-row justify-center" color="primaryContainer" flat>
                                <v-tooltip text="Min" location="start">
                                    <template v-slot:activator="{props}">
                                        <v-chip v-bind="props">{{ humidity.min }}</v-chip>
                                    </template>             
                                </v-tooltip>
                                <v-tooltip text="Range" location="top">
                                    <template v-slot:activator="{props}">
                                        <v-chip v-bind="props">{{ humidity.range }}</v-chip>
                                    </template>     
                                </v-tooltip>
                                <v-tooltip text="Max" location="end">
                                    <template v-slot:activator="{props}">
                                        <v-chip v-bind="props">{{ humidity.max }}</v-chip>
                                    </template>     
                                </v-tooltip>
                            </v-chip-group>
                        </v-card-item>
                        <v-card-item align="center">
                            <span class="text-h1 text-primary font-weight-bold">
                                {{ humidity.avg }}
                            </span>
                        </v-card-item>
                    </v-card>
                </v-col>


    <v-col class="col col4" cols="3" align="center"> 
            <v-card title="Soil Moisture" width="250" outlines color="secondaryContainer" density="compact" rounded="lg" border>
                <v-card-item class="mb-n4">
                    <v-chip-group class="d-flex flex-row justify-center" color="primaryContainer" flat>
                        <v-tooltip text="Min" location="start">
                            <template v-slot:activator="{props}">
                                <v-chip v-bind="props">{{ soil_moisture.min }}</v-chip>
                            </template>             
                        </v-tooltip>
                        <v-tooltip text="Range" location="top">
                            <template v-slot:activator="{props}">
                                <v-chip v-bind="props">{{ soil_moisture.range }}</v-chip>
                            </template>     
                        </v-tooltip>
                        <v-tooltip text="Max" location="end">
                            <template v-slot:activator="{props}">
                                <v-chip v-bind="props">{{ soil_moisture.max }}</v-chip>
                            </template>     
                        </v-tooltip>
                    </v-chip-group>
                </v-card-item>
                <v-card-item align="center">
                    <span class="text-h1 text-primary font-weight-bold">
                        {{ soil_moisture.avg }}
                    </span>
                </v-card-item>
            </v-card>
        </v-col>

                
    </v-row>

    <v-row max-width="1200px" justify="start" align="center">
        <v-col class="col col1" cols="6" align = 'center'>
            <figure class="highcharts-figure">
                <div id="container"></div>
            </figure>
        </v-col>
          
        <v-col class="col col2" cols="6" align="center">
            <figure class="highcharts-figure">
                <div id="container0"></div>
            </figure>
        </v-col>
    </v-row>

    <v-row max-width="1200px" justify="start" align="center">
        <v-col class="col col1" cols="6" align="center" style="border-right: 2px solid black;">
            <figure class="highcharts-figure">
                <div id="container1"></div>
            </figure>
        </v-col>

        <v-col class="col col2" cols="6" align="center">
            <figure class="highcharts-figure">
                <div id="container2"></div>
            </figure>
        </v-col>
    </v-row>

    <v-row max-width="1200px" justify="start" align="center">
        <v-col class="col col1" cols="6" align="center" style="border-right: 2px solid black;">
            <figure class="highcharts-figure">
                <div id="container3"></div>
            </figure>
        </v-col>

        <v-col class="col col1" cols="6" align="center" style="border-right: 2px solid black;"> 
         <v-sheet >           
           <v-card class="text-secondary" title="Moisture Level" color="surface" subtitle="Soil Moisture" variant="tonal" flat>
             <div id="fluid-meter"></div> 
             <v-dialog v-model="overflowDialog" max-width="400">
                <template v-slot:default="{ overflowDialog }">
                    <v-card title="High Moisture Detected" color="warning" background-color="primary darken-1">
                        <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
                </v-card>
                </template>
                </v-dialog>       
         </v-card>
       </v-sheet>
       </v-col>
    </v-row> 

    <v-row max-width="1200px" justify="start" align="center">
        <v-col class="col col1" cols="6" align="center" style="border-right: 2px solid black;">
            <figure class="highcharts-figure">
                <div id="container4"></div>
            </figure>
        </v-col>

        <v-col class="col col2" cols="6" align="center">
            <figure class="highcharts-figure">
                <div id="container5"></div>
            </figure>
        </v-col>
    </v-row>

    <v-row max-width="1200px" justify="start" align="center">
        <v-col class="col col1" cols="6" align="center" style="border-right: 2px solid black;">
            <figure class="highcharts-figure">
                <div id="container6"></div>
            </figure>
        </v-col>

        <v-col class="col col2" cols="6" align="center">
            <figure class="highcharts-figure">
                <div id="container7"></div>
            </figure>
        </v-col>
    </v-row>

</v-container>
</template>


<script setup>
/** JAVASCRIPT HERE */

import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import Exporting from "highcharts/modules/exporting";
import { withDirectives } from "vue";
Exporting(Highcharts);
more(Highcharts);

// IMPORTS
import { useMqttStore } from "@/store/mqttStore"; // Import Mqtt Store
import { storeToRefs } from "pinia";

import { useAppStore } from "@/store/appStore";
import {
ref,
reactive,
watch,
onMounted,
onBeforeUnmount,
computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";

// VARIABLES
const Mqtt = useMqttStore();
const AppStore = useAppStore();
const router = useRouter();
const route = useRoute();
var start = ref(null);
var end = ref(null);
const tempHiLine = ref(null); // Chart object
const humLine = ref(null); // Chart object
const histo = ref(null); // Chart object
const BtempHiScat = ref(null); // Chart object
const humScat = ref(null); // Chart object
const BMPhisto = ref(null); // Chart object
const pressureHiLine = ref(null); // Chart object
const altHiLine = ref(null); // Chart object
const tempBHiChart = ref(null); // Chart object
const paltHiChart = ref(null); // Chart object
const soilHiChart = ref(null); // Chart object
var temperature = reactive({ min: 0, max: 0, avg: 0, range: 0 });
var humidity = reactive({ min: 0, max: 0, avg: 0, range: 0 });
var soil_moisture = reactive({ min: 0, max: 0, avg: 0, range: 0 });
var fm = new FluidMeter();
const { payload, payloadTopic } = storeToRefs(Mqtt);
let overflowDialog = ref(false);

// FUNCTIONS
// const altit= computed(()=>{
//     if(!!payload.value){
//       return '${payload.value.soil_moisture.toFixed(2)} inches';
//     }
//     }
//   );

const alti = computed(() => {
  if (!!payload.value) {
    return `${payload.value.soil_moisture.toFixed(2)} inches`;
  }
});


const CreateCharts = async () => {
// TEMPERATURE CHART
tempHiLine.value = Highcharts.chart("container", {
  chart: { zoomType: "x" },
  title: { text: "DHT Air Temperature and Heat Index Analysis", align: "left" },
  subtitle: {
    text:
      " The heat index, also known as the apparent temperature, is a measure that combines air temperature and relative humidity to assess how hot it feels to the human body. " +
      "The relationship between heat index and air temperature is influenced by humidity levels. As humidity increases, the heat" +
      "index also rises, making the perceived temperature higher than the actual air temperature.",
  },
  yAxis: {
    title: {
      text: "Air Temperature & Heat Index",
      style: { color: "#000000" },
    },
    labels: { format: "{value} °C,°F" },
  },

  tooltip: {
    pointFormat: "Heatindex: {point.x} °C <br/> Temperature: {point.y} °C",
  },
  xAxis: {
    type: "datetime",
    title: { text: "Time", style: { color: "#000000" } },
  },
  tooltip: { shared: true },
  series: [
    {
      name: "Temperature",
      type: "line",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[0],
    },
    {
      name: "Heat Index",
      type: "line",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[9],
    },
  ],
});

humLine.value = Highcharts.chart("container0", {
  chart: { zoomType: "x" },
  title: { text: "Humidity Analysis", align: "left" },
  yAxis: {
    title: {
      text: "Humidity",
      style: { color: "#000000" },
    },
    labels: { format: "{value} %" },
  },

  tooltip: {
    pointFormat: "Humidity: {point.x} % ",
  },
  xAxis: {
    type: "datetime",
    title: { text: "Time", style: { color: "#000000" } },
  },
  tooltip: { shared: true },
  series: [
    {
      name: "Humidity",
      type: "line",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[0],
    },
  ],
});

// histo.value = Highcharts.chart("container1", {
//   chart: { zoomType: "x" },
//   title: { text: "BMP Analysis", align: "left" },
//   yAxis: {
//     title: {
//       text: "Temperature,Humidity,Heat Index",
//       style: { color: "#000000" },
//     },
//     labels: { format: "{value} °C °F"  },
//   },

//   xAxis: {
//     title: { text: "ID", style: { color: "#000000" } },
//   },
//   tooltip: { shared: true },
//   series: [
//     {
//       name: "Temperature",
//       type: "spline",
//       data: [],
//       turboThreshold: 0,
//       color: Highcharts.getOptions().colors[0],
//     },
//     {
//       name: "Humidity",
//       type: "spline",
//       data: [],
//       turboThreshold: 0,
//       color: Highcharts.getOptions().colors[4],
//     },
//     {
//       name: "Heat Index",
//       type: "spline",
//       data: [],
//       turboThreshold: 0,
//       color: Highcharts.getOptions().colors[7],
//     },
//   ],
// });





BtempHiScat.value = Highcharts.chart("container1", {
  chart: { zoomType: "x" },
  title: {
    text: "BMP Temperature & Heat Index Correlation Analysis",
    align: "left",
  },
  subtitle: {
    text: "Visualize the relationship between Temperature and Heat Index as well as revealing patterns or trends in the data",
  },
  yAxis: {
    title: {
      text: "Heat Index",
      style: { color: "#000000" },
    },
    labels: { format: "{value} °C" },
  },

  xAxis: {
    title: { text: "Temperature", style: { color: "#000000" } },
    labels: { format: "{value} °C" },
  },
  tooltip: {
    shared: true,
    pointFormat: "Temperature: {point.x} °C <br/> Heat Index: {point.y} °C",
  },
  series: [
    {
      name: "Analysis",
      type: "scatter",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[0],
    },
  ],
});

humScat.value = Highcharts.chart("container2", {
  chart: { zoomType: "x" },
  title: {
    text: "Humidity & Heat Index Correlation Analysis",
    align: "left",
  },
  subtitle: {
    text: "Visualize the relationship between Humidity and Heat Index as well as revealing patterns or trends in the data",
  },
  yAxis: {
    title: {
      text: "Heat Index",
      style: { color: "#000000" },
    },
    labels: { format: "{value} °C" },
  },

  xAxis: {
    title: { text: "Humidity", style: { color: "#000000" } },
    labels: { format: "{value} %" },
  },
  tooltip: {
    shared: true,
    pointFormat: "Humidity: {point.x} °C <br/> Heat Index: {point.y} °C",
  },
  series: [
    {
      name: "Analysis",
      type: "scatter",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[5],
    },
  ],
});

// BMPhisto.value = Highcharts.chart("container4", {
//   chart: { zoomType: "x" },
//   title: { text: "BMP Sensor Analysis", align: "left" },
//   yAxis: {
//     title: {
//       text: "Frequency",
//       style: { color: "#000000" },
//     },
//     labels: { format: "{value}" },
//   },

//   xAxis: {
//     title: { text: "ID", style: { color: "#000000" } },
//   },
//   tooltip: { shared: true },
//   series: [
//     {
//       name: "BMP Temperature",
//       type: "column",
//       data: [],
//       turboThreshold: 0,
//       color: Highcharts.getOptions().colors[0],
//     },
//     {
//       name: "Altitude",
//       type: "column",
//       data: [],
//       turboThreshold: 0,
//       color: Highcharts.getOptions().colors[1],
//     },
//     {
//       name: "Pressure",
//       type: "column",
//       data: [],
//       turboThreshold: 0,
//       color: Highcharts.getOptions().colors[2],
//     },
//   ],
// });

fm.init({
  targetContainer: document.getElementById("fluid-meter"),
  fillPercentage: 15,
  options: {
    fontSize: "70px",
    fontFamily: "Arial",
    fontFillStyle: "white",
    drawShadow: true,
    drawText: true,
    drawPercentageSign: true,
    drawBubbles: true,
    size: 300,
    borderWidth: 25,
    backgroundColor: "#e2e2e2",
    foregroundColor: "#fafafa",
    foregroundFluidLayer: {
      fillStyle: "#8aff80",
      angularSpeed: 100,
      maxAmplitude: 12,
      frequency: 30,
      horizontalSpeed: -150
    },
    backgroundFluidLayer: {
      fillStyle: "#c8a2c8",
      angularSpeed: 100,
      maxAmplitude: 9,
      frequency: 30,
      horizontalSpeed: 150
    }
  }
});

altHiLine.value = Highcharts.chart("container3", {
  chart: { zoomType: "x" },
  title: { text: "Altitude Analysis", align: "left" },
  yAxis: {
    title: {
      text: "Altitude",
      style: { color: "#000000" },
    },
    labels: { format: "{value} m" },
  },

  tooltip: {
    pointFormat: "Altitude: {point.x} m ",
  },
  xAxis: {
    type: "datetime",
    title: { text: "Time", style: { color: "#000000" } },
  },
  tooltip: { shared: true },
  series: [
    {
      name: "Altitude",
      type: "areaspline",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[3],
    },
  ],
});

pressureHiLine.value = Highcharts.chart("container4", {
  chart: { zoomType: "x" },
  title: { text: "Pressure Analysis", align: "left" },
  yAxis: {
    title: {
      text: "Pressure",
      style: { color: "#000000" },
    },
    labels: { format: "{value} Pa" },
  },

  tooltip: {
    pointFormat: "Pressure: {point.x} Pa ",
  },
  xAxis: {
    type: "datetime",
    title: { text: "Time", style: { color: "#000000" } },
  },
  tooltip: { shared: true },
  series: [
    {
      name: "Pressure",
      type: "areaspline",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[5],
    },
  ],
});

// TEMPERATURE CHART
tempBHiChart.value = Highcharts.chart("container5", {
  chart: { zoomType: "x" },
  title: { text: "DHT Air Temperature and BMP Air Temperature Analysis", align: "left" },
  yAxis: {
    title: {
      text: "DHT and BMP Air Temperature ",
      style: { color: "#000000" },
    },
    labels: { format: "{value} °C" },
  },

  tooltip: {
    pointFormat: " Temperature: {point.y} °C",
  },
  xAxis: {
    type: "datetime",
    title: { text: "Time", style: { color: "#000000" } },
  },
  tooltip: { shared: true },
  series: [
    {
      name: "DHT Temperature",
      type: "scatter",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[1],
    },
    {
      name: "BMP Temperature",
      type: "scatter",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[7],
    },
  ],
});

paltHiChart.value = Highcharts.chart("container6", {
  chart: { zoomType: "x" },
  title: { text: "Pressure and Altitude Analysis", align: "left" },
  yAxis: {
    title: {
      text: "Altitude and Pressure",
      style: { color: "#000000" },
    },
    labels: { format: "{value} m" },
  },

  tooltip: {
    pointFormat: "Pressure: {point.x} Pa <br/> Altitude: {point.y} m",
  },
  xAxis: {
    type: "datetime",
    title: { text: "Time", style: { color: "#000000" } },
  },
  tooltip: { shared: true },
  series: [
    {
      name: "Altitude",
      type: "areaspline",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[2],
    },
    {
      name: "Pressure",
      type: "spline",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[4],
    },
  ],
});

soilHiChart.value = Highcharts.chart("container7", {
  chart: { zoomType: "x" },
  title: { text: "Soil Moisture Analysis", align: "left" },
  yAxis: {
    title: {
      text: "Soil Moisture",
      style: { color: "#000000" },
    },
    labels: { format: "{value} %" },
  },

  tooltip: {
    pointFormat: "Soil Moisture: {point.x} %",
  },
  xAxis: {
    type: "datetime",
    title: { text: "Time", style: { color: "#000000" } },
  },
  tooltip: { shared: true },
  series: [
    {
      name: "Soil Moisture",
      type: "areaspline",
      data: [],
      turboThreshold: 0,
      color: Highcharts.getOptions().colors[2],
    },
    
  ],
});
};

onMounted(() => {
// THIS FUNCTION IS CALLED AFTER THIS COMPONENT HAS BEEN MOUNTED
Mqtt.connect(); // Connect to Broker located on the backend
setTimeout(() => {
  // Subscribe to each topic
  Mqtt.subscribe("620152241");
  Mqtt.subscribe("620152241_sub");
}, 3000);
CreateCharts();
});

onBeforeUnmount(() => {
// THIS FUNCTION IS CALLED RIGHT BEFORE THIS COMPONENT IS UNMOUNTED
Mqtt.unsubcribeAll();
});

const updateLineCharts = async () => {
if (!!start.value && !!end.value) {
  // Convert output from Textfield components to 10 digit timestamps
  let startDate = new Date(start.value).getTime() / 1000;
  let endDate = new Date(end.value).getTime() / 1000;
  // Fetch data from backend
  const data = await AppStore.getAllInRange(startDate, endDate);
  // Create arrays for each plot
  let temperatur = [];
  let BMP_temperature = [];
  let hindex = [];
  let humidity = [];
  let Altitude = [];
  let pressure = [];
  let moisture = [];
  // Iterate through data variable and transform object to format recognized by highcharts
  data.forEach((row) => {
    temperatur.push({x: row.timestamp * 1000,y: parseFloat(row.temperature.toFixed(2)), });
    hindex.push({x: row.timestamp * 1000,y: parseFloat(row.hindex.toFixed(2)), });
    humidity.push({x: row.timestamp * 1000,y: parseFloat(row.humidity.toFixed(2)), });
    Altitude.push({x: row.timestamp * 1000,y: parseFloat(row.Altitude.toFixed(2)), });
    pressure.push({x: row.timestamp * 1000,y: parseFloat(row.pressure.toFixed(2)), });
    BMP_temperature.push({x: row.timestamp * 1000,y: parseFloat(row.BMP_temperature.toFixed(2)), }); 
    moisture.push({x: row.timestamp * 1000,y: parseFloat(row.soil_moisture.toFixed(2)), });
  
  });
  // Add data to Temperature and Heat Index chart
  tempHiLine.value.series[0].setData(BMP_temperature);
  tempHiLine.value.series[1].setData(hindex);
  humLine.value.series[0].setData(humidity);
  altHiLine.value.series[0].setData(Altitude);
  pressureHiLine.value.series[0].setData(pressure);
  tempBHiChart.value.series[0].setData(temperatur);
  tempBHiChart.value.series[1].setData(BMP_temperature);

  paltHiChart.value.series[1].setData(pressure);
  paltHiChart.value.series[0].setData(Altitude);

  soilHiChart.value.series[0].setData(moisture);

  // histo.value.series[0].setData(BMP_temperature);
  // histo.value.series[1].setData(humidity);
  // histo.value.series[2].setData(hindex);

  // BMPhisto.value.series[0].setData(BMP_temperature);
  // BMPhisto.value.series[1].setData(Altitude);
  // BMPhisto.value.series[2].setData(Pressure);
}
};

const updateCards = async () => {
    // Retrieve Min, Max, Avg, Spread/Range
    if (!!start.value && !!end.value) {
        // 1. Convert start and end dates collected from TextFields to 10 digit timestamps
        let startDate = new Date(start.value).getTime() / 1000;
        let endDate = new Date(end.value).getTime() / 1000;
        // 2. Fetch data from backend by calling the API functions
        const temp = await AppStore.getTemperatureMMAR(startDate, endDate);
        const humid = await AppStore.getHumidityMMAR(startDate, endDate);
        const soil = await AppStore.getSoilMMAR(startDate, endDate);
        //console.log(temp);
        temperature.max = temp[0].max.toFixed(1);
        temperature.min = temp[0].min.toFixed(1);
        temperature.avg = temp[0].avg.toFixed(1);
        temperature.range = temp[0].range.toFixed(1);

        humidity.max = humid[0].max.toFixed(1);
        humidity.min = humid[0].min.toFixed(1);
        humidity.avg = humid[0].avg.toFixed(1);
        humidity.range = humid[0].range.toFixed(1);

        soil_moisture.max = soil[0].max.toFixed(1);
        soil_moisture.min = soil[0].min.toFixed(1);
        soil_moisture.avg = soil[0].avg.toFixed(1);
        soil_moisture.range = soil[0].range.toFixed(1);
    }
};


const updateHistogramCharts = async () => {
// // Retrieve Min, Max, Avg, Spread/Range for Column graph
// let startDate = new Date(start.value).getTime() / 1000;
// let endDate = new Date(end.value).getTime() / 1000;
// if (!!start.value && !!end.value) {
//   const temp = await AppStore.getFreqDistro("temperature",startDate,endDate);
//   const humid = await AppStore.getFreqDistro("humidity", startDate, endDate);
//   const hi = await AppStore.getFreqDistro("hindex", startDate, endDate);
//   const Btemp = await AppStore.getFreqDistro("BMP_temperature",startDate,endDate);
//   const alt = await AppStore.getFreqDistro("Altitude", startDate, endDate);
//   const press = await AppStore.getFreqDistro("pressure", startDate, endDate);
  
//   // 3. create an empty array for each variable (temperature, humidity and heatindex)
//   // see example below
//   let temperature = [];
//   let humidity = [];
//   let hindex = [];
//   let Btemperature = [];
//   let Altitude = [];
//   let Pressure = [];
//   temp.forEach((row) => {
//     temperature.push({ x: row["_id"], y: row["count"] });});
//   humid.forEach((row) => {
//     humidity.push({ x: row["_id"], y: row["count"] });});
//   hi.forEach((row) => {
//     hindex.push({ x: row["_id"], y: row["count"] });});
//   histo.value.series[0].setData(temperature);
//   histo.value.series[1].setData(humidity);
//   histo.value.series[2].setData(hindex);


//   Btemp.forEach((row) => {
//     Btemperature.push({ x: row["_id"], y: row["count"] });});
//   alt.forEach((row) => {
//     Altitude.push({ x: row["_id"], y: row["count"] });});
//   press.forEach((row) => {
//     Pressure.push({ x: row["_id"], y: row["count"] });});
//   BMPhisto.value.series[0].setData(Btemperature);
//   BMPhisto.value.series[1].setData(Altitude);
//   BMPhisto.value.series[2].setData(Pressure);

// }
};

const updateScatter = async () => {
if (!!start.value && !!end.value) {
  // Convert output from Textfield components to 10 digit timestamps
  let startDate = new Date(start.value).getTime() / 1000;
  let endDate = new Date(end.value).getTime() / 1000;
  // Fetch data from backend
  const data = await AppStore.getAllInRange(startDate, endDate);
  // Create arrays for each plot
  let scatterPoints1 = [];
  let scatterPoints2 = [];
  // Iterate through data variable and transform object to format recognized by highcharts
  data.forEach((row) => {
    scatterPoints1.push({
      x: parseFloat(row.BMP_temperature.toFixed(2)),
      y: parseFloat(row.hindex.toFixed(2)),
    });
  });

  data.forEach((row) => {
    scatterPoints2.push({
      x: parseFloat(row.humidity.toFixed(2)),
      y: parseFloat(row.hindex.toFixed(2)),
    });
  });
  // Add data to Temperature and Heat Index chart
  BtempHiScat.value.series[0].setData(scatterPoints1);
  humScat.value.series[0].setData(scatterPoints2);
}
};

watch(payload, (data) => {
    // THIS FUNCTION IS CALLED WHEN THE VALUE OF THE VARIABLE "payload" CHANGES
    
    // if(areaGraph.value.series[0].points.value > 550){ 
    //     areaGraph.value.series[0].points.value -- ; }
    //     else{ shift.value = true; }
    
    //radarValue.value = data.radar 
    
    if (data.soil_moisture >= 100) {
      fm.setPercentage(100);
     
    //   areaGraph.value.series[0].addPoint({ y: parseFloat(data.waterheight.toFixed(2)), x: data.timestamp*1000 }, true, shift.values); // Add new data point
    //   waterReserveGraph.value.series[0].points[0].update(1000); // Add new data point
     }
    else if (data.soil_moisture <= 0) {
      fm.setPercentage(0);
      // areaGraph.value.series[0].addPoint({ y: 0, x: data.timestamp*1000 }, true, shift.values); // Add new data point
      // waterReserveGraph.value.series[0].points[0].update(0); // Add new data point

    }
    else{
      fm.setPercentage(data.soil_moisture.toFixed(2));
      // areaGraph.value.series[0].addPoint({ y: parseFloat(data.waterheight.toFixed(2)), x: data.timestamp*1000  }, true, shift.values); // Add new data point
      // waterReserveGraph.value.series[0].points[0].update(parseFloat(data.reserve.toFixed(2)));
    }    

      console.log(data.soil_moisture);
      if (data.soil_moisture >100 || data.soil_moisture < 2) {
        overflowDialog.value = true;
        } else {
            overflowDialog.value = false;
        }
});
</script>

<style scoped>
/** CSS STYLE HERE */

.container {
background-color: #f5f5f5;
width: 1200px;
}

.row {
max-width: 1200px;
}

.row1 {
max-width: 1200px;
padding: 1;
}

.col1 {
border: black;
}

.sheet {
padding: 2;
height: 250;
}

Figure {
border: 2px solid black;
}
</style>


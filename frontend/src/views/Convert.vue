<template>
    <v-container fluid align ="center">

      <v-row>
            <v-col  align ="center" >
                <v-card class="bg-background" justify="center" flat color="secondaryContainer" append-icon="mdi-thermometer" max-width="12000" prepend-icon="mdi-cloud" subtitle="New Minature Weather Station Model" title="SHWeather" loading>
                  <v-card append-icon="mdi-weather-rainy" append-icon-color="red" class="mx-auto" max-width="344" prepend-icon="mdi-weather-windy-variant" subtitle=".................................................." title="Summary" color="tertiaryContainer" >
        <v-card-text>This weather station is capable of reading temperature, pressure, altitude, soil moisture and many more in updates to come .</v-card-text>
          </v-card>
            <br />      
         </v-card>
          </v-col>
        </v-row>
      
        <v-row>
         <v-col >
          <v-card class="mb-5" margin-bottom="5" max-width="500" color="primaryContainer" subtitle="CONVERT NOW" >
            <v-card-item>            
              <v-select v-model="selConvert" :items="conversionTypes" label="Select A Type of Conversion" outlined>
              </v-select>
              <v-btn  color="primaryContainer" variant="tonal"
              ></v-btn>
         </v-card-item>

         </v-card>
      </v-col>
      <v-col >
        <v-card  class="mb-5" margin-bottom="5" max-width="500" color="primaryContainer" subtitle="VALUE">
            <v-card-item>     
            <v-text-field v-model="inVal" label="Enter value" type="number" outlined>
          </v-text-field>
            <v-btn @click="convert" color="Secondary" variant="tonal"
              >Convert</v-btn>
        </v-card-item>
         </v-card>
      </v-col> 
    </v-row>

        <v-row>
          <v-col cols="10" class="mx-auto">
          <v-card append-icon="mdi-flower" append-icon-color="red" class="mx-auto" max-width="1500" prepend-icon="mdi-flower" subtitle="........................................................" title="Results" color="tertiaryContainer" >
          <v-text-field v-if="answer !== null" label="Click Me to See" outlined dense readonly :value="answer" append-icon="mdi-hand-pointing-left" >
          </v-text-field>
        </v-card>
      </v-col>
        </v-row>

        <v-row jusify="center" max width = "1200px;">
            <v-col color="surface" elevation="14" max-width="800" width="100%" class="col col1" cols="6">
              
                <v-card loading class="" title="Around the World Weather" color="secondaryContainer" subtitle="Type in a country near you "  flat border>
                  <div id="app">
                  <main>
                    <div class="search-box">
                      <input 
                      type="text" 
                      class="search-bar" 
                      placeholder="Search..."
                      v-model="query"
                      @keypress="fetchWeather"
                      />
                    </div>

                    <div class="weather-wrap" v-if="typeof weather.current != 'undefined'" >
                      <div class="location-box">
                        <div class="location">
                          {{ weather.location.name }}
                        </div>
                        <div class="date">
                          {{ dateBuilder() }}
                        </div>
                      </div>
                      <div class="weather-box">
                        <div class="temp">{{ weather.current.temp_c }}°C</div>
                        <div class="weather">{{ weather.current.condition.text }}</div>
                        <div class="wind">Wind :{{ weather.current.wind_kph }} km/h direction {{ weather.current.wind_dir }} </div>
                        <div class="humidity">Humidity : {{ weather.current.humidity }}%</div>
                      </div>
                    </div>
                  </main>
                </div>
                    </v-card>
            </v-col>
       
        
          <v-col color="surface" elevation="14" max-width="800" width="100%" class="col col1" cols="6"> 
          <v-card width="700">
            <v-img
              class="text-white"
              height="200"
              src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
              cover
            >
              <v-toolbar
                color="rgba(0, 0, 0, 0)"
                theme="dark"
              >
                <template v-slot:prepend>
                  <v-btn icon="$menu"></v-btn>
                </template>

                <v-toolbar-title class="text-h6">
                  Information
                </v-toolbar-title>

                <template v-slot:append>
                  <v-btn icon="mdi-dots-vertical"></v-btn>
                </template>
              </v-toolbar>
            </v-img>

            <v-card-text>
              <div class="font-weight-bold ms-1 mb-2">
                Page Details
              </div>

              <v-timeline align="start" density="compact">
                <v-timeline-item
                  v-for="message in messages"
                  :key="message.time"
                  :dot-color="message.color"
                  size="x-small"
                >
                  <div class="mb-4">
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                  <br /> 
                  <br /> 
                  <br /> 
                  <br /> 
                  <br /> 
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
              
    </v-row>


    </v-container>

    
    
</template>

<script setup>
/** JAVASCRIPT HERE */

// IMPORTS
import { ref,reactive,watch ,onMounted,onBeforeUnmount,computed } from "vue";  
import { useRoute ,useRouter } from "vue-router";
import { useMqttStore } from "@/store/mqttStore"; // Import Mqtt Store
 import { storeToRefs } from "pinia"; 
 import { useAppStore } from "@/store/appStore";


 
// VARIABLES
const router      = useRouter();
const route       = useRoute();  
var passcode = ref("0000");
const Mqtt = useMqttStore();
const AppStore = useAppStore();
const selConvert = ref(null);
var inVal = ref(null);
var answer = ref(null);
const conversionTypes = [
  { title: "Temperature: °C to °F", value: "c_to_f" },
  { title: "Temperature:°F to °C", value: "f_to_c" },
  { title: "Altitude: Meters to Yards", value: "m_to_yd" },
  { title: "Altitude: Yards to Meters", value: "yd_to_m" },
  { title: "Pressure: Kilo-Pascals to Inch of Mercury", value: "kpa_to_hg" },
  { title: "Pressure: Inch of Mercury to Kilo-Pascals", value: "hg_to_kpa" },

];

const messages = [
    {
      from: 'Our Weather Conversion Page',
      message: `Our weather conversion page features a short summary of weather parameters we offer as well as an option to convert pressure, alititude and temperature. `,
      time: 'Development ',
      color: 'deep-purple-lighten-1',
    },
    {
      from: 'Our Live Page',
      message: `Our live page features any realtime visual of our sensors collecting data `,
      time: 'Development ',
      color: 'green',
      
    },
    {
      from: 'Our Control Page ',
      message: 'Our Control Page provides an analytical view of past senosr data collect over a period of time ',
      time: 'Development ',
      color: 'deep-purple-lighten-1',
    },
  ]

  const convert = async () => {
  const value = parseFloat(inVal.value);
  if (isNaN(value)) {
    answer.value = "Number not valid, please try again.";
    return;
  }
  switch (selConvert.value) {
    case "m_to_yd":
      answer.value = `${value} m is ${(value * 1.094).toFixed(2)} ft`;
      break;
    case "yd_to_m":
      answer.value = `${value} ft is ${(value / 1.094).toFixed(2)} m`;
      break;
    case "kpa_to_hg":
      answer.value = `${value} kPa is ${(value / 3.386).toFixed(2)} inches of Mercury`;
      break;
    case "hg_to_kpa":
      answer.value = `${value} inches of Mercury is ${(value * 3.386).toFixed(2)} kPa`;
      break;
    case "c_to_f":
      answer.value = `${value}°C is ${((value * 9) / 5 + 32).toFixed(2)}°F`;
      break;
    case "f_to_c":
      answer.value = `${value}°F is ${(((value - 32) * 5) / 9).toFixed(2)}°C`;
      break;
    default:
      answer.value = "Select a method of conversion.";
  }
};
    
// FUNCTIONS
onMounted(()=>{
    // THIS FUNCTION IS CALLED RIGHT BEFORE THIS COMPONENT IS UNMOUNTED
    Mqtt.connect(); // Connect to Broker located on the backend
    setTimeout( ()=>{
    // Subscribe to each topic
    Mqtt.subscribe("620152241");
    Mqtt.subscribe("620152241_sub");
    },3000);
});


onBeforeUnmount(()=>{
    // unsubscribe from all topics
    Mqtt.unsubcribeAll();});

</script>

<script>
  export default {
  name: 'App',
  data() {
    return {
      messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple-lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple-lighten-1',
        },
      ],
      api_key: '8b90b8711a084f038d9160921230102',
      url_base: 'http://api.weatherapi.com/v1/',
      query: '',
      weather: {}
    };
  },

  methods: {
    fetchWeather(e) {
      //If Enter is pressed
      if (e.key == "Enter") {
        //http://api.weatherapi.com/v1/current.json?key=8b90b8711a084f038d9160921230102&q=London&aqi=no
        fetch(`${this.url_base}current.json?key=${this.api_key}&q=${this.query}`)
          .then((res) => res.json())
          .then(this.setResults);
      }
    },

    setResults(results) {
      this.weather = results;
    },

    dateBuilder() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }

  }
}
</script>


<style scoped>
/** CSS STYLE HERE */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
}

#app{
  background-image: url(@/assets//cold-bg.svg);
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.search-box{
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border:none;
  outline:none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus{
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .wind {
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .humidity {
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

</style>
  


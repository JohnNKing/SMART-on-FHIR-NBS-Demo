<template>
  <v-container>
    <v-responsive class="d-flex align-center text-left fill-height">
      <v-card v-show="page1" class="mx-auto" variant="outlined">

        <h2>Name</h2>
        <input :value="firstName" @input="event => firstName = event.target.value" placeholder="first">
        <input :value="lastName" @input="event => lastName = event.target.value" placeholder="last">
        <v-divider></v-divider>

        <h2>Date of Birth</h2>
        <input :value="dob" @input="event => dob = event.target.value" placeholder="mm/dd/yyyy">
        <v-divider></v-divider>

        <h2>Birthweight</h2>
        <input :value="birthweight" @input="event => birthweight = event.target.value" placeholder=""> grams
        <v-divider></v-divider>

        <h2>Birth Sex</h2>
        <input type="radio" id="sex" value="M" v-model="sex" />
        <label for="one">Male</label>&nbsp;
        <input type="radio" id="sex" value="F" v-model="sex" />
        <label for="two">Female</label>
        <v-divider></v-divider>

        <v-btn @click="submit">Submit</v-btn>
      </v-card>

      <v-card v-show="page2" class="mx-auto">
        <h1>Order Submitted</h1>
        <v-divider></v-divider>

        <div id='nbsCardLabel'>
          Last Name: <b>{{lastName}}</b><br>
          First Name: <b>{{firstName}}</b><br>
          Birth Date: <b>{{dob}}</b><br>
          Birth Weight: <b>{{birthweight}}</b><br>
          Sex: <b>{{sex}}</b><br>
        </div>
        <v-divider></v-divider>

        <v-btn @click="print">Print Label</v-btn>
  
      </v-card>
    </v-responsive>

  </v-container>
</template>


<style>
  @media print {
    body {
      margin: 0;
      color: black;
      font-size: 250%;
      background-color: white;
    }
    header.v-toolbar {
      display: none;
    }
    button.v-btn {
      display: none;
    }
    hr.v-divider {
      display: none;
    }
    h1 {
      display: none;
    }
  }
</style>

<!-- script lang="ts" setup -->
<script >
import axios from 'axios';
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      dob: null,
      birthweight: null,
      sex: null,
      page1: true,
      page2: false
    };
  },
  async mounted() {
    await this.getAuthFlowData();
    await this.getClinicalData();
  },
  methods: {
    async getAuthFlowData() {
      const self = this;
      try {
        const response = await axios.get('/auth/authFlowData', { withCredentials: true });
      } catch (error) {
        console.error(error);
      }
    },

    async getClinicalData() {
      const self = this;
      try {
        const response = await axios.get('/clinical-data', { withCredentials: true });
        console.log(response.data);

        let data = {};
        data.firstName = response.data[0].data.name[0].given[0];
        data.lastName = response.data[0].data.name[0].family;
        data.dob = response.data[0].data.birthDate;

        if (data.firstName !== undefined) {
          self.firstName = data.firstName;
        }
        if (data.lastName !== undefined) {
          self.lastName = data.lastName;
        }
        if (data.dob !== undefined) {
          self.dob = data.dob;
        }

      } catch (error) {
        console.error(error);
      }
    },

    submit(event) {
      const self = this;
      self.page1 = false;
      self.page2 = true;
    },

    print(event) {
      window.print();
    }
  }
};
</script>

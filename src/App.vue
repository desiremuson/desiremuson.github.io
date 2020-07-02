<template>
  <v-app>
    <v-app-bar app color="#9B2235" dark>
      <h2>Acme Bank</h2>
      <v-spacer></v-spacer>
      <h5>Desire Muson</h5>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import Dashboard from './components/Dashboard'
// import NewAccount from './components/NewAccount'
// import ViewAccount from './components/ViewAccount'
// import Withdraw from './components/Withdraw'

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  })
}
</script>

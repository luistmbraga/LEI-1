<template>
  <v-app-bar
    id="core-toolbar"
    app
    flat
    prominent
    :color= color
    height="40%"
      clipped-right
  >
                <center>
              <v-img src="https://cdn.discordapp.com/attachments/717034365611409463/722528536577048586/unknown.png" height=50 width=100></v-img>
              
              </center>
    <div class="v-toolbar-title" style="margin-top:10px; margin-left: 15px">
      <v-toolbar-title
        class="white--text font-weight-light"
      >
      
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
          
        </v-btn >
        <div class="font-weight-bold">
        {{ title }}
        </div>
      </v-toolbar-title>
    </div>

    <v-spacer />

   <v-text-field
      v-if="isLogged()"
      label="Procurar..."
      color="white"
      v-model="searchInput"
      hide-details
      style="max-width: 400px; margin-right: 32px; margin-top:10px;"
      dark
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2 white"
          elevation="1"
          fab
          small
          @click="search()"
        >
          <v-icon color="#900000">mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>


    <v-toolbar-items v-if="isLogged()">
      <v-flex
        align-center
        layout
        py-2
      >
        <router-link
          v-ripple
          class="toolbar-items"
          to="/universidade"
        >
          <v-icon color="white">mdi-view-dashboard</v-icon>
        </router-link>

        <router-link
          v-ripple
          class="toolbar-items"
          :to= user
        >
          <v-icon color="white">mdi-account</v-icon>
        </router-link>
                <router-link
          v-ripple
          class="toolbar-items"
          to="./" 
        >
                    <v-icon @click="logout()" color="white">mdi-logout</v-icon>
        </router-link>

        
      </v-flex>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>

import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    searchInput :"",
    title: null,
    responsive: false,
    color: "#900000",
    user: ""
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },
  mounted () {
    let utilizador = JSON.parse(localStorage.getItem("utilizador"))
    this.user = ""
    this.user = "/userProfile/" + utilizador.idUtilizador
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {

    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    logout: function(){
      if(confirm("De certeza que pretende terminar sessão?")){
        localStorage.removeItem("jwt");
        this.$emit('refreshLogout')
        this.color = "#900001"
      }
    },
    search (){
     this.$router.push({ name: 'Resultados da Pesquisa',params: {titulo: this.searchInput} })
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
    isLogged: function(){
      if (localStorage.getItem("jwt") == null) {
      return false
      } else {
      return true
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>

<template>
  <div>
        <p v-if="!ready">A ir buscar o Grupo à BD...</p>
        <div v-else> 
                <Publicacao :publicacoes="this.item.publicacoes" :idGrupo="this.idUniversidade" :tipoGrupo="this.tipoGrupo" :isCurso="false" />
        </div>
    </div>
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI

export default {
  name: 'consulta',
  components: {
    
  },

  data: () => ({
    item: {},
    idUniversidade: "",
    tipoGrupo: "",
    ready: false
  }),

  created: async function() {
    try {
      this.token = localStorage.getItem("jwt")
      this.idUniversidade = "UM"
      this.tipoGrupo = "cursos"
      let response = await axios.get(h + "cursos/" + this.idUniversidade + "?token=" + this.token )//
      this.item = response.data
      this.ready = true
    } catch (e) {
      return e
    }
  }
}
</script>

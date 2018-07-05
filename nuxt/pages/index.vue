<template>
  <div class="democheckout">
    <script type="text/javascript" :src="urlApi"></script>
    <div class="democheckout__iframe">
      <div id="checkoutContainer">
        <v-btn v-show="callCheckout && callModal" @click="openCheckout()">PAGAR (abrir modal)</v-btn>
      </div>
    </div>
    <v-spacer></v-spacer>
    <div class="democheckout__settings" row>
      <div class="democheckout__settings--toolbar" flat>
      <i class="icon"></i>
        <v-toolbar-title class="white--text">Generador API de Culqi checkout v3</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="generatecode()" :class="codemode ? 'codemode' : ''">
          <v-icon>code</v-icon>
        </v-btn>
      </div>
      <div class="democheckout__settings--content democheckout__settings--content-tabs" v-if="codemode">
        <v-tabs v-model="activetab" class="democheckout__tabs">   
          <v-tab ripple :href="'#tab-js'">JS</v-tab>       
          <v-tab ripple active :href="'#tab-html'">HTML</v-tab>
          <v-tab-item :id="'tab-js'">
            <v-icon class="content_copy" @click="copyContent('js')">content_copy</v-icon>
            <span class="copied">Copiado</span>
            <pre><code class="code">{{codetext.js}}</code></pre>
          </v-tab-item>
          <v-tab-item :id="'tab-html'">
            <v-icon class="content_copy" @click="copyContent('html')">content_copy</v-icon>
            <span class="copied">Copiado</span>
            <pre><code class="code">{{codetext.html}}</code></pre>
          </v-tab-item>
        </v-tabs>
      </div>
      <div class="democheckout__settings--content" v-show="!codemode">
        <div class="democheckout__settings--layout">
          <v-text-field
            label="Public Key"
            v-model="publicKey"
            disabled
          ></v-text-field>
          <v-text-field
            label="Tittle"
            v-model="settings.title"
          ></v-text-field>
          <v-text-field
            label="Description"
            v-model="settings.description"
          ></v-text-field>
          <div class="layout">
            <v-text-field
              label="Currency"
            v-model="settings.currency"
            ></v-text-field>
            <v-text-field
              label="Amount"
            v-model="settings.amount"
            ></v-text-field>
            <v-switch class="switchV"
              label="Options"
              v-model="includeoptions"
              @change="destroyCheckout()"
            ></v-switch>
          </div>
          <v-divider></v-divider>
          <div class="democheckout__settings--options" v-show="includeoptions">
            <h3>Options</h3>
            <div class="layout">
              <v-text-field
                label="Lang"
                v-model="options.lang"
              ></v-text-field>
              <v-switch class="switchV"
                label="Modal"
                v-model="options.modal"
              ></v-switch>
              <v-switch class="switchV"
                label="Only Inputs"
                v-model="options.onlyInputs"
              ></v-switch>
              <v-switch class="switchV"
                label="head"
                v-model="options.head"
              ></v-switch>
            </div>
            <h4>Style</h4>
            <div class="layout">
              <v-text-field
                label="Main Color"
                v-model="options.style.maincolor"
              ></v-text-field>
              <v-text-field
                label="BG Color"
                v-model="options.style.bgcolor"
              ></v-text-field>
              <v-text-field
                label="Main Text"
                v-model="options.style.maintext"
              ></v-text-field>
              <v-text-field
                label="Desc Text"
                v-model="options.style.desctext"
              ></v-text-field>            
            </div>
            <div class="layout">
              <v-text-field
                label="Button Text"
                v-model="options.style.buttontext"
              ></v-text-field>
              <v-text-field
                label="Disabled"
                v-model="options.style.disabledcolor"
              ></v-text-field>
              <v-text-field class="clq-setlogo"
                label="Logo"
                v-model="options.style.logo"
              ></v-text-field>         
            </div>
          </div>
        </div>      
        <v-btn class="democheckout__settings--button" @click="enviarDatos">Llamar checkout</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // urlApi: 'https://checkout.culqi.com/js/v3',
      urlApi: 'https://checkout-staging.culqi.com/js/v3',
      publicKey: 'pk_test_EEIucCCJGxa52Mst',
      settings: {
        title: 'Harol Store',
        currency: 'PEN',
        description: 'descripcion Culqi',
        amount: 39000
      },
      options:{
        lang: 'auto', // es  en  auto
        modal: true,
        onlyInputs: false,
        head: true,
        style: {
          bgcolor: '#f0f0f0',
          maincolor: '#53D3CA',
          disabledcolor: '#ffffff',
          buttontext: '#ffffff',
          maintext: '#4A4A4A',
          desctext: '#4A4A4A',
          logo: 'https://culqi.com/images/logo.png'
        }
      },
      includeoptions: false,
      codemode: false,
      codetext:{
        html:'',
        js: ''
      },
      activetab: 'tab-js',
      callCheckout: false,
      callModal: false
    }    
  },
  mounted () {
    const self = this
  },
  methods: {
    enviarDatos() {
      const self = this
      self.destroyCheckout()
      Culqi.publicKey = self.publicKey
      Culqi.container = 'checkoutContainer'
      self.callCheckout = true
      if (!self.includeoptions) {
        // Culqi.options(self.options)
        self.restoreOptions()
      }
      self.callModal = self.options.modal ? true : false 
      Culqi.options(self.options)
      Culqi.settings(self.settings)
      // CulqiJS.openCheckout('checkoutContainer')      
    },
    openCheckout() {
      Culqi.open()
    },
    destroyCheckout() {
      const self = this;
      var iframecontainer = document.querySelector("#checkoutContainer iframe")
      if(iframecontainer)
        iframecontainer.remove()

      self.callCheckout = false

    },
    restoreOptions() {
      this.options={
        lang: 'auto', // es  en  auto
        modal: true,
        onlyInputs: false,
        head: true,
        style: {
          bgcolor: '#f0f0f0',
          maincolor: '#53D3CA',
          disabledcolor: '#ffffff',
          buttontext: '#ffffff',
          maintext: '#4A4A4A',
          desctext: '#4A4A4A',
          logo: 'https://culqi.com/images/logo.png'
        }
      }
    },
    generatecode () {
      const self = this
      self.codemode = !self.codemode
      self.codetext.html = '<script type="text/javascript" src="'+self.urlApi+'"><\/script>\n\n'
      self.codetext.html = self.includeoptions ? self.codetext.html
      +'<div class="container">\n'
      +'  <div id="culqi_checkoutContainer"></div>\n'
      +'</div>\n'
      :self.codetext.html
      self.codetext.js = 'Culqi.publicKey = ' + self.publicKey + ';\n'
      self.codetext.js = self.includeoptions ? self.codetext.js
      + 'Culqi.container = "culqi_checkoutContainer";\n'
      + 'Culqi.options({' + '\n'
      + '  lang: ' + self.options.lang + ',\n'
      + '  modal: ' + self.options.modal + ',\n'
      + '  head: ' + self.options.head + ',\n'
      + '  onlyInputs: ' + self.options.onlyInputs + ',\n'
      + '  style= {' + '\n'
      + '    maincolor: ' + self.options.style.maincolor + ',\n'
      + '    bgcolor: ' + self.options.style.bgcolor + ',\n'
      + '    maintext: ' + self.options.style.maintext + ',\n'
      + '    desctext: ' + self.options.style.desctext + ',\n'
      + '    buttontext: ' + self.options.style.buttontext + ',\n'
      + '    disabledcolor: ' + self.options.style.disabledcolor + ',\n'
      + '    logo: ' + self.options.style.logo + '\n'
      + '  }\n'
      + '});\n'
      : self.codetext.js
      self.codetext.js = self.codetext.js
      + 'Culqi.settings({' + '\n'
      + '  title: ' + self.settings.title + ',\n'
      + '  currency: ' + self.settings.currency + ',\n'
      + '  description: ' + self.settings.description + ',\n'
      + '  amount: ' + self.settings.amount + '\n'
      + '});\n'
      
      self.codetext.js = self.includeoptions && self.options.modal==true ? self.codetext.js
      + '// Usar la función para llamar al checkout\n'
      + 'function callCheckout() {\n'
      + '  Culqi.open();\n'
      + '}\n'
      : self.codetext.js
      ////////////////////////////////////////
    },
    copyContent (content) {
      const self = this;
      var tocopy = ''
      if(content == 'js') {
        tocopy = self.codetext.js
      } else {
        tocopy = self.codetext.html
      }
      navigator.clipboard.writeText(tocopy)
    }
  }
}
</script>



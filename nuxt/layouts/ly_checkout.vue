<template>
  <div class="clq-checkout_container" :class="[options.modal?'clq-modal':'',!status.init?'clq-init':'']" ref="maincheckout">
    <div class="circCont" v-if="options.modal">
      <button class="circle" :class="local.close_modal ? 'closed' : ''" @click="closeModal()">
        <span></span>
      </button>
    </div>
    <transition name="fade">
      <div class="maskpage" v-show="status.load">
        <transition name="fade">
          <spinner class="spinner" v-show="status.load & status.checkout != 'success' & status.checkout != 'error'" :status="true" :color="options.style.maincolor"
          :size="status.spinner.size" :depth="status.spinner.depth" :rotation="true" :speed="0.7"></spinner>
        </transition>
        <div class="response_container">
          <transition name="fade">
            <div class="response" :class="['response__'+status.checkout, options.onlyInputs ? 'response__onlyInputs' : '']"
              @click="status.load = false">
               <!-- v-show="status.checkout == 'success' || status.checkout == 'error'" -->
            </div>
          </transition>
          <transition name="fade"> 
            <div id="feedback" v-show="status.checkout != '' && status.load">
              <p v-if="!options.onlyInputs">{{status.text}}</p>
            </div>
          </transition>
        </div>        
      </div>
    </transition>
    <transition name="expand">
      <div class="productDetail expand-transition" v-if="options.head && !options.onlyInputs" v-show="status.init">
        <div class="productDetail__logo" :style="'background-image: url(' + options.style.logo + ');'">
        </div>
        <div class="productDetail__settings">
          <p class="tittle">{{settings.title}}</p>
          <p class="description">{{settings.description}}</p>
        </div>
      </div>
    </transition>
    <div id="culqi-checkout-form" v-if="lang">
      <div class="textBox" id="card-number" :class="local.inputData.card_number.status">
        <the-mask :mask="local.inputData.card_number.mask" 
        type="tel" :placeholder="lang.card_number" v-model="local.inputData.card_number.data" @keyup.native="parseNumber()" :class="local.card_brand"/>
        <div class="tooltip"><span>Ingrese Numero de Tarjeta</span></div>
      </div>
      <div class="textBox" id="card-expiry" :class="local.inputData.card_expiry.status">
        <input type="tel" :placeholder="lang.card_expiry" v-mask="local.inputData.card_expiry.mask" v-model="local.inputData.card_expiry.data" @keyup="validateExpiry()" ref="ref_card_expiry" >
        <div class="tooltip"><span>Fecha de vencimiento de su tarjeta<br>MM = Mes y AA = Año</span></div>
        <!-- v-mask="local.inputData.card_expiry.mask"  @keyup="validateExpiry()" -->
        <!-- <the-mask mask="##/##" :placeholder="lang.card_expiry" v-model="local.inputData.card_expiry.data" @keyup.native="validateExpiry()" :ref="'ref_card_expiry'"/> -->
      </div
      ><div class="textBox" id="card-cvv" :class="local.inputData.card_cvv.status">        
        <the-mask :mask="local.inputData.card_cvv.mask" :placeholder="lang.card_cvv" v-model="local.inputData.card_cvv.data" @keyup.native="validateCVV()" ref="ref_card_cvv"/>
        <div class="tooltip" v-show="local.card_brand!=''" ><div class="tooltip-img" :class="local.card_brand"></div>       
        </div>
      </div>
      <div class="textBox" id="user-email" v-if="!options.onlyInputs" :class="local.inputData.email.status">
        <input :placeholder="lang.email" ref="ref_email" type="email" v-model="local.inputData.email.data" @keyup="validateEmail()"/>
        <div class="tooltip"><span>Ingrese el e-mail del titular de la tarjeta</span></div>
      </div>
      <button v-if="!options.onlyInputs" id="pay-button" :disabled="validateButton()" @click="processCheckout()">
        <span>{{lang.pay}}</span><span class="payText" :class="settings.currency">{{amountFormat}}</span>
      </button>
      <p class="test_key" v-show="local.test_key">{{lang.test_key}}</p>
    </div>
    <button v-if="!options.onlyInputs" :class="local.isIOS? 'isIOS': ''" id="pay-button-mobile" :disabled="validateButton()" @click="processCheckout()">
      <span>{{lang.pay}}</span><span class="payText" :class="settings.currency">{{amountFormat}}</span>
    </button>
  </div>
</template>

<script>
// import Counter from 'components/Counter'
import {mask} from 'vue-the-mask'
import {TheMask} from 'vue-the-mask'
import Spinner from 'vue-spinner-component/src/Spinner.vue'
import axios from 'axios'
export default {  
  components: {
    Spinner,
    TheMask
  },
  directives: {mask},
  data () {
    return{      
      lang: {
        card_number: 'Card Number',
        card_cvv: 'CVV',
        card_expiry: 'MM / YY',
        email: 'e-mail',
        pay: 'Pay  '
      }, // inputs y placeholder
      status: {
        text: '',
        init: false,
        load: true,
        checkout: '',
        success: '',
        spinner: {
          size: 30,
          depth: 2.5
        }
      },
      publicKey: 'pk_test_EEIucCCJGxa52Mst',
      options: {
        modal: false,
        style: {
          maincolor: '#5f5f5f'
        }
      },
      settings: {
        title: 'Culqi Store',
        currency: 'PEN',
        description: 'Polo Culqi lover',
        amount: 0
      },
      local: {
        oldBrowser: true,
        isIOS: false,
        isCardNumberComplete: false,
        isCVVComplete: false,
        isExpiryComplete: false,
        inputData: {        
          card_number: { data :'', status: '', mask: '################'},
          card_cvv: { data :'', status: '', mask: '###'},
          card_expiry: { data :'', status: '', mask: '##/##'},
          email: { data :'', status: ''}
        },
        card_brand: '',
        close_modal: false,
        origin: '',
        test_key: false
      }
    }
  },  
  mounted () {
    const self = this
    let firstPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        self.detectIE ()
        window.addEventListener('message',receiveMessage, false)
      }, 10)
    })
    firstPromise.then((result) => {
      self.loadStyle()
      // self.loadLang(self.options.lang)
      var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))
      var isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
      self.local.isIOS = isIOS
      if(self.options.modal) {
      }
    })

    function receiveMessage (event) {
      var data = event.data
      self.local.origin = event.origin
      if (data.publicKey && data.settings) {
        self.options = {
          lang: 'auto', // es  en  auto
          modal: true,
          onlyInputs: false,
          head: true,
          style: {
            bgcolor: '#f0f0f0',
            maincolor: '#5f5f5f',
            disabledcolor: '#ffffff',
            buttontext: '#ffffff',
            maintext: '#4A4A4A',
            desctext: '#4A4A4A',
            margin: true,
            logo: 'https://culqi.com/images/logo.png'
          }
        }

        self.status.init = true
        self.status.load = false
        self.publicKey = data.publicKey
        self.settings = data.settings
        // set options
        self.options.lang = data.options.lang ? data.options.lang : self.options.lang
        self.loadLang(self.options.lang)
        self.options.modal = typeof(data.options.modal) !== 'undefined' ? data.options.modal : self.options.modal
        self.options.onlyInputs = typeof(data.options.onlyInputs) !== 'undefined' ? data.options.onlyInputs : self.options.onlyInputs
        if(self.options.onlyInputs){
          self.options.modal = false
        }
        self.options.head = typeof(data.options.head) !== 'undefined' ? data.options.head : self.options.head
        if (data.options.style) {
          self.options.style.bgcolor = data.options.style.bgcolor ? data.options.style.bgcolor : self.options.style.bgcolor
          self.options.style.maincolor = data.options.style.maincolor ? data.options.style.maincolor : self.options.style.maincolor
          self.options.style.disabledcolor = data.options.style.disabledcolor ? data.options.style.disabledcolor : self.options.style.disabledcolor
          self.options.style.buttontext = data.options.style.buttontext ? data.options.style.buttontext : self.options.style.buttontext
          self.options.style.maintext = data.options.style.maintext ? data.options.style.maintext : self.options.style.maintext
          self.options.style.desctext = data.options.style.desctext ? data.options.style.desctext : self.options.style.desctext
          self.options.style.margin = typeof(data.options.style.margin) !== 'undefined' ? data.options.style.margin : self.options.style.margin
          self.options.style.logo = data.options.style.logo ? data.options.style.logo : self.options.style.logo
          self.loadStyle()
        }
      }
      if (data.culqi__customButton) {
        self.local.inputData.email.data = data.culqi__customButtonEmail
        self.local.inputData.email.status = 'valid'
        self.processCheckout()

        
      }
      if(self.publicKey.substring(0,7) == 'pk_test') {
        self.local.test_key = true
      }
    }
  },
  created () {
    const self = this
  },
  computed: {
    amountFormat () {
      var amount = this.settings.amount.toString()
      var decimal = amount.substring(amount.length-2,amount.length)
      return amount.substring(0,amount.length-2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'.'+decimal
    }
  },
  methods: {
    processCheckout () {
      const self = this
      self.status.load = true
      self.status.checkout = 'load'
      self.status.spinner.size = 50
      self.status.spinner.depth = 10
      if (self.options.lang == 'es') {
        self.status.text = 'Procesando...'
      } else {
        self.status.text = 'Processing...'
      }
      let _form_y = parseInt('20' + self.local.inputData.card_expiry.data.toString().substring(3, 5))
      let _form_m = parseInt(self.local.inputData.card_expiry.data.toString().substring(0, 2))
      let _secure = self.local.origin.substring(0, 5) == 'https' ? true : false
      var postBody = {
        "email": self.local.inputData.email.data,
        "card_number": self.local.inputData.card_number.data,
        "public_key": self.publicKey,
        "url": self.local.origin,
        "secure": _secure,
        "cvv": parseInt(self.local.inputData.card_cvv.data),
        "expiration_year": _form_y,
        "expiration_month": _form_m,
        "fingerprint": "fPrint",
        "method" : "js"
      }
      axios.post('https://checkout.culqi.com/tokens', postBody)
      .then(response => {
        var responseData = response.data
        window.parent.postMessage(responseData, '*')
        if (responseData.object == 'token') {
          self.status.text = '¡Pago Efectuado!'
          self.status.checkout = 'success'
        } else {
          self.status.text = responseData.user_message
          self.status.checkout = 'error'
          var v_data = self.local.inputData
          switch(responseData.param) {
            case 'expiration_year':              
              v_data.card_expiry.status = 'invalid'
              break
            case 'card_number':
              v_data.card_number.status = 'invalid'
              break
            case 'ccv':
              v_data.card_ccv.status = 'invalid'
              break
            case 'email':
              v_data.email.status = 'invalid'
              break
          }          
        }
      })
    },
    validateButton () {
      const self = this
      var v_data = self.local.inputData
      if(v_data.card_number.status == 'valid' && v_data.card_cvv.status == 'valid' && v_data.card_expiry.status == 'valid' && v_data.email.status == 'valid') {
        return false
      } else
        return true
    },
    validateEmail () {
      const self = this
      var mail = self.local.inputData.email.data
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      var val = re.test(String(mail).toLowerCase())
      if (mail.length > 5 && val == true) {
        self.local.inputData.email.status = 'valid'
      } else {        
        self.local.inputData.email.status = 'invalid'
        if (mail.length < 5)
        self.local.inputData.email.status = ''
      }
    },
    validateExpiry () {
      const self = this
      var pos = self.local.inputData.card_expiry.data.split('')
      // console.log(pos)
      if (pos[0] > 1) {
        pos[1] = pos[0]
        pos[0] = '0'
        var sel = window.getSelection();

      }
      if (pos[0] == 1 && pos[1] > 2) {
        pos[1] = ''
      }
      var stringPos = ''  
      for ( var i = 0 ; i < pos.length ; i ++) {
        stringPos = stringPos + pos[i]
      }
      self.local.inputData.card_expiry.data = stringPos

      self.local.inputData.card_expiry.status = 'invalid'
      if(pos.length > 3) {
        let d = new Date()
        let y = d.getFullYear().toString().substring(3,5)
        let m = d.getMonth() + 1
        if(parseInt(stringPos.substring(3,5))> parseInt(y)) {
          // self.$refs.ref_card_cvv.$el.focus()
          self.local.inputData.card_expiry.status = 'valid'
        } else if (parseInt(stringPos.substring(3,5)) == parseInt(y)) {
          if(parseInt(stringPos.substring(0,2))>= m) {
            // self.$refs.ref_card_cvv.$el.focus()
            self.local.inputData.card_expiry.status = 'valid'
          }
        }
      } else if(pos.length == 0) {
        self.local.inputData.card_expiry.status = ''
      }
    },
    validateCVV () {
      const self = this
      var card_cvv = self.local.inputData.card_cvv.data
      var cvv_status = 'invalid'
      
      if (card_cvv.length >= 3) {
        if (self.local.card_brand == 'amex') {
          if(card_cvv.length == 4) {
            cvv_status = 'valid'
            if( self.options.email) {
              self.$refs.ref_email.focus()
            }
          }
        } else {
          cvv_status = 'valid'
          if( self.options.email) {
            self.$refs.ref_email.focus()
          }
        }
      } else if (card_cvv.length < 1) {
        cvv_status = ''
      }
      
      self.local.inputData.card_cvv.status = cvv_status
    },
    validateNumber () {
      const self = this
      // Algoritmo de Luhn
      if(self.luhnCheck(self.local.inputData.card_number.data)) {
        self.local.inputData.card_number.status = 'valid'
        if(self.local.inputData.card_cvv.status != 'valid') {
          self.local.inputData.card_cvv.data = ''
        }
        // self.$refs.ref_card_expiry.$el.focus()
      } else {
        self.local.inputData.card_number.status = 'invalid'
      }
    },
    parseNumber () {
      const self = this
      var card_number = self.local.inputData.card_number.data
      var card_length = 16
      var card_brand = ''
      if (card_number != '') {      
        var mask = '################'
        var cvv_mask = '###'
        // Visa
        var re = new RegExp("^4");
        if (card_number.match(re) != null) {
          card_brand = 'visa'
          mask = '#### #### #### ####'
          card_length = 13
        }
        // Mastercard 
        // Updated for Mastercard 2017 BINs expansion
        re = new RegExp("^5[1-5]|^2[2-7]");
        if (card_number.match(re) != null) {
          card_brand = 'mastercard'
          mask = '#### #### #### ####'
        }        
        // Masestro
        re = new RegExp("^5[0]|^5[6-8]|^6");
        if (card_number.match(re) != null) {
          card_brand = 'maestro'
          mask = '#### #### #### ####'
        }

        // China Pay Union
        re = new RegExp("^62");
        if (card_number.match(re) != null) {
          card_brand = 'unionpay'
          mask = '#### #### #### ####'
        }

        // AMEX
        re = new RegExp("^3[47]");
        if (card_number.match(re) != null) {
          card_brand = 'amex'
          mask = '#### ###### #####'
          cvv_mask = '####'
          card_length = 15
        }

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (card_number.match(re) != null) {
          card_brand = 'discover'
          mask = '#### #### #### ####'
        }
        // Diners
        re = new RegExp("^36");
        if (card_number.match(re) != null) {
          card_brand = 'diners'
          if(card_number.length > 14) {
            card_length = 16
            mask = '#### #### #### ####'
          } else {
            card_length = 14
            mask = '#### ###### #### #'
          }
        }

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (card_number.match(re) != null) {
          card_brand = 'diners';
          mask = '#### #### #### ####'
        }
        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (card_number.match(re) != null) {
          card_brand = 'jcb';
            mask = '#### #### #### ####'
        }
        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (card_number.match(re) != null) {
          card_brand = 'visa';
          mask = '#### #### #### ####'
          card_length = 16
        }

        //card_number
        self.local.card_brand = card_brand
        self.local.inputData.card_number.mask = mask
        self.local.inputData.card_cvv.mask = cvv_mask
        if (card_number.length  >= card_length) {
          self.validateNumber()
        } else {
          self.local.inputData.card_number.status = ''
        }
      } else {
        self.local.card_brand = ''
        self.local.inputData.card_number.status = ''
      }
    },
    luhnCheck (num) {
      var digit, digits, odd, sum, _i, _len;
      odd = true;
      sum = 0;
      digits = (num + '').split('').reverse();
      for (_i = 0, _len = digits.length; _i < _len; _i++) {
        digit = digits[_i];
        digit = parseInt(digit, 10);
        if ((odd = !odd)) {
          digit *= 2;
        }
        if (digit > 9) {
          digit -= 9;
        }
        sum += digit;
      }      
      return sum % 10 === 0;      
    },
    loadStyle () {
      const self = this
      var element = document.getElementById('custom_style_form_culqi')
      if(element) {
        element.parentNode.removeChild(element)
      }
      var sheet = document.createElement('style')
      sheet.type = 'text/css'
      sheet.id = 'custom_style_form_culqi'
      sheet.innerHTML = 
        '.clq-checkout_container{'
          +'background-color: '+self.options.style.bgcolor+'!important;'
          +'padding: '+ (self.options.onlyInputs ? '0 !important;': '10px 0 25px 0;')
          // +'margin: '+ (self.options.onlyInputs ? '0 auto !important;': '10px auto;')
        +'}'
        +'.clq-checkout_container .productDetail__settings .tittle{'
          +'color: '+self.options.style.maintext+'!important;'
        +'}'
        +'.clq-checkout_container .productDetail__settings .description{'
          +'color: '+self.options.style.desctext+'!important;'
        +'}'
        +'#pay-button,#pay-button-mobile{'
          +'background-color: '+self.options.style.maincolor+';'
          +'border: none;'
          +'color: '+self.options.style.buttontext+';'
        +'}'
        + '#pay-button:disabled ,#pay-button-mobile:disabled{'
          +'background-color: '+self.options.style.disabledcolor+';'
          +'color: '+self.options.style.maincolor+';'
          +'border: 1px solid '+self.options.style.maincolor+';'
        +'}'
        + '#pay-button:hover ,#pay-button-mobile:hover{'
          +'background-image: linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.2) ),linear-gradient( ' + self.options.style.maincolor + ', ' + self.options.style.maincolor + ' );'
        +'}'
        + '#culqi-checkout-form {'
          +'width: '+ (self.options.style.margin && !self.options.onlyInputs ? '90%' : '100%') + ' !important;'
        +'}';
      document.head.appendChild(sheet);
    },
    loadLang (lang) {
      const self = this        
      console.log('%ccurrent language '+ lang, 'padding: 0 10px; background-color: #000000; color: #44ff2d; text-transform: uppercase; font-weight: bold;')
      if(self.options.lang == 'auto') {
        lang = (window.navigator.language||navigator.browserLanguage).substring(0,2)
        console.log('%cchange language to: \'' + lang + '\'', 'padding: 0 10px; background-color: #000000; color: #ffff2d; text-transform: uppercase; font-weight: bold;')
      }    
      switch (lang) {
        case 'es': self.lang = self.$store.getters.getLang_ESP
          self.options.lang = 'es'
          break
        case 'en': self.lang = self.$store.getters.getLang_ENG
          self.options.lang = 'en'
          break
        default: self.lang = self.$store.getters.getLang_ENG
          self.options.lang = 'en'
          break
      }
    },
    detectIE () {
      const self = this
      // Internet Explorer 6-11
      var isIE = /*@cc_on!@*/false || !!document.documentMode;
      // Edge 20+
      var isEdge = !isIE && !!window.StyleMedia;

      if (isIE || isEdge) {
        self.local.oldBrowser = true
      } else {
        self.local.oldBrowser = false
      }
    },
    closeModal () {
      this.local.close_modal = true
      let data = {
        close_modal_checkout: true
      }      
      setTimeout(function () {
        window.parent.postMessage(data, '*')
      }, 250)      
    }
  }
}
</script>
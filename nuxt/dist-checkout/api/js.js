// API de Culqi

var culqi_localiframe_ready = false
var culqi_data__publicKey
var culqi_data__settings
var culqi_data__options
var embed_iframe = document.createElement('iframe')
var culqi_data__checkoutContainer
var culqi_data__tokenCreated
var culqi_data__email

var CulqiJS = {
  bienvenida: function () {
    console.log('%cGracias por usar el checkout de Culqi', 'width: 100%; padding:20px 15px; background-color: #55b849; color: #FFFFFF; text-transform: uppercase;')
    console.log('%c¡Detente!'
    , 'text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000; font-size: 45px; text-align : justify; font-weight: bold; background-color: #FFFFFF; color: #dc0000; text-transform: uppercase;')
    console.log('%cEsta función del navegador está pensada para desarrolladores.\n\nSi alguien te indicó que copiaras y pegaras algo aquí para habilitar una función de Culqi o para "hackear" la cuenta de alguien, se trata de un fraude. Si lo haces, esta persona podrá acceder a tu cuenta.\n '
      , 'padding:5px; font-size: 18px; text-align : justify; background-color: #FFFFFF; color: #dc0000; text-transform: uppercase;')
    console.log('%c       ', 'font-size: 100px; background: url(http://cdn.nyanit.com/nyan2.gif) no-repeat;')
    culqi_data__publicKey = ''
    culqi_data__settings = ''
    culqi_data__email = ''
    culqi_data__options = {
      lang: 'auto',
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
        logo: 'img/logo.png'
      }
    }
    var globalcss = document.createElement('style')
    globalcss.type = 'text/css'
    globalcss.id = 'culqi_globalCssCheckout'
    var stylestemp = `
    @media only screen and (max-width: 425px) {
      #powered_by_culqi{
        display: none;
      }
    }`
    globalcss.innerHTML = stylestemp
    document.getElementsByTagName('head')[0].appendChild(globalcss)
    window.addEventListener('message', this.receiveMessage__form_culqi, false)    
  },
  receiveMessage__form_culqi: function (event) {
    if (event.data.close_modal_checkout) {
      console.log('close_modal_checkout',event.data.close_modal_checkout)
      // var iframe = document.getElementById('checkout_culqi_form')
      // var powered_logo = document.getElementById('powered_by_culqi')
      // if(iframe) {
      //   iframe.remove()
      // }
      // powered_logo.remove()
      // var modal = document.getElementById(culqi_data__checkoutContainer)
      // modal.style.position = 'inherit'
      // modal.style.zIndex = 'inherit'
      // modal.style.paddingTop = 'inherit'
      // modal.style.left = 'inherit'
      // modal.style.top = 'inherit'
      // modal.style.width = 'inherit'
      // modal.style.height = 'inherit'
      // modal.style.overflow = 'inherit'
      // modal.style.backgroundColor = 'inherit'
      var element = document.getElementById(culqi_data__checkoutContainer)
      element.style.display = 'none'
    }
    if (event.data.object == 'token') {
      culqi_data__tokenCreated = event.data.id
    } else if (event.data.object == 'error') {
      console.log('%cError Message:' + event.data.param + '\n%c-' + event.data.merchant_message, 'padding: 0 10px; background-color: #000000; color: #ca0000; text-transform: uppercase; font-weight: bold;', 'color: #ff0000; text-transform: uppercase')
    }
  },
  __setPublicKey: function (clq_publicKey) {
    culqi_data__publicKey = clq_publicKey
  },
  __setSettings: function (clq_settings) {
    culqi_data__settings = clq_settings
  },
  __setOptions: function (clq_options) {
    culqi_data__options = clq_options
  },
  setEmail: function (clq_email) {
    culqi_data__email = clq_email
  },
  initCheckout: function (_publicKey, _id_iframe, _settings, _options) {
    if (!_options) {
      _options = {
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
          logo: 'img/logo.png'
        }
      }
    }
    this.__setPublicKey(_publicKey)
    this.__setSettings(_settings)
    this.__setOptions(_options)
    embed_iframe.id = 'checkout_culqi_form'
    embed_iframe.src = '${URLPago}/v3'
    embed_iframe.width = '100%'
    embed_iframe.style.height = '100%'
    embed_iframe.setAttribute('frameborder', 0)
    embed_iframe.setAttribute('allowfullscreen', true)
    if (_options.onlyInputs) {
      embed_iframe.style.minHeight = '150px'
    }
    culqi_data__checkoutContainer = _id_iframe
    var element = document.getElementById(culqi_data__checkoutContainer)
    element.appendChild(embed_iframe)
    element.style.display = 'none'

    if ((culqi_data__options.modal || typeof (culqi_data__options.modal) === 'undefined') && !culqi_data__options.onlyInputs) {
      var modal = document.getElementById(culqi_data__checkoutContainer)
      embed_iframe.height = '100%'
      modal.style.position = 'fixed'
      modal.style.zIndex = '1'
      modal.style.left = '0'
      modal.style.top = '0'
      modal.style.width = '100%'
      modal.style.height = '100%'
      modal.style.overflow = 'hidden'
      modal.style.backgroundColor = 'rgb(0,0,0)'
      modal.style.backgroundColor = 'rgba(0,0,0,0.4)'

      var culqi_temp_logo = document.createElement('img')
      culqi_temp_logo.src = '${URLPago}/img/culqi_logo.png'
      culqi_temp_logo.id = 'powered_by_culqi'
      culqi_temp_logo.style.position = 'fixed'
      culqi_temp_logo.style.bottom = '0'
      culqi_temp_logo.style.left = '0'
      culqi_temp_logo.style.margin = '8px'
      culqi_temp_logo.style.height = '38px'
      modal.appendChild(culqi_temp_logo)
    }

    var iframe = document.getElementById('checkout_culqi_form')
    var data = {
      publicKey: culqi_data__publicKey,
      settings: culqi_data__settings,
      options: culqi_data__options
    }
    setTimeout(function () {
      iframe.contentWindow.postMessage(data, '*')
    }, 1000)
    this.openCheckout()
    var element = document.getElementById(culqi_data__checkoutContainer)
    element.style.display = 'none'
  },
  openCheckout: function () {
    var element = document.getElementById(culqi_data__checkoutContainer)
    element.style.display = 'block'
    data = {
      openmodalCheckout: true
    }
    var iframe = document.getElementById('checkout_culqi_form')
    iframe.contentWindow.postMessage(data, '*')
  },
  getToken: function () {
    return culqi_data__tokenCreated
  },
  customButton: function () {
    var iframe = document.getElementById('checkout_culqi_form')
    var data = {
      culqi__customButton: true,
      culqi__customButtonEmail: culqi_data__email
    }
    var isIE = /* @cc_on!@ */false || !!document.documentMode
    var isEdge = !isIE && !!window.StyleMedia
    if (isIE || isEdge) {
      console.log('%cUse otro explorador diferente a Internet Explorer o Edge para mayor compatibilidad y rapidez.', 'padding:20px 10px; background-color: #ffe565; text-transform: uppercase;')
    }
    setTimeout(function () {
      iframe.contentWindow.postMessage(data, '*')
    }, 15000)
  }
}
  //Old version compatibility
var Culqi = {
  publicKey: "",
  settings:function (obj_settings) {
    culqi_data__settings={
      title: obj_settings.title,
      currency: obj_settings.currency,
      description: obj_settings.description,
      amount: obj_settings.amount
    }
    var elem = document.createElement('div');
    elem.id = 'culqiv3_checkoutContainer';
    document.body.appendChild(elem);
    CulqiJS.initCheckout(this.publicKey, 'culqiv3_checkoutContainer', culqi_data__settings)
  },
  open: function () {
    CulqiJS.openCheckout()
    console.log('%cOLD VERSION', 'width: 100%; padding:20px 15px; background-color: #55b849; color: #FFFFFF; text-transform: uppercase;')
  },
  token: {
    id: culqi_data__tokenCreated,
    metadata: {
      installments: 1
    }
  },
  error: {
    merchant_message: ('Error, revise la consola')
  }
}
CulqiJS.bienvenida()
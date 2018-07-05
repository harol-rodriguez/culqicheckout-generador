var Culqi = {
	container: "",
	publicKey: "",
	singleCharge:"",
	useClasses: false,
	culqi_data__options : {
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
	},
	culqi_data__settings: {
		title: 'Culqi Store',
		currency: 'PEN',
		description: 'Polo/remera Culqi lover',
		amount: 100
	},
	settings: function (clq_settings) {
		this.culqi_data__settings = clq_settings;
		setTimeout(() => {
			Culqi.cargar();
		}, 250);	
	},
	options: function(clq_options) {
		var self = this;
		console.log(clq_options)
		if(typeof(clq_options.lang) !== 'undefined') self.culqi_data__options.lang = clq_options.lang;
		if(typeof(clq_options.modal) !== 'undefined') self.culqi_data__options.modal = clq_options.modal;
		if(typeof(clq_options.onlyInputs) !== 'undefined') self.culqi_data__options.onlyInputs = clq_options.onlyInputs;
		if(typeof(clq_options.head) !== 'undefined') self.culqi_data__options.head = clq_options.head;

		if(typeof(clq_options.style) !== 'undefined') {
			if(typeof(clq_options.style.bgcolor) !== 'undefined') self.culqi_data__options.style.bgcolor = clq_options.style.bgcolor;
			if(typeof(clq_options.style.maincolor) !== 'undefined') self.culqi_data__options.style.maincolor = clq_options.style.maincolor;
			if(typeof(clq_options.style.disabledcolor) !== 'undefined') self.culqi_data__options.style.disabledcolor = clq_options.style.disabledcolor;
			if(typeof(clq_options.style.buttontext) !== 'undefined') self.culqi_data__options.style.buttontext = clq_options.style.buttontext;
			if(typeof(clq_options.style.maintext) !== 'undefined') self.culqi_data__options.style.maintext = clq_options.style.maintext;
			if(typeof(clq_options.style.desctext) !== 'undefined') self.culqi_data__options.style.desctext = clq_options.style.desctext;
			if(typeof(clq_options.style.logo) !== 'undefined') self.culqi_data__options.style.logo = clq_options.style.logo;
		}
	},
	cargar: function () {

		if (document.querySelector('.culqi_checkout') == null) {

			var product = "web";
			var url = "/v3";
			var self = this;
			iframe = document.createElement("IFRAME");

			// iframe.setAttribute("src", "${URLPago}" + url);
			iframe.setAttribute("src", "/index2.html");

			iframe.setAttribute("id", "culqi_checkout_frame");
			iframe.setAttribute("name", "checkout_frame");
			iframe.setAttribute("class", "culqi_checkout");
			iframe.setAttribute("allowtransparency", "true");
			iframe.setAttribute("frameborder", "0");


			iframe.style.backgroundColor = "rgba(0,0,0,0.62)";
			iframe.style.border = "0px none trasparent";
			iframe.style.overflowX = "hidden";
			iframe.style.overflowY = "auto";
			iframe.style.margin = "0px";
			if(self.culqi_data__options.modal) {
				iframe.style.zIndex = 99999;
				iframe.style.position = "fixed";
				iframe.style.visibility = "hidden";
				iframe.style.visibility = "collapse";
				iframe.style.height = 0;
				iframe.style.width = 0;
			} else {
				iframe.setAttribute('frameborder', 0)
				iframe.setAttribute('allowfullscreen', true)
				iframe.style.height = '100%';
				iframe.style.width = '100%';
			}
			iframe.style.left = "0px";
			iframe.style.top = "0px";
			iframe.style.backgroundPosition = "initial initial";
			iframe.style.backgroundRepeat = "initial initial";
			var container_iframe_culqi;
			if (self.container != "") {
				container_iframe_culqi = document.getElementById(self.container);				
			} else {
				container_iframe_culqi = document.body;
			}
			try {
				container_iframe_culqi.appendChild(iframe);
			} catch (error) {
				console.log('%c>JS> Error: No existe contenedor %c'+self.container+'%c' + error, 'padding: 0 10px; background-color: #000000; color: #ff0000; text-transform: uppercase; font-weight: bold;','background-color: #000000; padding: 0 10px; color: #fff','padding: 0 10px; color: #ff0000; font-weight: bold;');
			}			
			
			if (navigator.vendor ==  "Apple Computer, Inc.") {

				window.altScrollTo = iframe.contentWindow.scrollTo;

			}
		} else {
			console.log('CERRAR')
			var element = document.getElementById("culqi_checkout_frame");
			if (element == null) {} else {
				element.parentNode.removeChild(element);
				Culqi.cargar();
			}
		}
	},
	open: function () {

		Culqi.init();
		if (navigator.vendor ==  "Apple Computer, Inc.") {

			altScrollTo.call(window,0,0);

		}

		if (document.querySelector('.culqi_checkout') != null) {

			var culqiFrame = document.getElementById("culqi_checkout_frame");
			culqiFrame.style.visibility = "visible";
			culqiFrame.style.display = "block";
			iframe.style.width = "100%";
			iframe.style.height = "100%";

		}

	},
	init: function () {
		// Culqi.settings({
		// 	title: 'card_transport',
		// 	currency: 'PEN',
		// 	description: 'Polo/remera Culqi lover',
		// 	amount: 100
		// });
		var self = this;
		var data = {
			_publicKey: self.publicKey,
			_settings: self.culqi_data__settings,
			_options: self.culqi_data__options
		};
		setTimeout(() => {
			var iframe = document.getElementById("culqi_checkout_frame")
			if (iframe) {
				iframe.contentWindow.postMessage(data, "*");
			} else {
				console.log('%c>JS> Error: Revise contenedor %c'+self.container, 'padding: 0 10px; background-color: #000000; color: #ff0000; text-transform: uppercase; font-weight: bold;','background-color: #000000; padding: 0 10px 0 0; color: #fff');
			}
			// var iframe = document.getElementById("culqi_checkout_frame").contentWindow;
			// iframe.postMessage(data, "*");
		}, 550);
	},
	createToken: function() {

		if (Culqi.useClasses == false) {

			var obj = new Object();
			obj.email = document.getElementById("card[email]").value;
			obj.card_number  = document.getElementById("card[number]").value.replace(/\s/g,'');;
			obj.cvv = String(document.getElementById("card[cvv]").value);
			obj.expiration_year = document.getElementById("card[exp_year]").value;
			obj.expiration_month = document.getElementById("card[exp_month]").value;

			var jsonString= JSON.stringify(obj);

			var win = document.getElementById("culqi_checkout_frame").contentWindow;

			win.postMessage(jsonString, "*");

		} else if (Culqi.useClasses == true) {

			var email = document.getElementsByClassName("culqi-email");
			var card_number = document.getElementsByClassName("culqi-card");
			var cvv = document.getElementsByClassName("culqi-cvv");
			var expiration_year = document.getElementsByClassName("culqi-expy");
			var expiration_month = document.getElementsByClassName("culqi-expm");

			var obj = new Object();
			obj.email = email[0].value;
			obj.card_number  = card_number[0].value.replace(/\s/g,'');;
			obj.cvv = cvv[0].value;
			obj.expiration_year = expiration_year[0].value;
			obj.expiration_month = expiration_month[0].value;

			var jsonString= JSON.stringify(obj);

			var win = document.getElementById("culqi_checkout_frame").contentWindow;

			win.postMessage(jsonString, "*");
		}

	},
	close: function () {
		var element = document.getElementById("culqi_checkout_frame");
		if (element == null) {} else {
			element.style.visibility = "hidden";
			element.style.visibility = "collapse";
			iframe.style.width = "0px";
			iframe.style.height = "0px";
		}
	},
	destruir: function () {
		var element = document.getElementById("culqi_checkout_frame");
		if (element == null) {} else {
			element.parentNode.removeChild(element);
		}
	},
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
  }
};

document.onreadystatechange = function () {
	var state = document.readyState
	if (state == 'interactive') {

	} else if (state == 'complete') {

	}
}

function receiveMessage(event) {
	if(event.data == "checkout_bienvenido") {
		Culqi.init();
		Culqi.bienvenida();
	}	else	if (event.data == "checkout_cerrado") {
		Culqi.close();
	} else if (event.data.object == "error") {
		console.log('%c>JS> Error: %c' + event.data.type + '\n%c' + event.data.merchant_message, 'padding: 0 10px; background-color: #000000; color: #ff0000; text-transform: uppercase; font-weight: bold;','padding: 0 60px 0 0; background-color: #000000; color: #fff; text-transform: uppercase; font-weight: bold;','padding: 0 10px; color: #ff0000; text-transform: uppercase; font-weight: bold;')
		function isIE () {
			var myNav = navigator.userAgent.toLowerCase();
			return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		}
		if (isIE () && isIE () < 9) {
			var obj = JSON.parse(event.data);
		} else {
			var obj = event.data;
		}
		Culqi.token = null;			
		Culqi.error = obj;
		culqi(Culqi);
	} else {
		console.log('%c>>Event data: %c'+event.data, 'width: 100%; padding:2px 15px; background-color: #000; color: #ff8f00; text-transform: uppercase;','width: 100%; padding:2px 15px; background-color: #000; color: #00d8a8; text-transform: uppercase; font-weight: bold ',event.data)
		function isIE () {
			var myNav = navigator.userAgent.toLowerCase();
			return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		}
		if (isIE () && isIE () < 9) {
			var obj = JSON.parse(event.data);
		} else {
			var obj = event.data;
		}
		if (obj["object"] == "token") {
			Culqi.token = obj;			
			Culqi.error = null;
			culqi(Culqi);
		} else if (obj["object"] == "error") {
			Culqi.error = obj;			
			Culqi.token = null;			
			if(Culqi.culqi_data__options.modal)
				Culqi.close();
			culqi(Culqi);
		}
	}
}

window.addEventListener("message", receiveMessage, false);
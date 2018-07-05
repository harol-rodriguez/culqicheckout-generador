
const state = {
  lang_esp: {
    card_number: 'Número de Tarjeta',
    card_cvv: 'CVV',
    card_expiry: 'MM / AA',
    email: 'Correo electrónico',
    err_number: 'Su número de tarjeta es inválido',
    err_cvv: 'Sú codigo de seguridad está incompleto',
    err_expiry: 'Sú fecha de expiración está incompleto',
    err_email: 'Ingrese un correo válido',
    pay: 'Pagar ',
    test_key: 'Llave de prueba'

  },
  lang_eng: {
    card_number: 'Card Number',
    card_cvv: 'CVV',
    card_expiry: 'MM / YY',
    email: 'e-mail',
    err_number: 'Your card number is invalid.',
    err_cvv: 'Your card\'s security code is incomplete.',
    err_expiry: 'Your card\'s expiration date is incomplete.',
    err_email: 'Your e-mail is invalid.',
    pay: 'Pay  ',
    test_key: 'Test Key'
  }
}
const getters = {
  getLang_ESP: state => {
    return state.lang_esp
  },
  getLang_ENG: state => {
    return state.lang_eng
  }
}
const mutations = {

}
const actions = {

}
export default {
  state,
  getters,
  actions,
  mutations
}

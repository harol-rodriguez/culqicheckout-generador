<template>
	<div class="clq">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">


		<div class="clq-header">
			<div class="clq-header__main">
				<div class="clq-header__main--logo">
					<img src="https://integ-pago.culqi.com/movistarv2/assets/img/logomovistar.png" height="30" width="143" alt="">
				</div>
			</div>
		</div>
		<div class="clq-content">
			<div class="clq-content__main">
				<div class="clq-content__main--title">
					<h1>Datos de la Tarjeta</h1>
				</div>
				<div class="clq-content__main--content">
					<div class="clq_content_checkout">
						<div class="row">
							<label>Numero de tarjeta</label>
							<input type="tel" placeholder="4111 1111 1111 1111">
						</div>
						<div class="row-2">
							<div class="row">
								<label>Fecha de Exp.</label>
								<input type="tel" placeholder="MM/YYYY">
							</div>
							<div class="row">
								<label>CVV</label>
								<input type="tel" placeholder="123">
							</div>
						</div>
						<div class="row">
							<label>Email</label>
							<label class="email">abhishekgondkar@amdocs.com</label>
						</div>
						<button>Registrar Tarjeta</button>
						<a class="powered" href="https://culqi.com/">Powered by Culqi</a>
					</div>
				</div>
			</div>
			<div class="clq-content__side">
				<div class="clq-content__side--title">
					<i class="fa fa-share-square-o fa-flip-horizontal"></i>
					Retornar a Movistar
				</div>
				<div class="clq-content__side--content">
					<div class="pci-logo">
						<img src="https://integ-pago.culqi.com/movistarv2/assets/img/pci-logo.png" alt="">
					</div>
					<div class="block-body">
						<div class="title-container">
								<div class="title">Está en un entorno seguro</div>
								<div class="separador">|</div>
								<div class="secure-cart">
									<i class="fa fa-shopping-bag"></i>
								</div>
							</div>
							<div class="text">
								<p>
									Este sitio cuenta con los estándares de seguridad de la industria de medios de pago <b>PCI-DSS</b> para proteger su información personal y la de su tarjeta.
								</p>
								<p>
									Revise en su página el símbolo del candado <b>(SSL)</b> que garantiza la autenticidad de nuestro servicio de pago.
								</p>
							</div>
					</div>
				</div>				
			</div>
		</div>
		<div class="clq-footer">
			<div class="clq-footer__main">
				<div class="social_network">
					<div>Siguenos</div>
					<div class="logos">
						<a href="#"><img src="https://integ-pago.culqi.com/movistarv2/assets/img/social/twitter.png" height="24" width="24" alt=""></a>
						<a href="#"><img src="https://integ-pago.culqi.com/movistarv2/assets/img/social/youtube.png" height="24" width="24" alt=""></a>
						<a href="#"><img src="https://integ-pago.culqi.com/movistarv2/assets/img/social/facebook.png" height="24" width="24" alt=""></a>
					</div>
				</div>
				<div class="enlaces">
					<div><a href="#">Aviso Legal</a></div>
					<div><a href="#">Protección de datos</a></div>
					<div><a href="#">Información a abonados y usuarios</a></div>
				</div>
				<div class="telefonica">
					<img src="https://integ-pago.culqi.com/movistarv2/assets/img/telefonica.png" height="30" width="110" alt="">
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
$normalwidth: 800px;
.clq{
	background-color: #fff;
	width: 100%;
	min-height: 100vh;
	font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	&-header{
		width: 100%;
		height: 60px;
    background-color: #005C84;
		position: relative;
		&__main{
			width: $normalwidth;
			margin: auto;
			padding: 11px;
			&--logo{
				display: inline-block;
			}
		}
	}
	&-content{
		width: $normalwidth;
		margin: auto;
		margin-bottom: 60px;
		display: flex;
		&__main{
			margin: 20px;
			border: 1px solid #EAEBED;
			flex: 3;
			&--title{
				border-bottom: 4px solid #EEF2F5;
				h1{
					padding: 15px;
					font-size: 20px;
					color: #7AB800;
					font-weight: 700;
				}
			}
			&--content{
				.clq_content_checkout{
					width: 300px;
					margin: auto;
					background: #f5f5f5;
				}
			}
		}
		&__side{
			margin: 20px;
			flex: 2;
			&--title{
				color: #119CBF;
				font-size: 20px;
				font-weight: 700;
				text-align: center;
				padding: 15px 0;
				border: 1px solid #EAEBED;
				margin-bottom: 10px;
			}
			&--content{
				border: 1px solid #EAEBED;
				.pci-logo{
					border-bottom: 4px solid #EEF2F5;
					padding: 5px 15px;
					img{
						width: 80px;
						height: 50px;
					}
				}
				.block-body{
					padding: 15px;
					.title-container{
						display: flex;
						font-size: 13pt;
						color: #119CBF;
						& > div {
							flex: 1;
						}
						.title{
							font-weight: 100;
							font-size: 11pt !important;
							flex: 4;
							margin-bottom: 10px;
						}
					}
					.text{
						font-size: 14px;
    				color: #646464;

					}
				}
			}
		}
	}
	&-footer{
		position: absolute;
		width: 100%;
		height: 60px;
		background-color: #DBE0E6;
		bottom: 0;
		&__main{
			width: $normalwidth;
			margin: auto;
			display: flex;
			position: relative;
			.social_network{
				flex: 1;
				font-size: 0.8em;
				color: #005C84;
				padding: 7px 0;
			}
			.telefonica{
				flex: 1;
				padding: 11px 0;
				text-align: right;
			}
			.enlaces{
				width: fit-content;
				padding: 11px 5px;
				display: flex;
    		flex-direction: row;
				div{
					align-self: center;
					margin: 0 10px 0px 0px;
					&::before{
						content: "|";
						color: #005C84;
						margin-right: 10px;
						font-size: 18px;
					}
					&:first-child:before{
						content: none;
					}
					a{
						color: #005C84;
						text-decoration: none;
						font-size: 13px;
					}
				}
			}
		}
	}
	.clq_content_checkout{
		padding: 15px;
		.row{
			margin: 10px 0;
			label{
				text-align: center;
				color: #119CBF;
				width: 140px;
				display: block;
				width: 100%;
				font-size: 14px;
			}
			input{
				width: 100%;
				background: rgb(255, 255, 255);
				padding: 10px;
				border: 1px solid #DBE0E6;
				border-radius: 2px;
				outline-color: #119CBF;
			}
			.email{
				text-align: initial;
				color:#646464;
			}
			&-2{
				display: flex;
				.row{
					flex: 1;
					width: 50%;
					&:first-child{
						margin-right: 10px;
					}
				}
			}
		}
		button{
			width: 100%;
			padding: 15px;
			background-color: #e6e6e6;
			border: 2px solid rgba(0, 92, 132, 0.5);
			color: rgba(0, 92, 132, 0.5);
			cursor: default;
		}
		.active{
			background-color: #005C84;
			border: 1px solid #119CBF;
			color: #FFF;
		}
		.powered{
			top: 4px;
			color: #119CBF;
			display: block;
			font-size: 12px;
			position: relative;
		}
	}
}
</style>

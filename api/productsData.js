const products = [
	{
		id: 1,
		title: 'ISOXIPRO Whey protein isolate – Vainilla',
		price: 179.00,
		description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-vainilla.jpg?alt=media&token=a54c6659-2e4e-4a53-8c60-6dee240a3f13',
		sku: 'PWV-1',
		category: 'PROTEINA'
	},
	{
		id: 2,
		title: 'Muñequera',
		price: 39.90,
		description: '',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/mu%C3%B1equera.jpg?alt=media&token=07113141-f054-4dea-91fb-2601cd69af44',
		sku: 'MHOX',
		category: 'IMPLEMENTOS'
	},
	{
		id: 3,
		title: 'Vincha',
		price: 24.90,
		description: '',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/vincha.jpg?alt=media&token=55b2ccaf-06c2-409f-9abc-127bf12cd620',
		sku: 'CH3-1-1',
		category: 'IMPLEMENTOS'
	},
	{
		id: 4,
		title: 'Polera XOH',
		price: 89.00,
		description: '',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/polera.jpg?alt=media&token=83cff30b-d056-4ed6-8719-d82a9a9ed0cd',
		sku: 'PXOH',
		category: 'IMPLEMENTOS'
	},
	{
		id: 5,
		title: 'Shaker',
		price: 29.90,
		description: '',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/shaker.jpg?alt=media&token=f591ed57-4477-4eda-9439-fb2b300d6f20',
		sku: 'CH3-1',
		category: 'IMPLEMENTOS'
	},
	{
		id: 6,
		title: 'Toalla Xiprofit',
		price: 29.90,
		description: '',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/toalla.jpg?alt=media&token=7063b8ad-434d-445c-b649-b25930b587b3',
		sku: 'TXP',
		category: 'IMPLEMENTOS'
	},
	{
		id: 7,
		title: 'PACK ISOXIPRO Whey protein isolate + Shaker + Tobillera',
		price: 229.00,
		description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-isoxipro-shaker-tobillera.jpg?alt=media&token=60184469-d1b7-478e-90fc-3f43138b3814',
		sku: 'PIPT-1-1',
		category: 'PROMOCIONES, PROTEINA'
	},
	{
		id: 8,
		title: 'PACK ISOXIPRO Whey protein isolate + Shaker',
		price: 209.00,
		description: 'Proteína en polvo de suero de leche aislada de 900g  (30 servicios),Contiene 25gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-isoxipro-shaker.jpg?alt=media&token=4cf5576a-a5f6-4633-a574-8b8fe0633c03',
		sku: 'PIPT-1',
		category: 'PROMOCIONES, PROTEINA'
	},
	{
		id: 9,
		title: 'Pack DUO Whey Protein y Colágeno Hidrolizado',
		price: 288.00,
		description: 'Isoxipro proteína en polvo de suero de leche aislada de 900g (30 servicios), Contiene 25gr de proteína por servicio. Es baja en grasa, sin lactosa, baja carbohidratos y sin azúcar. Materia prima importada WPI 95%.',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-duo-isoxipro-colageno.jpg?alt=media&token=cc70de1f-d5b8-4f7a-928e-3a948a11d4dc',
		sku: 'PPC',
		category: 'PROMOCIONES'
	},
	{
		id: 10,
		title: 'Pack DUO Whey Protein Isolate',
		price: 338.00,
		description: '¡Llévate 2 proteínas!',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/pack-duo-isoxipro.jpg?alt=media&token=5c7dec60-8ee0-40c5-809c-03b52eb1908c',
		sku: 'PWI',
		category: 'PROMOCIONES'
	},
	{
		id: 11,
		title: 'ISOXIPRO Whey protein isolate – Chocolate',
		price: 179.00,
		description: 'Proteína en polvo de suero de leche aislada de 1kg  (33 servicios aproximadamente),Contiene 24gr de proteína por servicio. Nuestra proteína es aislada durante el procesado se elimina la mayor parte de la grasa y la lactosa. Este aislado permite obtener mayor cantidad de proteína en el producto final. Es libre de grasa, libre de lactosa, baja carbohidratos y sin azúcar. No contiene aminoácidos de relleno. Suero de leche importado Certified de origing USA-Halal -Kosher-Non-GMO',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/isoxipro-chocolate.jpg?alt=media&token=c866be97-1b48-4232-8849-6a44a5dd0a74',
		sku: 'PWCH',
		category: 'PROTEINA'
	},
	{
		id: 12,
		title: 'Colágeno Hidrolizado',
		price: 139.00,
		description: 'Beneficios del Colágeno Hidrolizado',
		image: 'https://firebasestorage.googleapis.com/v0/b/ximenahoyosapp.appspot.com/o/colageno-hidrolizado.jpg?alt=media&token=e6dec4ce-60ea-4a19-ad08-bb547275d624',
		sku: 'CH2',
		category: 'COLÁGENO'
	}
]

export default products

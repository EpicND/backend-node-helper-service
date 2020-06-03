const config = require('./config');
const Discord = require('discord.js');

const client = new Discord.Client();
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = 'b!';

const insultArray = [
 "The only thing you have in common with a bean is your IQ. spell it properly nerd",
 "I feel bad for your english teacher if you can't even spell the commands correctly",
 "?? :clown:",
 'Choose an actual command bimbo'
];

const factArray = [':b:eans are the large seeds of certain types of plants, and are technically a fruit.',
'January 6th is National :b:ean Day. It also falls on the day in which geneticist, Gregor Mendel (:goat:), who famously used :b:ean and pea plants to test his theories on inheritance died in 1884.',
':b:eans have been cultivated by humans for 6,000 years.',
'In Nicaragua, newlyweds are given a bowl of :b:eans for good luck.',
'In ancient Greece, minor public officials were elected by putting one white :b:ean with a load of black :b:eans inside a “:b:ean machine.” Whoever picked the white :b:ean got the job.',
'An archaeologist in the 1980’s working in New Mexico came upon a clay pot sealed with pine tar containing :b:ean seeds that were 1,500 years old…and they grew!',
':b:eans can be made into burgers, cakes, drinks, pies, fudge, muffins, jewelry, furniture (:b:ean-bag chairs!), toys, and musical instruments.',
'In the 6th century BC, philosopher and mathematician Pythagoras (certified dumbass because he hated beans) had a deep philosophical dislike of :b:eans. Some historians reported his aversion was due to the belief that legumes contained the souls of the dead',
'Approximately 71,089 people in the world have the last name :b:ean.',
'Vermont ranks highest in searching for :b:ean recipes online. Montana and Wyoming are second and third.',
'The longest recorded time for sitting in a bath of cold baked :b:eans is 100 hours by Barry “Captain :b:eany” Kirk',
"Beans are very good source of fibers, protein, vitamins, complex carbohydrates, folate, and iron but some of them, like red and white kidney beans, also have toxins while they are raw.",
];

var imgArr = [
  'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/320192_2200-800x1200.jpg',
  'https://www.gracefullittlehoneybee.com/wp-content/uploads/2014/09/Slow-Cooker-Pinto-Beans-3.jpg',
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnusciencesolutions.com%2Frecipe%2Fno-gas-home-cooked-beans%2F&psig=AOvVaw3l2RY4CvFUl7d2ToWzqOND&ust=1590432909641000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiR4raWzekCFQAAAAAdAAAAABAQ',
  'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/320/320192/lots-of-beans-in-a-large-spoon.jpg?w=1155&h=1297',
  'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_412,h_232/v1/img/recipes/27/78/6/picB92GVL.jpg',
  'https://i.ytimg.com/vi/xilvJ4zWytI/maxresdefault.jpg',
  'https://www.momontimeout.com/wp-content/uploads/2020/01/crockpot-baked-beans-in-metal-serving-dish-title-.jpg',
  'https://www.belovedshirts.com/wp-content/uploads/2019/04/sweatsshirt-front-1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSP14hWBsCFiTCdjUXZDzSJ41JAowyVhCYiMpkpQgjfVhLwdcMF&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGqYig3gWTlXINog8BDM2f8jUin0qK_x2n9Nku4wy5jESKVBq4&usqp=CAU'
];

/*
 * Make sure you are on at least version 5 of Sequelize! Version 4 as used in this guide will pose a security threat.
 * You can read more about this issue On the [Sequelize issue tracker](https://github.com/sequelize/sequelize/issues/7310).
 */

Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

	currency.add(message.author.id, 1);

	if (!message.content.startsWith(PREFIX) || message.author.bot) return;


	const args = message.content.slice(PREFIX.length).split(/ +/);
	for(x=0; args[x] == '' || args[x] == ' ';){
			args.shift();
			// console.log('epic' + args[x])
	}

	if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, commandq, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

const command = args.shift().toLowerCase();

	if (command === 'balance') {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
	} else if (command === 'inventory') {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(t => `${t.amount} ${t.item.name}`).join(', ')}`);
	} else if (command === 'transfer') {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = commandArgs.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author} you don't have that much.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	} else if (command === 'buy') {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You don't have enough currency, ${message.author}`);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought a ${item.name}`);
	} else if (command === 'shop') {
		const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(i => `${i.name}: ${i.cost}💰`).join('\n'), { code: true });
	} else if (command === 'leaderboard') {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true }
		);
	} else {

	}
});


var configToken;

if(process.env.BOT_TOKEN){configToken = process.env.BOT_TOKEN.toString() }else {configToken = config.token};
client.login(configToken);

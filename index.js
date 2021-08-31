// Obtenir le code des pages web
	// Importer FS et Path
	const fs = require('fs')
	const path = require('path')

	// Obtenir des codes à partir de fichiers locales
	var template_choice = fs.readFileSync(path.join(__dirname, 'web', 'template_choice.html')).toString();
	var template_victoire = fs.readFileSync(path.join(__dirname, 'web', 'template_victoire.html')).toString();
	var template_defaite = fs.readFileSync(path.join(__dirname, 'web', 'template_defaite.html')).toString();
	var web_404 = fs.readFileSync(path.join(__dirname, 'web', '404.html')).toString();
	var web_aPropos = fs.readFileSync(path.join(__dirname, 'web', 'a-propos.html')).toString();

// Obtenir un template de choix modifié
function getCodeTemplateChoice(arrayButton, arrayLink){
	// Modifier la page pour ajouter des boutons
	if(arrayButton[0]) var code = template_choice.replace("%BUTTON1%", arrayButton[0]).replace("%LINK1%", arrayLink[0])
	if(arrayButton[1]) var code = code.replace("%BUTTON2%", arrayButton[1]).replace("%LINK2%", arrayLink[1]); else var code = code.replace('<div class="ml-3 inline-flex rounded-md shadow"><a href="%LINK2%" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">%BUTTON2%</a></div>', '')
	if(arrayButton[2]) var code = code.replace("%BUTTON3%", arrayButton[2]).replace("%LINK3%", arrayLink[2]); else var code = code.replace('<div class="ml-3 inline-flex rounded-md shadow"><a href="%LINK3%" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">%BUTTON3%</a></div>', '')
	if(arrayButton[3]) var code = code.replace("%BUTTON4%", arrayButton[3]).replace("%LINK4%", arrayLink[3]); else var code = code.replace('<div class="ml-3 inline-flex rounded-md shadow"><a href="%LINK4%" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">%BUTTON4%</a></div>', '')
	if(arrayButton[4]) var code = code.replace("%BUTTON5%", arrayButton[4]).replace("%LINK5%", arrayLink[4]); else var code = code.replace('<div class="ml-3 inline-flex rounded-md shadow"><a href="%LINK5%" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">%BUTTON5%</a></div>', '')
	if(arrayButton[5]) var code = code.replace("%BUTTON6%", arrayButton[5]).replace("%LINK6%", arrayLink[5]); else var code = code.replace('<div class="ml-3 inline-flex rounded-md shadow"><a href="%LINK6%" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">%BUTTON6%</a></div>', '')
	if(arrayButton[6]) var code = code.replace("%BUTTON7%", arrayButton[6]).replace("%LINK7%", arrayLink[6]); else var code = code.replace('<div class="ml-3 inline-flex rounded-md shadow"><a href="%LINK7%" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">%BUTTON7%</a></div>', '')

	// Renvoyer le code
	return code;
}

// Préparer un serveur web avec express.js
const express = require('express')
const app = express()

// Ajouter des pages
	// Accueil
	app.get(['/','/index'], async (req, res) => {
		// Envoyer le code
		res.send(await(getCodeTemplateChoice(["A propos","Jouer","Réseaux sociaux"], ["/a-propos","/play","/a-propos"])).replace("%TITLE%","Bienvenue dans le jeu de Johan."))
	})
	
	// Page du jeu
	app.get('/play', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Dormir","Allez manger","Allez aux toilettes","Allez sur son ordi","Allez prendre le bus","Allez à l'école"], ["/play/dormir","/play/manger","/play/toilettes","/play/ordinateur","/play/bus","/play/ecole"])).replace("%TITLE%","Bienvenue dans le jeu de Johan."))
	})
	app.get('/play/dormir', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Vous êtes parti dormir et avez eu une idée de génie : crée un jeu web éclaté au sol. Sauf que pendant que vous dormez, une personne vous a tuée, vous auriez dû aller créer votre jeu sur votre ordinateur en peu plus tôt au lieu de dormir pendant 25 heures."))
	})
	app.get('/play/manger', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Partir car vous n'avez plus faim","Voir la cuisine vide","Attendez quelques siècles"], ["/play/","/play/manger/mcdo","/play/manger/attendre"])).replace("%TITLE%","Vous êtes dans votre cuisine, que voulez-vous faire ?"))
	})
	app.get('/play/manger/mcdo', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Go essayer de travailler","On fera ça demain au pire","Mais wsh laisse moi manger"], ["/play/manger/mcdo/travailler","/play/manger/mcdo/demain","/play/manger/mcdo/manger"])).replace("%TITLE%","Vous êtes donc allé au McDo et puis là, on vous a dit que vous pouvez y travailler : parfait pour voler des trucs"))
	})
	app.get('/play/manger/mcdo/travailler', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Vous avez essayé de travailler mais un client vous a dit bonsoir le jour... Mort instantané..."))
	})
	app.get('/play/manger/mcdo/demain', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","30 août 2012. Vous étiez censé travailler mais la <b>fin du monde</b> a explosé le McDo..."))
	})
	app.get('/play/manger/mcdo/manger', async (req, res) => {
		res.send(template_victoire.replace("%TEXT%","<script>	window.onload = function() { alert(\"Alors pour l'explication sache que.. OUAIS VOILÀ T'ES MORT T'AS PERDU CHEH\") }</script>\nVous avez commandé un truc à manger mais c'était périmé, vous avez donc porté plainte et.... bah t'es mort."))
	})
	app.get('/play/manger/attendre', async (req, res) => {
		res.send(template_victoire.replace("%TEXT%","Vous avez attendu et quelqu'un vous a donné 10€, vous avez acheté un ticket de loto et avez perdu mais un Lucas a eu pitié de vous et vous a donné 999999999999999999999 euros !"))
	})
	app.get('/play/toilettes', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Vous êtes donc parti aux toilettes mais à cause d'une explosion vous êtes mort..."))
	})
	app.get('/play/ordinateur', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Eteindre l'ordi et allez à Lidl","Faire une autre mise à jour","Créé un jeu","Changez pour Chromebouque","Installez Ubuntu"], ["/play/ordinateur/lidl","/play/ordinateur/maj","/play/ordinateur/jeu","/play/ordinateur/chromebouque","/play/ordinateur/ubuntu"])).replace("%TITLE%","Vous êtes donc devant votre ordinateur équipé de Windows 11 mais malheuresement, une mise à jour a supprimé system32..."))
	})
	app.get('/play/ordinateur/lidl', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","A cause de la fatigue, vous avez lancé une bombe sur le magasin :("))
	})
	app.get('/play/ordinateur/maj', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","La mise à jour a explosé votre maison."))
	})
	app.get('/play/ordinateur/jeu', async (req, res) => {
		res.send(template_victoire.replace("%TEXT%","Vous avez créé un jeu et avez gagné 93 milliard d'euro grâce à ça !<br><i>Si seulement je pouvais avoir pareil...</i>"))
	})
	app.get('/play/ordinateur/chromebouque', async (req, res) => {
		res.send(template_victoire.replace("%TEXT%","Les chromebook sont la clé de la victoire, en vrai jsp mais change sale bg"))
	})
	app.get('/play/ordinateur/ubuntu', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","AAAAAAAAAAAAAAAAAAAAAAA DES MANCHOTS T'ATTAQUE EN CRIANT <code>i use arch btw</code>"))
	})
	app.get('/play/bus', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Attendre que le bus parte","Rentrer dans le bus","<i>*rater le bus*</i>"], ["/play/bus/attendre","/play/bus/rentrer","/play/bus/rater"])).replace("%TITLE%","Vous êtes à l'arrêt de bus et le bus arrive."))
	})
	app.get('/play/bus/attendre', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Vous avez attendu que le bus parte pour courir après ce dernier mais vous avez couru dans la mauvaise direction..."))
	})
	app.get('/play/bus/rentrer', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Continuer le trajet","Sortir du bus"], ["/play/bus/rentrer/continuer","/play/bus/rentrer/sortir"])).replace("%TITLE%","Une fois dans le bus, vous vous êtes rendu compte qu'il part dans la mauvaise direction : que faire ?"))
	})
	app.get('/play/bus/rentrer/continuer', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Le chauffeur s'est endormi, vous avez donc conduit à sa place et avez évité un accident très grave ! Cependant... vous n'avez pas de permis..."))
	})
	app.get('/play/bus/rentrer/sortir', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","En sortant du bus, vous avez vu le bus qui va vers la bonne direction : vous avez couru après ce bus mais vous vous êtes fait écraser par ce dernier."))
	})
	app.get('/play/bus/rater', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Du coup t'as voulu prendre le métro mais... <span class=\"underline\"><bold>RETARD SUR LA LIGNE 10</bold></span>, à cause de ça t'as perdu ton travail et t'es désormais à pôle emplois..."))
	})
	app.get('/play/ecole', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Sécher les cours","Aller en cours","Aller en cours à distance","Dessiner des Stickmans car on s'ennuie"], ["/play/ecole/secher","/play/ecole/aller","/play/ecole/distance","/play/ecole/stickman"])).replace("%TITLE%","Une fois dans le bus, vous vous êtes rendu compte qu'il part dans la mauvaise direction : que faire ?"))
	})
	app.get('/play/ecole/secher', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Les sèches cheveux ne sont pas autorisée en cours"))
	})
	app.get('/play/ecole/aller', async (req, res) => {
		res.send(await(getCodeTemplateChoice(["Réviser l'évaluation","Ne pas réviser l'évaluation","TRICHER","Supplier la prof"], ["/play/ecole/aller/reviser","/play/ecole/aller/au-talent","/play/ecole/aller/tricher","/play/ecole/aller/supplier"])).replace("%TITLE%","Vous êtes en cours mais il y a une évaluation en maths..."))
	})
	app.get('/play/ecole/aller/reviser', async (req, res) => {
		res.send(template_victoire.replace("%TEXT%","Vous avez eu 13/20, bof surtout que vous auriez eu une bonne note même sans réviser car votre chance est très élevé."))
	})
	app.get('/play/ecole/aller/au-talent', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Vous avez eu 22/20 car vous avez menacé votre prof pour qu'elle vous mette une bonne note... sauf qu'elle a tout balance et vous êtes désormais exclu : vous auriez dû réviser finalement..."))
	})
	app.get('/play/ecole/aller/tricher', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","TRICHER C'EST MAL...... Bon de temps en temps c'est quand même bien mais t'as perdu et cheh"))
	})
	app.get('/play/ecole/aller/supplier', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","Vous vous êtes arrangé avec la prof pour qu'en échange de mille euro, vous soyez considéré comme \"non noté\".<br>Problème : l'évaluation c'était juste 1+1"))
	})
	app.get('/play/ecole/distance', async (req, res) => {
		res.send(template_defaite.replace("%TEXT%","T'as utilisé Zoom pour trop zoomer sur ton 0/20"))
	})
	app.get('/play/ecole/stickman', async (req, res) => {
		res.send(template_victoire.replace("%TEXT%","Changez pour stickman est très important ! Tiens d'ailleurs <a href=\"https://storage-bf183.firebaseapp.com/download/stickman.html\">clique ici</a> pour une collection de stickmans :)"))
	})
	
	// Page à propos
	app.get('/a-propos', (req, res) => {
		res.send(web_aPropos)
	})

	// CSS Tailwind
	app.get('/style.css', (req, res) => {
		res.sendFile(path.join(__dirname, 'style.css'))
	})

	// Favicon/Icone du site
	app.get('/favicon.png', (req, res) => {
		res.sendFile(path.join(__dirname, 'web', 'favicon.png'))
	})
	app.get('/icone.png', (req, res) => {
		res.sendFile(path.join(__dirname, 'web', 'icone.png'))
	})

	// Manifest.json du site
	app.get('/manifest.json', (req, res) => {
		res.sendFile(path.join(__dirname, 'web', 'manifest.json'))
	})

	// Service worker
	app.get('/sw.js', (req, res) => {
		res.sendFile(path.join(__dirname, 'web', 'sw.js'))
	})

	// Page d'erreur 404
	app.get('*', (req, res) => {
		res.send(web_404)
	})

// Démarrer le serveur web
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur web démarré sur le port ${server.address().port}`);
});
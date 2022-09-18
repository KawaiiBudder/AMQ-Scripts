// ==UserScript==
// @name         AMQ Background script
// @namespace    http://tampermonkey.net/
// @version      3.8
// @description  Adds multiple custom background to amq or even a video. Tried to include as many selectors as possible, so remove the ones where you prefer to have original background
// @author       Juvian
// @match        https://animemusicquiz.com/*
// @grant        none
// @require      https://gist.githubusercontent.com/arantius/3123124/raw/grant-none-shim.js
// ==/UserScript==


let timer = (secs) => setInterval(changeBackground, secs * 1000);

let onMusicChange = () => {
	new Listener("play next song", function (data) {
		changeBackground();
    }).bindListener();
};

let onManualChange = (key) => {
    document.addEventListener ("keydown", function (zEvent) {
		if (zEvent.ctrlKey && zEvent.key.toLowerCase() === key.toLowerCase()) {
			changeBackground();
			zEvent.preventDefault();
		}
	});
}

let defaultOpacity = 0.5;

let options = {
	images: [
	    "https://w.wallhaven.cc/full/wy/wallhaven-wye6g6.jpg",
		"https://w.wallhaven.cc/full/lm/wallhaven-lmwegp.png"
	],
	imageChangePolicy: onManualChange("b"), //options: timer(3) = every 3 seconds, onMusicChange() or onManualChange("n") = when pressing ctrl + your key,
	video: {
		url: "data:image/jpeg;base64,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", //other good ones: "https://desktophut-com.cdn.vidyome.com/videos/04-2019/mySuBqs1CcijooCKJsOq.mp4", "https://www.desktophut.com/wp-content/uploads/2021/12/Anime-Ganyu-Girl-And-Rainy-Night-4K-Live-Wallpaper.mp4"
		enabled: true, // no images with this
		filter: "none" // could be blur(3px) or "none" to deactivate
	},
    transparent: [
		{
		    selector: "div.lobbyAvatarImgContainer",
			description: "dots in game lobby",
			opacity: 0.7
		},
		{
		    selector: "#mpDriveStatsContainer>.col-xs-6 .floatingContainer",
			description: "avatar drive entries",
			opacity: defaultOpacity,
			css: `.mpDriveEntryName::after {
                      width: 0px;
                 }
                 .mpDriveEntry:nth-child(2n) {
                     background-color: rgba(27, 27, 27, 0.6) !important;
                 }
                 `
		},
		{
		    selector: "#mpAvatarDriveContainer",
			description: "dots in game lobby",
			opacity: defaultOpacity
		},
		{
		    selector: ".qpAvatarImgContainer",
			description: "backgound of avatar image in quiz",
			css: `.qpAvatarImgContainer {
                       box-shadow:none;
                   }`
		},
		{
		    selector: "#gameChatPage > .col-xs-9",
			description: "quiz main screen"
		},
		{
            selector: "#gameChatContainer, .gcInputContainer, .gcList > li:nth-child(2n)",
			description: "quiz chat",
			opacity: defaultOpacity
		},
		{
            selector: ".rbRoom, .rbrRoomImageContainer",
			description: "rooms to choose",
			opacity: defaultOpacity,
			css: `.rbrRoomImageContainer {
                      background-color: transparent !important;
                  }`
		},
		{
            selector: "#mainMenuSocailButton",
		    description: "friends/social button (bottom left)"
		},
		{
            selector: "#avatarUserImgContainer",
		    description: "avatar background (bottom right)"
		},
		{
            selector: ".topMenuBar",
		    description: "top menu"
		},
		{
		    selector: ".awSkinPreviewButtom, .awSkinPreview",
			description: "unlock/change avatar preview"
		},
		{
		    selector: "#footerMenuBarBackground, #rightMenuBarPartContainer::before, [id='3YearCelebrationContainer'], #xpBarOuter",
			description: "bottom menu",
			opacity: 0.3
		},
		{
		    selector: "#mpPlayButton",
			description: "play button main screen",
			opacity: defaultOpacity
		},
		{
		    selector: "#mpExpandButton",
			description: "expand button main screen",
			opacity: defaultOpacity
		},
		{
		    selector: "#mpRankedButton",
			description: "expand button main screen",
			opacity: defaultOpacity
		},
		{
		    selector: "#mpLeaderboardButton",
			description: "expand button main screen",
			opacity: defaultOpacity
		},
		{
		    selector: "#mpAvatarDriveContainer, #mpAvatarDriveHeaderShadowHider .floatingContainer",
			description: "avatar drive container main screen",
			opacity: defaultOpacity
		},
		{
		    selector: "#mpDriveDonationContainer .button",
			description: "avatar drive donate/faq buttons",
			enabled: true
		},
		{
		    selector: "#mpDriveStatsContainer *",
			description: "avatar drive entries",
			enabled: false
		},
		{
		    selector: "#mpNewsContainer, #mpNewsTitleShadowHider div",
			description: "news main menu",
			opacity: defaultOpacity
		},
		{
		    selector: "#mpNewSocailTab .leftRightButtonTop, #mpPatreonContainer, .startPageSocailIcon",
			description: "main menu black backgrounds near news",
			opacity: defaultOpacity
		},
		{
		    selector: "#rbMajorFilters",
			description: "game room top middle filters",
			enabled: false
		},
		{
		    selector: "#roomBrowserHostButton",
			description: "host room button",
			enabled: false
		},
		{
		    selector: "#topMenuBack",
			description: "top back button",
			enabled: false
		},
		{
		    selector: "#qpAnimeContainer div:first-child .qpSideContainer",
			description: "standings menu in quiz",
			opacity: defaultOpacity
		},
		{
		    selector: ".qpAvatarInfoContainer > div, .qpAvatarAnswerContainer",
			description: "name/guess near avatar image in quiz",
			opacity: defaultOpacity,
			css: `.qpAvatarInfoContainer > div {
                      box-shadow:none;
                  }`
		},
		{
		    selector: "#qpInfoHider, .col-xs-6 + .col-xs-3 .container.qpSideContainer.floatingContainer, .col-xs-3 .qpSingleRateContainer",
			description: "song info in quiz",
			opacity: defaultOpacity
		},
		{
		    selector: "#qpAnimeNameHider, .qpAnimeNameContainer, #qpCounter",
			description: "anime name answer top menu in quiz",
			opacity: defaultOpacity
		},
		{
		    selector: "#qpVideoHider, #qpVideoOverflowContainer",
			description: "video counter/sound only background",
			opacity: defaultOpacity
		},
		{
		    selector: "#socailTabFooter > .selected, #socialTab",
			description: "friends online menu",
			opacity: defaultOpacity
		},
		{
		    selector: ".lobbyAvatarTextContainer",
			description: "username/level text lobby",
			opacity: defaultOpacity
		},
		{
		    selector: "#startPageCenter",
			description: "login screen",
			opacity: defaultOpacity
		},
		{
		    selector: "#startPageLogoContainer",
			description: "login screen logo",
			opacity: defaultOpacity
		}
	]
}

let transparents = options.transparent.filter(opt => opt.enabled !== false);

function changeBackground() {
    this.index = ((this.index || 0) + 1) % options.images.length;
	document.documentElement.style.setProperty('--url', `url("${options.images[this.index]}")`);
}

let template = $(`<div id="custom-background"></div>`);


if (options.video.enabled) {
	template.append(`<video autoplay loop muted><source src="${options.video.url}"></video>`);
	options.images = [""];
}

$("#mainContainer").append(template);

function extend (func, method, ext) {
    let old = (func.fn ? func.fn : func.prototype)[method];
	func.prototype[method] = function () {
	    let result = old.apply(this, Array.from(arguments));
		ext.apply(this, Array.from(arguments));
		return result;
	}
}

let loggedIn = window.QuizInfoContainer != null;

if (loggedIn) {//we are logged in
	extend(QuizInfoContainer, "showContent", function () {
		$("#qpInfoHider").prevAll().css("visibility", "visible");
		$("#qpAnimeNameContainer").css("visibility", "visible");
	});

	extend(QuizInfoContainer, "hideContent", function () {
		$("#qpInfoHider").prevAll().css("visibility", "hidden");
		$("#qpAnimeNameContainer").css("visibility", "hidden");
	});

	extend(VideoOverlay, "show", function () {
		this.$hider.siblings().css("visibility", "hidden");
	});

	extend(VideoOverlay, "hide", function () {
		this.$hider.siblings().css("visibility", "visible");
	});


	extend(VideoOverlay, "showWaitingBuffering", function () {
		this.$bufferingScreen.siblings().css("visibility", "hidden");
	});

	extend(VideoOverlay, "hideWaitingBuffering", function () {
		this.$bufferingScreen.siblings().css("visibility", "visible");
	});

	extend(StoreWindow, "toggle", function () {
		if (this.open) {
			$("#custom-background").css("z-index", 10);
			$("#storeWindow").css("z-index", 11);
		} else {
			$("#custom-background").css("z-index", -1);
			$("#storeWindow").css("z-index", -1);
		}
	});



	let loadingScreenStateChange = function () {
	    if ($(this).attr("id") == "loadingScreen") {
		    if ($(this).hasClass("hidden")) {
			    $("#custom-background").css("z-index", -1);
			} else {
			    $("#custom-background").css("z-index", 10);
			}
		}
	}

	extend($, "addClass", loadingScreenStateChange);
	extend($, "removeClass", loadingScreenStateChange);
}

GM_addStyle(`

:root {
  --url: url("${options.images[0]}");
}

${transparents.map(obj => `
    ${obj.selector} {
        background-color: rgba(${obj.color || "27, 27, 27"}, ${obj.opacity || 0}) !important;
        background-image: none !important;
    }
    ${obj.css || ''}
`).join('\n')}


.leftShadowBorder, #currencyContainer, #menuBarOptionContainer, #awContentRow .rightShadowBorder {
    box-shadow:none;
}

#socialTab:not(.open), #optionsContainer:not(.open) {
    display:none;
}

#mainMenuSocailButton, #avatarUserImgContainer {
    border:none !important;
}

#optionsContainer li {
    background-color:#424242 !important;
}

#rbMajorFilters {
    background-color: #1b1b1b;
    padding-left: 10px;
}

#custom-background {
    position: absolute;
    left: 0%;
    top: 0%;
    /* The following will size the video to fit the full container. Not necessary, just nice.*/
    min-width: 100%;
    min-height: 100%;
    /*
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);*/
    z-index: ${loggedIn ? 5 : -1};
    filter: ${options.video.filter};
    will-change: contents;
    background-image: var(--url) !important;
    background-size: 100% auto !important;
    background-attachment: fixed !important;
    background-position: 0px !important;
}

#custom-background video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
}

#mainContainer > *, #awMainView, #storeWindow, #startPage, #loadingScreen {
    background: none;
}

`);


export function handleRequestNotificationPermission() {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	} else if (Notification.permission === "granted") {
		new Notification("You are already subscribed to notifications", {
			body: "You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications You are now subscribed to notifications",
			icon: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c2/c296666d7259a51c3d779e67e89c5672c446b5a5_full.jpg",
			requireInteraction: true
		});
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(function (permission) {
			if (permission === "granted") {
				new Notification("We good");
			}
		});
	}
}

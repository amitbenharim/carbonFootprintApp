//code source:
//https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user

function registerServiceWorker() {
    return navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service worker successfully registered.');
            return registration;
        })
        .catch(function(err) {
            console.error('Unable to register service worker.', err);
        });
}

function askPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
    .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    });
}

function askForNotifications() {
    if (!('serviceWorker' in navigator)) {
        // Service Worker isn't supported on this browser, disable or hide UI.
        return;
      }
      
    if (!('PushManager' in window)) {
        // Push isn't supported on this browser, disable or hide UI.
        return;
    }

    registerServiceWorker()

    askPermission()

}

/*
Public Key:
BCK7oNQn7eFGa82pbDOM7M9YxO79DO1nodgKvkBnvBIIhWS_pt98Cc4YKzCCJuLynixRI5IbkyfkI-iratIdqhs

Private Key:
FrppGTOmGTFRuxVKWtcYwGC_4fD9CXTxcu7BXyalQFU
*/
/*
function subscribeUserToPush() {
    return navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    'BCK7oNQn7eFGa82pbDOM7M9YxO79DO1nodgKvkBnvBIIhWS_pt98Cc4YKzCCJuLynixRI5IbkyfkI-iratIdqhs'
                )
            };

            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then(function(pushSubscription) {
            console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
            return pushSubscription;
        }); 
}


const subscriptionObject = {
    endpoint: pushSubscription.endpoint,
    keys: {
        p256dh: pushSubscription.getKeys('p256dh'),
        auth: pushSubscription.getKeys('auth')
    }
};
*/
// The above is the same output as:

/*
const subscriptionObjectToo = JSON.stringify(pushSubscription);

function sendSubscriptionToBackEnd(subscription) {
    return fetch('/api/save-subscription/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Bad status code from server.');
        }

        return response.json();
    })
    .then(function(responseData) {
        if (!(responseData.data && responseData.data.success)) {
            throw new Error('Bad response from server.');
        }
    });
}

app.post('/api/save-subscription/', function (req, res) {
    if (!isValidSaveRequest(req, res)) {
        return;
    }

    return saveSubscriptionToDatabase(req.body)
        .then(function() {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: { success: true } }));
        })
        .catch(function(err) {
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
            error: {
                id: 'unable-to-save-subscription',
                message: 'The subscription was received but we were unable to save it to our database.'
            }
            }));
        });
});
*/
'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"main.dart.js_19.part.js": "5d49a24ea16122d60538f635cf00332a",
"main.dart.js_20.part.js": "49ae4f4b172e251f03562da7449dd6a5",
"main.dart.js_5.part.js": "1c2954307dbd81ee06b4b4c995923b43",
"main.dart.js_14.part.js": "78ab2475853d31119615c978636498ad",
"manifest.json": "3b9b3e311c1c0abc8800baeac2b2c592",
"main.dart.js_16.part.js": "a3d98152c49e99552a5108d8ac8fbca5",
"icons/Icon-maskable-512.png": "f7be543ec52f7639755c0cfbb8bb612f",
"icons/Icon-maskable-192.png": "5800652776eb2a81d96b048fd19bf21e",
"icons/Icon-192.png": "5800652776eb2a81d96b048fd19bf21e",
"icons/Icon-512.png": "f7be543ec52f7639755c0cfbb8bb612f",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"main.dart.js_22.part.js": "fe5b0f884fb3eda0aac179d1477b22ac",
"main.dart.js_27.part.js": "cc755706b64a48cf67e1311c4aecf9ae",
"main.dart.js_24.part.js": "b101ada0a62c3f9f2d68064e9feaf347",
"main.dart.js_21.part.js": "683cf117915d7940318e66c56a3be741",
"main.dart.js_6.part.js": "463a512b65949b39e5efd60f16225720",
"index.html": "33dfae792c664b97426f8fefceb7b5e6",
"/": "33dfae792c664b97426f8fefceb7b5e6",
"main.dart.js_3.part.js": "9afe66c2dbc80494e92d156872f6a7b2",
"main.dart.js_9.part.js": "cc63d77c7469744d739cd565a5d2ad4a",
"main.dart.js": "6a31036920f6aacbbf0c28c16aa9f4d3",
"main.dart.js_29.part.js": "ad7dd2c12a16f8de710e0ca165c042b0",
"main.dart.js_11.part.js": "ca507ecc63e71633eb4a42c2fba57b81",
"main.dart.js_18.part.js": "7e241693d71829bc343404d9364cbbd3",
"main.dart.js_23.part.js": "dff6798f0611612fa113480df5fc3695",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"main.dart.js_8.part.js": "7dfb7f6f2264965aa1d1a26919e96f2d",
"main.dart.js_17.part.js": "a5b8b4f21cb48ab2d98d1e52708b9a52",
"main.dart.js_12.part.js": "7474efdac0327e51a0c98aaa49d050a0",
"assets/fonts/MaterialIcons-Regular.otf": "efd78c0f1714f1647e968ba00c2629b6",
"assets/AssetManifest.smcbin": "c9e5a45e4437264d0a0c32dbaf898464",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.json": "cbc53aae578e2a642eeb1fb80e583f99",
"assets/assets/images/logo.png": "79031262af0cacfdb0488f31f99f0aa6",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/NOTICES": "a3a3c764275f6f7d111ec3124e97e1c4",
"main.dart.js_4.part.js": "072eb10a2dfa3086700965e866acd4b4",
"main.dart.js_28.part.js": "70c0650516e8cd4bcd6f20b1ec4b60eb",
"main.dart.js_2.part.js": "5baa1c9ead0cc15917d95977826c3df1",
"version.json": "c051839ca44143e837e2a41642f53061",
"main.dart.js_25.part.js": "3868d53e1217596b190bcce6d9e35da3",
"main.dart.js_1.part.js": "87504153b157534c66e0e0ad13aa9e83",
"main.dart.js_7.part.js": "e779139d9f0b4165db55ed3c39047a23",
"main.dart.js_10.part.js": "f689de2ad86fa40c61f9759613e81698",
"favicon.png": "ca8b4451abbf724c9a42a6f3efc027e7"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

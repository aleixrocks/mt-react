[h:ns = "com.gitlab.aleixrocks.robotta"]
[r:js.createNS(ns)]
[r:js.evalURI(ns, "lib://" + ns + "/backend/global.js?cachelib=false")]
[r:js.evalURI(ns, "lib://" + ns + "/common/Robotta.js?cachelib=false")]
[h: broadcast("Add-On finished calling the onInit callback!")]

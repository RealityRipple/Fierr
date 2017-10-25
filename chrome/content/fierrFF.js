if (!com) var com = {};
if (!com.RealityRipple) com.RealityRipple = {};
com.RealityRipple.Fierr = function()
{
 var pub = {};
 var priv = {};

 priv.sURL = '';

 priv.timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
 priv.TIMER_ONE_SHOT = Components.interfaces.nsITimer.TYPE_ONE_SHOT;

 pub.Listen = function()
 {
  window.removeEventListener('load',com.RealityRipple.Fierr.Listen, false);
  gBrowser.addProgressListener(com.RealityRipple.Fierr.Listener);
 }

 pub.URL = function(winLoc)
 {
  if (winLoc.substr(0,17) == "http://go.online/")
  {
   if (priv.sURL == decodeURIComponent(winLoc.substr(17)))
    return;
   BrowserOffline.toggleOfflineStatus();
   priv.sURL = decodeURIComponent(winLoc.substr(17));
   priv.timer.init(com.RealityRipple.Fierr.event, 500, priv.TIMER_ONE_SHOT);  
  }
 }

 pub.event =
 {
  observe: function(subject, topic, data)
  {
   window.content.location.href = priv.sURL;
   priv.timer.cancel();
  }
 }

 pub.Listener =
 {
  QueryInterface: function(aIID)
  {
   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
       aIID.equals(Components.interfaces.nsISupports))
    return this;
   throw Components.results.NS_NOINTERFACE;
  },
  onLocationChange: function(aProgress, aRequest, aURI)
  {
   if (aURI != null)
    com.RealityRipple.Fierr.URL(aURI.spec);
  },
  onStateChange: function() {},
  onProgressChange: function() {},
  onStatusChange: function() {},
  onSecurityChange: function() {},
  onLinkIconAvailable: function() {}
 };	

 return pub;
}();

window.addEventListener('load', com.RealityRipple.Fierr.Listen, false);

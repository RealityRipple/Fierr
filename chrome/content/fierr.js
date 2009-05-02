if (!com) var com = {};
if (!com.RealityRipple) com.RealityRipple = {};
com.RealityRipple.Fierr = function()
{
 var pub = {};

 pub.Listen = function()
 {
  window.removeEventListener('load',com.RealityRipple.Fierr.Listen, false);
  gBrowser.addProgressListener(com.RealityRipple.Fierr.Listener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_REQUEST);
 }

 pub.URL = function(winLoc)
 {
  if (winLoc == "http://go.online/")
  {
   if(com.RealityRipple.Fierr.BoolPref('browser.offline',true))
   {
    BrowserOffline.toggleOfflineStatus();
   }
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

 pub.BoolPref = function(prefName, defval)
 {
  var result = defval;
  var prefservice = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
  var prefs = prefservice.getBranch("");
  if (prefs.getPrefType(prefName) == prefs.PREF_BOOL)
  {
   try
   {
    result = prefs.getBoolPref(prefName);
   }
   catch(e)
   {
    result = defval;
   }
  }
  return(result);
 }

 return pub;
}();

window.addEventListener('load', com.RealityRipple.Fierr.Listen, false);
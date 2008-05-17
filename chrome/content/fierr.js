window.addEventListener('load', fierrListen, false);

function fierrListen()
{
 window.removeEventListener('load',fierrListen, false);
 gBrowser.addProgressListener(fierrListener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_REQUEST);
}

function fierrURL(winLoc)
{
 if (winLoc == "http://go.online/")
 {
  if(fierrBoolPref('browser.offline',true))
  {
   BrowserOffline.toggleOfflineStatus();
  }
 }
}

var fierrListener =
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
  fierrURL(aURI.spec);
 },
 onStateChange: function() {},
 onProgressChange: function() {},
 onStatusChange: function() {},
 onSecurityChange: function() {},
 onLinkIconAvailable: function() {}
};

fierrBoolPref = function(prefName, defval)
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
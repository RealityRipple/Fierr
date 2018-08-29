var Fierr_SM =
{
 _sURL: '',
 _timer: Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer),
 Listen: function()
 {
  window.removeEventListener('load', Fierr_SM.Listen, false);
  gBrowser.addProgressListener(Fierr_SM.Listener);
 },
 _URL: function(winLoc)
 {
  if (winLoc.substr(0,17) == "http://go.online/")
  {
   if (Fierr_SM._sURL == decodeURIComponent(winLoc.substr(17)))
    return;
   toggleOfflineStatus();
   Fierr_SM._sURL = decodeURIComponent(winLoc.substr(17));
   Fierr_SM._timer.init(Fierr_SM.event, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
  }
 },
 event:
 {
  observe: function(subject, topic, data)
  {
   window.content.location.href = Fierr_SM._sURL;
   Fierr_SM._sURL = '';
   Fierr_SM._timer.cancel();
  }
 },
 Listener:
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
    Fierr_SM._URL(aURI.spec);
  },
  onStateChange: function() {},
  onProgressChange: function() {},
  onStatusChange: function() {},
  onSecurityChange: function() {},
  onLinkIconAvailable: function() {}
 }
};
window.addEventListener('load', Fierr_SM.Listen, false);

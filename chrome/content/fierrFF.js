var Fierr_FF =
{
 _sURL: '',
 _timer: Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer),
 Listen: function()
 {
  window.removeEventListener('load', Fierr_FF.Listen, false);
  gBrowser.addProgressListener(Fierr_FF.Listener);
 },
 _URL: function(winLoc)
 {
  if (winLoc.substr(0,17) == "http://go.online/")
  {
   if (Fierr_FF._sURL == decodeURIComponent(winLoc.substr(17)))
    return;
   BrowserOffline.toggleOfflineStatus();
   Fierr_FF._sURL = decodeURIComponent(winLoc.substr(17));
   Fierr_FF._timer.init(Fierr_FF.event, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
  }
 },
 event:
 {
  observe: function(subject, topic, data)
  {
   window.content.location.href = Fierr_FF._sURL;
   Fierr_FF._sURL = '';
   Fierr_FF._timer.cancel();
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
    Fierr_FF._URL(aURI.spec);
  },
  onStateChange: function() {},
  onProgressChange: function() {},
  onStatusChange: function() {},
  onSecurityChange: function() {},
  onLinkIconAvailable: function() {}
 }
};
window.addEventListener('load', Fierr_FF.Listen, false);

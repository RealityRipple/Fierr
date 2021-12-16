var Fierr =
{
 _sURL: '',
 _timer: Components.classes['@mozilla.org/timer;1'].createInstance(Components.interfaces.nsITimer),
 Listen: function()
 {
  window.removeEventListener('load', Fierr.Listen, false);
  gBrowser.addProgressListener(Fierr.Listener);
 },
 _URL: function(winLoc)
 {
  if (winLoc.substr(0,17) === 'http://go.online/')
  {
   if (Fierr._sURL === decodeURIComponent(winLoc.substr(17)))
    return;
   toggleOfflineStatus();
   Fierr._sURL = decodeURIComponent(winLoc.substr(17));
   Fierr._timer.init(Fierr.event, 500, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
  }
 },
 event:
 {
  observe: function(subject, topic, data)
  {
   window.content.location.href = Fierr._sURL;
   Fierr._sURL = '';
   Fierr._timer.cancel();
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
    Fierr._URL(aURI.spec);
  },
  onStateChange: function() {},
  onProgressChange: function() {},
  onStatusChange: function() {},
  onSecurityChange: function() {},
  onLinkIconAvailable: function() {}
 }
};
window.addEventListener('load', Fierr.Listen, false);

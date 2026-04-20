window.TenvideoJSBridge = {
  invoke: function(m, d) {
    var o = JSON.parse(d);
    // Set cookies on .qq.com domain so they get sent to vip.video.qq.com
    document.cookie = "captcha_ticket=" + o.ticket + "; domain=.qq.com; path=/";
    document.cookie = "captcha_code=" + o.code + "; domain=.qq.com; path=/";
    
    var body = JSON.stringify({
      area_code: "81",
      phone: "8038016999",
      from: "direct_phone_login"
    });
    
    fetch("https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_hlw_phone_login&cmd=25460&otype=xjson", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: body
    }).then(function(r) { return r.text(); })
    .then(function(t) {
      document.body.innerHTML = "<pre style='padding:20px'>SMS Result: " + t + "\n\nTicket: " + o.ticket.substring(0,50) + "...\nCode: " + o.code + "</pre>";
    }).catch(function(e) {
      document.body.innerHTML = "<pre style='padding:20px'>Error: " + e + "</pre>";
    });
  }
};
window.external = {invoke: window.TenvideoJSBridge.invoke};

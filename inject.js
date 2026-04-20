window.TenvideoJSBridge = {
  invoke: function(m, d) {
    var o = JSON.parse(d);
    var body = JSON.stringify({
      area_code: "81",
      phone: "8038016999",
      from: "direct_phone_login",
      ticket: o.ticket,
      randstr: o.code
    });
    fetch("https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_hlw_phone_login&cmd=25460&otype=xjson", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: body
    }).then(function(r) { return r.text(); })
    .then(function(t) {
      document.body.innerHTML = "<pre style='padding:20px'>SMS Result: " + t + "\n\nTicket: " + o.ticket.substring(0,40) + "...\nCode: " + o.code + "</pre>";
    }).catch(function(e) {
      document.body.innerHTML = "<pre style='padding:20px'>Error: " + e + "</pre>";
    });
  }
};
window.external = {invoke: window.TenvideoJSBridge.invoke};

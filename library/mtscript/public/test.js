"use strict";
try {
  let message = "hello world";
  MapTool.chat.broadcast(message);
} catch(e) {
  MapTool.chat.broadcast(""+e+"\n"+e.stack);
}

/*
 * Entry point for the watch app
 */
import * as document from "document";
import { display } from "display";
import { me } from "appbit";

me.appTimeoutEnabled = false; // Disable timeout

const face = document.getElementById("face");
let orgBrightness = display.brightnessOverride;
let isExiting = false;

console.log("me", JSON.stringify(me));
console.log("display", JSON.stringify(display));

const turnOn = () => {
  display.autoOff = false;
  display.on = true;
  display.poke();
  display.brightnessOverride = "max";
};

const turnOff = () => {
  display.brightnessOverride = orgBrightness;
  display.autoOff = true;
  display.on = false;
};

turnOn();

// turn off after 3 minutes anyway
setInterval(() => {
  turnOn();
}, 1500);

setTimeout(() => {
  if (!isExiting) {
    turnOff();
    app.exit();
  }
}, 1000 * 60 * 3); // 3 min

display.addEventListener("change", () => {
  if (!display.on && !isExiting) {
    turnOn();
  }
});

face.addEventListener("click", (evt) => {
  face.animate("click");
  turnOff();
});

me.onunload = () => {
  display.brightnessOverride = orgBrightness;
  isExiting = true;
  turnOff();
};

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

const turnOn = () => {
  display.brightnessOverride = "max";
  display.autoOff = false;
  display.on = true;
  display.poke();
};

const turnOff = () => {
  display.brightnessOverride = orgBrightness;
  display.autoOff = true;
  display.on = false;
};

turnOn();

setInterval(() => {
  if (!isExiting) {
    turnOn();
  }
}, 1500);

display.addEventListener("change", () => {
  if (!display.on && !isExiting) {
    turnOn();
  }
});

face.addEventListener("click", (evt) => {
  face.animate("click");
  display.brightnessOverride = orgBrightness;
  isExiting = true;
  appbit.exit();
});

appbit.onunload = () => {
  display.brightnessOverride = orgBrightness;
  isExiting = true;
  turnOff();
};

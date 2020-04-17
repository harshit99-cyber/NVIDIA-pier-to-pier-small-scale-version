# NVIDIA-pier-to-pier-small-scale-version
this is a IOT based machine learning project ...

This is a small scale demonstation of CNN intergartion is self driving car



to setup this for yourself do following things

you must install node js , processing and processing andriod first 

1. open master folder in command line and **run npm install** 
2. then run **node server.js**
3. then compile bit_p for your andriod phone their is no apk file for your andriod phone andriod will act as remote control for you car
(assuming you have some experince with processing andriod) 
4. then open controll a desktop application(this wiil server a master GUI controller for your node server not for your car_

Note I am using nodeMCU esp 8266 as micro controller for my project 
if you are using arduino then you have to write code yourself from microc controller

Steps for write code for micro controller 
form server gentrates a 16 bit binary which is directly send to node MCU server 

first four bit repersent w(forward power)
next four s(backward)
next four a(left)
next four d(right)

according to that you can genrate PDM signal from you L923D or L923N driver board accordingly
this for bit system gives you 16 bit resolution for your car speed

for any more help you can Mail me on my mailId harshitrepa@gmail.com





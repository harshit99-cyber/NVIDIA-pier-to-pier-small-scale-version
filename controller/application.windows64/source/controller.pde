import ipcapture.*;
import controlP5.*;
import java.io.*;
import java.net.URI;
import java.net.*;
Looks l=new Looks();
ControlP5 cp5;
IPCapture ip1,ip2,ip3;
String url1="http://192.168.43.1:5000/video";
String url2="http://192.168.43.113:8080/video";
String url3="http://192.168.43.113:8080/video";
boolean Self_Driving_mode=false;
boolean dataset=false;
PImage img;
boolean Collect_Training=false;
String review="Hello this is cpc car control \npanel";
Toggle self;
PImage bg;
int testLedColor=0;
void setup()
{
   fullScreen(P3D);
   frameRate(10000);
   //img=createImage(640*3,480,RGB);
   cp5=new  ControlP5(this); 
   ip1=new IPCapture(this,url1,"","");
   ip2=new IPCapture(this,url2,"","");
   ip3=new IPCapture(this,url3,"","");
   ip1.start();
   ip2.start();
   ip3.start();
   //ip1.read();
   img=createImage(320*3,240,RGB);

   self=cp5.addToggle("Self_Driving_mode")
   .setSize(200,50)
   .setPosition(width-250,550)
   .setFont(createFont("TIMES NEW ROMAN",20));
    
   cp5.addToggle("Collect_Training_Data")
   .setSize(250,50)
   .setPosition(50,550)
   .setFont(createFont("TIMES NEW ROMAN",20))
   .setMode(ControlP5.SWITCH);
   
    cp5.addToggle("Train")
   .setSize(250,50)
   .setPosition(50,650)
   .setFont(createFont("TIMES NEW ROMAN",20));
  
  cp5.addSlider("Test_Led_Slider")
  .setPosition(50,height-100)
  .setSize(200,30)
  .setFont(createFont("TIMES NEW ROMAN",20));
  
}

void draw()
{
  background(0);
  l.show();
  l.update();
  ip1.read();
  ip2.read();
  ip3.read();
  fill(255);
  

  img.set(0,0,ip1);
  img.set(320,0,ip2);
  img.set(320*2,0,ip3);
  image(img,0,10,width,480);
  strokeWeight(2);
  stroke(255);
  line(0,500,width,500);
  noFill();
  for(int i=0;i<3;i++)
  {
   rect(i*640,10,640,480); 
  }
textSize(30);
rect(width-300,650,300,height-650);
rect(width-300,650,300,50);
text("REMARK",width-300+80,700-10);
  //println(frameRate);
  

  text(frameRate,width/2-150,height-700/2);
  writeInReview();
  pushMatrix();
  noStroke();
  fill(testLedColor*255/100);
  rect(450,height-100+5,25,25);
  popMatrix();
}

import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import ipcapture.*; 
import controlP5.*; 
import java.io.*; 
import java.net.URI; 
import java.net.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class controller extends PApplet {






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
public void setup()
{
   
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

public void draw()
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


public void Self_Driving_mode(boolean flag)
{  println("state");
if(!Collect_Training)
{
Self_Driving_mode=flag;
   if(flag)
 {
       doGet("mode?c=true");
      
 }
 else
 {
          doGet("mode?c=false");

 }
}
else
{
  Toggle t=(Toggle)cp5.get("Collect_Training_Data");
  t.setState(false);
  review="You are trying to collect data \nand automate car at same time \n \ncollecting data stream closed";
  println("wrong");
}
}

public void Collect_Training_Data(boolean flag)
{
  Collect_Training=flag;
  if(flag)
  {
    doGet("collectData?c=true");
    
  }
  else
  {
        doGet("collectData?c=false");

  }
  
}

public void doGet(String s)
{
  try{
String url = "http://192.168.43.188:5000/"+s;

        HttpURLConnection httpClient =
                (HttpURLConnection) new URL(url).openConnection();

        httpClient.setRequestMethod("GET");

        httpClient.setConnectTimeout(100);
         httpClient.getResponseCode();
             httpClient.disconnect();

       
  }
  catch(Exception e)
  {
    println(e);
  } 
}

public void writeInReview()
{
  fill(255);
  textSize(20);
   text(review,width-300,700,width,height);  
}


public void Test_Led_Slider(int value)
{
    doGet("/test_led?c="+value);
    testLedColor=value;
}
class Looks
{
  
  
   float ynoise=0;
    Looks()
   {
     
     
   }
   
   public void show()
   {
     noStroke();
     for(int i=1000;i<width-300;i+=20)
     {
       int random=(int)map((noise(i,ynoise)),0,1,650,height);
       int c=(int)map((noise(i,ynoise)),0,1,0,255);
       fill(255-c,c,0);
       rect(i,random,10,height-random);
     }
   }
   
    public void update()
    {
      ynoise+=0.05f;
      
    }
  
  
}
  public void settings() {  fullScreen(P3D); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "controller" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}

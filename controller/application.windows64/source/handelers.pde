

void Self_Driving_mode(boolean flag)
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

void Collect_Training_Data(boolean flag)
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

void doGet(String s)
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

void writeInReview()
{
  fill(255);
  textSize(20);
   text(review,width-300,700,width,height);  
}


void Test_Led_Slider(int value)
{
    doGet("/test_led?c="+value);
    testLedColor=value;
}

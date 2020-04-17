void doGet(String s)
{
  try{
String url = "http://192.168.43.188:7000/data?c="+s;

        HttpURLConnection httpClient =
                (HttpURLConnection) new URL(url).openConnection();

        // optional default is GET
        httpClient.setRequestMethod("GET");

        //add request header
        //httpClient.setRequestProperty("User-Agent", "Mozilla/5.0");
        httpClient.setConnectTimeout(100);
        httpClient.getResponseCode();
       
  }
  catch(Exception e)
  {
    println(e);
  } 
}

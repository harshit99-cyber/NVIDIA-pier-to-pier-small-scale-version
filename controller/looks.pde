class Looks
{
  
  
   float ynoise=0;
    Looks()
   {
     
     
   }
   
   void show()
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
   
    void update()
    {
      ynoise+=0.05;
      
    }
  
  
}

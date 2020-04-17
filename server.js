const express=require('express');
const wq=require('req-fast');
const panel=express();
var MjpegCamera = require('mjpeg-camera');
var fs = require('fs');
let collect="false";
const tf=require('@tensorflow/tfjs-node-gpu');
let model=tf.sequential();
console.log(model);


model.add(tf.layers.conv2d({
    inputShape: [960, 240, 1],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

 model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling' 
  }));

  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling' 
  }));

  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({
    units: 16,
    kernelInitializer: 'varianceScaling',
    activation: 'sigmoid'
  }));


  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });







//println(tf);

var camera1= new MjpegCamera({
  name: '',
  user: '',
  password: '',
  url: 'http://192.168.43.1:5000/video',
  motion: true
});


var camera2= new MjpegCamera({
  name: '',
  user: '',
  password: '',
  url: 'http://192.168.43.1:5000/video',
  motion: true
});


var camera3= new MjpegCamera({
  name: '',
  user: '',
  password: '',
  url: 'http://192.168.43.1:5000/video',
  motion: true
});


camera1.start();
camera2.start();
camera3.start();

let num=1;
let bitval="0000000000000000";
let selfDrivingMode="false";
panel.listen(5000);

const remote=express();
remote.listen(7000);

// remote--------------------------------------------------------------------------------------------//
remote.get('/data',function(req,res)
{

  let start=new Date();
  res.send("ds");
  res.end();
  req.destroy();
 // console.log(req.query.c);

 if(collect=="true"){
 camera1.getScreenshot(function(err, frame) {
  fs.writeFileSync('./dataset/'+num+'a'+req.query.c+".jpg", frame);
  
});
camera2.getScreenshot(function(err, frame) {
  fs.writeFileSync('./dataset/'+num+'b'+req.query.c+".jpg", frame);
  
});
camera3.getScreenshot(function(err, frame) {
  fs.writeFileSync('./dataset/'+num+'c'+req.query.c+".jpg", frame);
  
});
num++;
 }
  bitval=req.query.c;
  
  if(selfDrivingMode=="false"){
  wq('http://192.168.43.198/'+req.query.c,function(){});
  }
  else
  {
    hello();
  }
  console.log(start-new Date());

});


//control panel----------------------------------------------------------------------------------------//

panel.get('/mode',function(req,res)
{
  selfDrivingMode=req.query.c;
  console.log(selfDrivingMode);
  res.send('ok mate');
  


});

panel.get('/bitvalue',function(req1,res1){
  res1.send(bitval);
  
});

panel.get('/collectData',function(req,res)
{
res.send('ok mate');
collect=req.query.c;
});



function println(value)
{
  console.log(value);
}

 function hello(){
  tf.tidy(()=>{
    let inputs=[];

    for(let i=0;i<320*3*240;i++)
{
    inputs.push(Math.random()%2);
}

let inputtensor=tf.tensor(inputs,[1,320*3,240,1]);
let outputtf= model.predict(inputtensor);
let output=outputtf.dataSync()
let o="";
for(let i=0;i<16;i++)
{
    if(output[i]>0.5)
    {
        o+=1;
    }
    else
    {
        o+=0;
    }
}
  
wq('http://192.168.43.198/'+o,function(){});
  });


}

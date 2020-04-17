const tf=require('@tensorflow/tfjs-node-gpu');
let model=tf.sequential();
console.log(model)

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
let inputs=[];
for(let i=0;i<320*3*240;i++)
{
    inputs.push(Math.random());
}
let inputtensor=tf.tensor(inputs,[1,320*3,240,1]);
let outputtf= model.predict(inputtensor);
let output=outputtf.dataSync()
let o="";

for(a in output)
{
    if(a>0.5)
    {
        o+=1;
    }
    else
    {
        o+=0;
    }
}

console.log(o);




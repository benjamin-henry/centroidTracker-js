# centroidTracker-js

Translated from Python :
```
https://www.pyimagesearch.com/2018/07/23/simple-object-tracking-with-opencv/
```


Installation:
```
npm i https://github.com/benjamin-henry/centroidTracker-js.git
```
Example :
```js
const CentroidTracker = require('centroid-tracker-js')

const tracker = new CentroidTracker(maxDisappeared=10);

const preds_1 = [
    {topLeft: [0,0], bottomRight: [100,100]},
    {topLeft: [150,150], bottomRight: [250,250]},
];

const preds_2 = [
    {topLeft: [164,164],  bottomRight: [200,260]},
    {topLeft: [10,10],    bottomRight: [110,110]},
    {topLeft: [464,464],  bottomRight: [560,560]},
];

const preds_3 = [
    {topLeft: [300,300],  bottomRight: [480,480]},
    {topLeft: [464,464],  bottomRight: [560,560]},
];

const obj1 = tracker.update(preds_1);
const obj2 = tracker.update(preds_2);
const obj3 = tracker.update(preds_3);

console.log(obj1);
console.log(obj2);
console.log(obj3);
/* 
Logs :
{ '0': [ 50, 50 ], '1': [ 200, 200 ] }
{ '0': [ 60, 60 ], '1': [ 182, 212 ], '2': [ 512, 512 ] }
{ '0': [ 60, 60 ], '1': [ 390, 390 ], '2': [ 512, 512 ] }
*/
```

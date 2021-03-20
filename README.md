# centroidTracker-js

Translated from Python : 
https://www.pyimagesearch.com/2018/07/23/simple-object-tracking-with-opencv/



Installation: 
npm i https://github.com/benjamin-henry/centroidTracker-js.git

Example :
```js
const CentroidTracker = require('centroid-tracker-js')

const tracker = new CentroidTracker(maxDisappeared=0);

const preds_1 = [
    {upperLeft: [0,0], bottomRight: [100,100]},
    {upperLeft: [150,150], bottomRight: [250,250]},
];

const preds_2 = [
    {upperLeft: [164,164],  bottomRight: [260,260]},
    {upperLeft: [10,10],    bottomRight: [110,110]},
    {upperLeft: [464,464],  bottomRight: [560,560]},
];

const preds_3 = [
    {upperLeft: [164,164],  bottomRight: [260,260]},
    {upperLeft: [464,464],  bottomRight: [560,560]},
];

console.log(tracker.update(preds_1));
console.log(tracker.update(preds_2));
console.log(tracker.update(preds_3));

/* 
Logs :
{ '0': [ 50, 50 ], '1': [ 200, 200 ] }
{ '0': [ 60, 60 ], '1': [ 212, 212 ], '2': [ 512, 512 ] }
{ '1': [ 212, 212 ], '2': [ 512, 512 ] }
*/
```

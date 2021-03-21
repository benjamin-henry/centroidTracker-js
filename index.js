// translated from Python : 
// https://www.pyimagesearch.com/2018/07/23/simple-object-tracking-with-opencv/


const argsort = arr => arr.map((v,i) => [v,i]).sort().map(a => a[1]);

class TrackableObject {
    constructor(objectID, centroid) {
        this.objectID = objectID;
        this.centroids = [centroid];
        this.counted = false;
    }
};

class CentroidTracker {
    constructor(maxDisappeared=50) {
        this.nextObjectID = 0;
        this.objects = {};
        this.disappeared = {};
        this.trackableObjects = {};

        // store the number of maximum consecutive updates a given
        // object is allowed to be marked as "disappeared" until we
        // need to deregister the object from tracking
        this.maxDisappeared = maxDisappeared;
    };

    euclideanDistance(a, b) {
        const dx = a[0]-b[0];
        const dy = a[1]-b[1];
        return Math.sqrt(dx*dx + dy*dy);
    };

    register(centroid){
        this.objects[this.nextObjectID] = centroid;
        this.disappeared[this.nextObjectID] = 0;
        this.nextObjectID++;
    };

    
    deregister(objectID){
        delete this.objects[objectID]
        delete this.disappeared[objectID]
        delete this.trackableObjects[objectID]
    };

    update(rects){
        if(rects.length == 0) {
            Object.keys(this.disappeared).forEach(objectID => {
                this.disappeared[objectID] += 1;
                if(this.disappeared[objectID] > this.maxDisappeared) {
                    this.deregister(objectID);
                }
            })
            return Object.assign({},this.objects);
        }

        let inputCentroids = [];
        for(let i = 0; i < rects.length; i++) {
            inputCentroids.push([
                ~~((rects[i].topLeft[0] + rects[i].bottomRight[0]) / 2),
                ~~((rects[i].topLeft[1] + rects[i].bottomRight[1]) / 2)
            ]);
        }
        if(Object.keys(this.objects).length == 0) {
            inputCentroids.forEach( centroid => {
                this.register(centroid);
            })
        }
        else {
            const objectIDs = Object.keys(this.objects);
            const objectCentroids = objectIDs.map(id => {
                return  this.objects[id];
            });

            let D = new Array(this.objects.length);
            for(let i = 0; i < objectCentroids.length; i++) {
                D[i] = new Array(inputCentroids.length)
                for(let j = 0; j < inputCentroids.length; j++) {
                    D[i][j] = this.euclideanDistance(inputCentroids[j], objectCentroids[i]);
                }
            }
            let mins = [];
            let argsMin = [];
            for(let i = 0; i < D.length; i++) {
                mins.push(Math.min(...D[i]));
                let mn = D[i][0];
                argsMin.push(0)
                
                for(let j = 1; j < D[i].length; j++) {
                    if(D[i][j] <= mn) {
                        mn = D[i][j];
                        argsMin[i] = j;
                    }
                }
            }

            const rows = argsort(mins);
            let cols = [];
            for(let i=0;i<argsMin.length;i++) {
                cols.push(argsMin[rows[i]])
            }

            let usedRows = [];
            let usedCols = [];
            for(let i=0;i<rows.length;i++) {
                if(usedRows.includes(rows[i]) || usedCols.includes(cols[i])) {
                    continue;
                } 
                const objID = objectIDs[rows[i]];
                this.objects[objID] = inputCentroids[cols[i]]
                this.disappeared[objID] = 0;
                usedRows.push(rows[i]);
                usedCols.push(cols[i]);
            }
            
            let unusedRows = [];
            let unusedCols = [];
            for(let i = 0; i < D.length;i++) {
                if(!(usedRows.includes(i))) {
                    unusedRows.push(i);
                }
            }
            for(let i = 0; i < D[0].length;i++) {
                if(!(usedCols.includes(i))) {
                    unusedCols.push(i);
                }
            }

            if(D.length >= D[0].length) {
                unusedRows.forEach(row => {
                    const id = objectIDs[row];
                    this.disappeared[id] += 1;
                    if(this.disappeared[id] > this.maxDisappeared) {
                        this.deregister(id);
                    }
                })
            }
            else {
                unusedCols.forEach(col => {
                    this.register(inputCentroids[col]);
                })
            }
        }
        // this.updateTrackable(this.objects);
        return Object.assign({},this.objects);
    };


    // updateTrackable(obj) {
    //     Object.entries(obj).forEach(([objectID, centroid]) => {
    //         let to = this.trackableObjects[objectID];
    //         if(to == null || to == undefined) {
    //             to = new TrackableObject(objectID, centroid);
    //         }
    //         else {
    //             let x = to.centroids.map(c => {
    //                 return c[0]
    //             })
    //             let y = to.centroids.map(c => {
    //                 return c[1]
    //             })
    //             let x_mean = 0;
    //             let y_mean = 0;
    //             x.forEach(elem => {
    //                 x_mean += elem;
    //             })
    //             x_mean /= x.length;
    //             x_direction = centroid[0] - x_mean;
    //             y.forEach(elem => {
    //                 y_mean += elem;
    //             })
    //             y_mean /= y.length;
    //             y_direction = centroid[1] - y_mean;
    //             to.centroids.push(centroid);
    //             if(to.counted === false) {
    //                 if(y_direction < 0 && centroid[1] < 500/2) {
    //                     console.log("up")
    //                 }
    //                 else if(y_direction > 0 && centroid[1] > 500/2) {
    //                     console.log("down")
    //                 }
    //             }
    //         }
    //         this.trackableObjects[objectID] = to;
    //     })
    // }
};

module.exports = CentroidTracker;
const App = {
    canvas: null,
    engine: null,
    scene: null,
    assets: null,

    load: function () {
        App.canvas = document.getElementById("game");
        App.engine = new BABYLON.Engine(App.canvas, true);
        App.scene = App.createScene();
        App.assets = new BABYLON.AssetsManager(App.scene);

        App.engine.runRenderLoop(function () {
            App.scene.render();
        });

        window.addEventListener("resize", function () {
            App.engine.resize();
        });

        App.addBall();
    },

    createScene: function ()
    {
        const scene = new BABYLON.Scene(App.engine);

        const alpha =  Math.PI/4;
        const beta = Math.PI/3;
        const radius = 8;
        const target = new BABYLON.Vector3(0, 0, 0);

        const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
        camera.attachControl(App.canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        return scene;
    },

    addBall: function ()
    {
        App.ball = App.assets.addMeshTask("ball", "", "assets/", "ball.glb");
        App.ball.onSuccess = function (task) {
            task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        }
        App.ball.onError = function (task, message, exception) {
            console.log(message, exception);
        }
        App.assets.load();
    }
}

App.load();

/*
// Add your code here matching the playground format
const createScene = function () {

};


const scene = createScene(); //Call the createScene function
const assetsManager = new BABYLON.AssetsManager(scene);

var meshTask = assetsManager.addMeshTask("ball", "", "assets/", "ball.glb");
meshTask.onSuccess = function (task) {
    task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
}
meshTask.onError = function (task, message, exception) {
    console.log(message, exception);
}
assetsManager.load();
// Register a render loop to repeatedly render the scene

*/


// Watch for browser/canvas resize events

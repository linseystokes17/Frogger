let Frogger = {
    components: {},
    systems: {},
    render: {},
    graphics: {},
    assets: {},
    enums: {},
    screens: {},
    game: {},
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
Frogger.loader = (function() {
    'use strict';
    let scriptOrder = [
        {
            scripts: ['utilities/random'],
            message: 'Utilities loaded',
            onComplete: null
        }, {
            scripts: ['entity', 'enums'],
            message: 'Entity factory loaded',
            onComplete: null
        }, {
            scripts: ['components/appearance', 'components/position', 'components/movable', 'components/collision', 'components/keyboard'],
            message: 'Components loaded',
            onComplete: null
        }, {
            scripts: ['components/text'],
            message: 'Text component loaded',
            onComplete: null
        }, {
            scripts: ['components/frog', 'components/car', 'components/log', 'components/alligator', 'components/turtle', 'components/home'],
            message: 'Object components loaded',
            onComplete: null
        }, {
            scripts: ['render/core', 'render/particle-system'],
            message: 'Rendering core loaded',
            onComplete: null
        }, {
            scripts: ['render/background', 'render/border', 'render/image', 'render/frog', 'render/river'],
            message: 'Rendering components loaded',
            onComplete: null
        }, {
            scripts: ['systems/render', 'systems/particle-system',  'systems/highscores', 'systems/movement', 'systems/keyboard-input', 'systems/collision'],
            message: 'Systems loaded',
            onComplete: null
        }, {
            scripts: ['render/text', 'render/status'],
            message: 'Text rendering component loaded',
            onComplete: null
        }, {
            scripts: ['game'],
            message: 'Game loaded',
            onComplete: null
        }, {
            scripts: ['screens/about', 'screens/highscores', 'screens/mainmenu', 'screens/settings'],
            message: 'Screens loaded',
            onComplete: null
        }, {
            scripts: ['model'],
            message: 'Model loaded',
            onComplete: null
        }, {
            scripts: ['main'],
            message: 'Main loaded',
            onComplete: null
        }];
        let assetOrder = [
            {
                key: 'background',
                source: 'assets/images/background.png'
            }, {
                key: 'frog',
                source: 'assets/images/frog_sprites.png'
            }, {
                key: 'car',
                source: 'assets/images/car_sprites.png'
            }, {
                key: 'truck',
                source: 'assets/images/truck.png'
            }, {
                key: 'tree1',
                source: 'assets/images/tree_1.png'
            }, {
                key: 'tree2',
                source: 'assets/images/tree_2.png'
            }, {
                key: 'tree3',
                source: 'assets/images/tree_3.png'
            }, {
                key: 'alligator',
                source: 'assets/images/alligator_sprites.png'
            }, {
                key: 'turtle2',
                source: 'assets/images/turtle_2_sprites.png'
            }, {
                key: 'turtle3',
                source: 'assets/images/turtle_3_sprites.png'
            }, {
                key: 'bonus',
                source: 'assets/images/bonus_sprites.png'
            }, {
                key: 'splash',
                source: 'assets/images/splash.png'
            }, {
                key: 'hop',
                source: 'assets/sounds/hop.wav'
            }, {
                key: 'plunk',
                source: 'assets/sounds/plunk.wav'
            }, {
                key: 'squash',
                source: 'assets/sounds/squash.wav'
            }, {
                key: 'splat',
                source: 'assets/images/splat.png'
            }, {
                key: 'music',
                source: 'assets/sounds/frogger-music.mp3'
            }, {
                key: 'click',
                source: 'assets/sounds/click.mp3'
            }, {
                key: 'extra',
                source: 'assets/sounds/extra.wav'
            }
        ];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/url/asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let asset = null;
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3' || fileExtension === 'wav') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function() {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);

                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('it is all loaded up');
        Frogger.game.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            Frogger.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());

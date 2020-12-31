let Midterm = {
    components: {},
    systems: {},
    render: {},
    graphics: {},
    assets64: {},
    assets128: {},
    enums: {},
    screens: {},
    game: {},
    assets: {},
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
Midterm.loader = (function() {
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
            scripts: ['components/image', 'components/particles', 'components/collision', 'components/mouse'],
            message: 'Components loaded',
            onComplete: null
        }, {
            scripts: ['components/text'],
            message: 'Text component loaded',
            onComplete: null
        }, {
            scripts: ['render/core'],
            message: 'Rendering core loaded',
            onComplete: null
        }, {
            scripts: ['render/background', 'render/border', 'render/image'],
            message: 'Rendering components loaded',
            onComplete: null
        }, {
            scripts: ['systems/render','systems/highscores', 'systems/movement', 'systems/mouse-input', 'systems/collision'],
            message: 'Systems loaded',
            onComplete: null
        }, {
            scripts: ['render/text', 'render/status', 'render/particles'],
            message: 'Text rendering component loaded',
            onComplete: null
        }, {
            scripts: ['game'],
            message: 'Game loaded',
            onComplete: null
        }, {
            scripts: ['screens/about', 'screens/highscores', 'screens/mainmenu'],
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
            key: 'whole',
            source: 'assets/images/OldMainFire.png'
        }, {
            key: 'tile128-0',
            source: 'assets/images/tile128-0.png'
        }, {
            key: 'tile128-1',
            source: 'assets/images/tile128-1.png'
        }, {
            key: 'tile128-2',
            source: 'assets/images/tile128-2.png'
        }, {
            key: 'tile128-3',
            source: 'assets/images/tile128-3.png'
        }, {
            key: 'tile128-4',
            source: 'assets/images/tile128-4.png'
        }, {
            key: 'tile128-5',
            source: 'assets/images/tile128-5.png'
        }, {
            key: 'tile128-6',
            source: 'assets/images/tile128-6.png'
        }, {
            key: 'tile128-7',
            source: 'assets/images/tile128-7.png'
        }, {
            key: 'tile128-8',
            source: 'assets/images/tile128-8.png'
        }, {
            key: 'tile128-9',
            source: 'assets/images/tile128-9.png'
        }, {
            key: 'tile128-10',
            source: 'assets/images/tile128-10.png'
        }, {
            key: 'tile128-11',
            source: 'assets/images/tile128-11.png'
        }, {
            key: 'tile128-12',
            source: 'assets/images/tile128-12.png'
        }, {
            key: 'tile128-13',
            source: 'assets/images/tile128-13.png'
        }, {
            key: 'tile128-14',
            source: 'assets/images/tile128-14.png'
        }, {
            key: 'tile128-1',
            source: 'assets/images/tile128-1.png'
        }, {
            key: 'tile128-1',
            source: 'assets/images/tile128-1.png'
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
        
        let endGroup = source.lastIndexOf('-');
        let startGroup = source.lastIndexOf('/')+1
        let endIndex = source.lastIndexOf('.');
        let startIndex = source.lastIndexOf('-')+1
        
        let tileGroup = source.substr(startGroup, endGroup-startGroup);
        let tileIndex = source.substr(startIndex, endIndex-startIndex);

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
                    asset.id = tileIndex;
                    asset.alt = tileGroup;
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
        Midterm.game.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            if(asset.alt == 'tile128'){
                Midterm.assets128[asset.id] = source;
            }
            Midterm.assets[source.key] = asset;
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

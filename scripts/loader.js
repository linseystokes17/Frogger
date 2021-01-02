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
            scripts: ['systems/render','systems/highscores', 'systems/movement', 'systems/mouse-input', 'systems/keyboard-input','systems/collision'],
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
            key: 'tile64-0',
            source: 'assets/images/tile64-0.png'
        }, {
            key: 'tile64-1',
            source: 'assets/images/tile64-1.png'
        }, {
            key: 'tile64-2',
            source: 'assets/images/tile64-2.png'
        }, {
            key: 'tile64-3',
            source: 'assets/images/tile64-3.png'
        }, {
            key: 'tile64-4',
            source: 'assets/images/tile64-4.png'
        }, {
            key: 'tile64-5',
            source: 'assets/images/tile64-5.png'
        }, {
            key: 'tile64-6',
            source: 'assets/images/tile64-6.png'
        }, {
            key: 'tile64-7',
            source: 'assets/images/tile64-7.png'
        }, {
            key: 'tile64-8',
            source: 'assets/images/tile64-8.png'
        }, {
            key: 'tile64-9',
            source: 'assets/images/tile64-9.png'
        }, {
            key: 'tile64-10',
            source: 'assets/images/tile64-10.png'
        }, {
            key: 'tile64-11',
            source: 'assets/images/tile64-11.png'
        }, {
            key: 'tile64-12',
            source: 'assets/images/tile64-12.png'
        }, {
            key: 'tile64-13',
            source: 'assets/images/tile64-13.png'
        }, {
            key: 'tile64-14',
            source: 'assets/images/tile64-14.png'
        }, {
            key: 'tile64-15',
            source: 'assets/images/tile64-15.png'
        }, {
            key: 'tile64-16',
            source: 'assets/images/tile64-16.png'
        }, {
            key: 'tile64-17',
            source: 'assets/images/tile64-17.png'
        }, {
            key: 'tile64-18',
            source: 'assets/images/tile64-18.png'
        }, {
            key: 'tile64-19',
            source: 'assets/images/tile64-19.png'
        }, {
            key: 'tile64-20',
            source: 'assets/images/tile64-20.png'
        }, {
            key: 'tile64-21',
            source: 'assets/images/tile64-21.png'
        }, {
            key: 'tile64-22',
            source: 'assets/images/tile64-22.png'
        }, {
            key: 'tile64-23',
            source: 'assets/images/tile64-23.png'
        }, {
            key: 'tile64-24',
            source: 'assets/images/tile64-24.png'
        }, {
            key: 'tile64-25',
            source: 'assets/images/tile64-25.png'
        }, {
            key: 'tile64-26',
            source: 'assets/images/tile64-26.png'
        }, {
            key: 'tile64-27',
            source: 'assets/images/tile64-27.png'
        }, {
            key: 'tile64-28',
            source: 'assets/images/tile64-28.png'
        }, {
            key: 'tile64-29',
            source: 'assets/images/tile64-29.png'
        }, {
            key: 'tile64-30',
            source: 'assets/images/tile64-30.png'
        }, {
            key: 'tile64-31',
            source: 'assets/images/tile64-31.png'
        }, {
            key: 'tile64-32',
            source: 'assets/images/tile64-32.png'
        }, {
            key: 'tile64-33',
            source: 'assets/images/tile64-33.png'
        }, {
            key: 'tile64-34',
            source: 'assets/images/tile64-34.png'
        }, {
            key: 'tile64-35',
            source: 'assets/images/tile64-35.png'
        }, {
            key: 'tile64-36',
            source: 'assets/images/tile64-36.png'
        }, {
            key: 'tile64-37',
            source: 'assets/images/tile64-37.png'
        }, {
            key: 'tile64-38',
            source: 'assets/images/tile64-38.png'
        }, {
            key: 'tile64-39',
            source: 'assets/images/tile64-39.png'
        }, {
            key: 'tile64-40',
            source: 'assets/images/tile64-40.png'
        }, {
            key: 'tile64-41',
            source: 'assets/images/tile64-41.png'
        }, {
            key: 'tile64-42',
            source: 'assets/images/tile64-42.png'
        }, {
            key: 'tile64-43',
            source: 'assets/images/tile64-43.png'
        }, {
            key: 'tile64-44',
            source: 'assets/images/tile64-44.png'
        }, {
            key: 'tile64-45',
            source: 'assets/images/tile64-45.png'
        }, {
            key: 'tile64-46',
            source: 'assets/images/tile64-46.png'
        }, {
            key: 'tile64-47',
            source: 'assets/images/tile64-47.png'
        }, {
            key: 'tile64-48',
            source: 'assets/images/tile64-48.png'
        }, {
            key: 'tile64-49',
            source: 'assets/images/tile64-49.png'
        }, {
            key: 'tile64-50',
            source: 'assets/images/tile64-50.png'
        }, {
            key: 'tile64-51',
            source: 'assets/images/tile64-51.png'
        }, {
            key: 'tile64-52',
            source: 'assets/images/tile64-52.png'
        }, {
            key: 'tile64-53',
            source: 'assets/images/tile64-53.png'
        }, {
            key: 'tile64-54',
            source: 'assets/images/tile64-54.png'
        }, {
            key: 'tile64-55',
            source: 'assets/images/tile64-55.png'
        }, {
            key: 'tile64-56',
            source: 'assets/images/tile64-56.png'
        }, {
            key: 'tile64-57',
            source: 'assets/images/tile64-57.png'
        }, {
            key: 'tile64-58',
            source: 'assets/images/tile64-58.png'
        }, {
            key: 'tile64-59',
            source: 'assets/images/tile64-59.png'
        }, {
            key: 'tile64-60',
            source: 'assets/images/tile64-60.png'
        }, {
            key: 'tile64-61',
            source: 'assets/images/tile64-61.png'
        }, {
            key: 'tile64-62',
            source: 'assets/images/tile64-62.png'
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
            else if(asset.alt == 'tile64'){
                Midterm.assets64[asset.id] = source;
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

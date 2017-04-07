// =============================================================================
// Just Simple - Framework
// =============================================================================

// The following is a excersize and test to make an 
// easy function for inheritance that works like the 
// following link but automated.



// Polyfills
// =============================================================================

function isFramework($) {
  
  // Core Functions
  // =============================================================================

  // Inheritance Function
  // ===================================

  // Description:     Used to inherit the prototype and properties from parent.
  // Related: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

  function _inherit(parent, child, parentParams) {
    if (typeof parent !== 'function' || typeof child !== 'function') {
      console.error('Inherit can only be used with constructors', parent, child);
      return;
    }
    
    // Grab parent public properties
    parentParams = parentParams === undefined ? null : parentParams;
    var parentProps = new parent(parentParams);
    
    // Add them to child
    for (var prop in parentProps) {
      child[prop] = parentProps[prop];
    }
    
    // Add in prototype
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }


  // Classes
  // =============================================================================

  function _Base() {
    this._is = true;
    this._Type
  }

 _Base.prototype._is = true;      // Used to test for our objects
 _Base.prototype._type = false;   // Used by functions
 _Base.prototype._actual = false; // Actual is used for interacting with loops


  // Module
  // ================================================

   function _Module(options) {
    Object.assign(this, options);
    _Global._modules._import(options._name, this);
    return this._module(options._settings);
  }

  _inherit(_Base, _Module);

  function _import(moduleName) {
    var moduleLocation = _Global._modules[moduleName];
    return moduleLocation === undefined ? null : moduleLocation;
  }


  // Application
  // =====================================

  function _App(name, options) {
    this._type = 'app'
    this._appName = name;
    this._views = {};
    this._controllers = {};
    this._models = {};
  }
  
  _inherit(_Base, _App);

  // _App.prototype._type = 'app';   // Used by functions
  
  _App.prototype.render = function(view, options) {
    this._views[view].process(view);
  };
  
  _App.prototype.view = function(options) {
    Object.assign(options, { _app: this });
    var newView = new _View(options);
    newView._app = this;
    this._views[options.name] = newView;
    return newView;
  };

  // ------------------------

  function _View(options) {
    this._type = 'view';
    this._name = options.name;
    this.process = options.process;
    this.template = options.template;
  }

  _inherit(_App, _View);

  _View.prototype.render = function(options) {
    this.process(options);
  };

  // Global Object
  // =====================================
  
  var _g = _Global = new _Base();

  _g._modules = {};
  _g._modules._import = function(name, options) {
    this[name] = options;
  };



  var myApp = new _App('Testing Application');

  myApp.view({
    name: "People",
    process: function() {
      console.log('The view would return something');
    },
    template: '<div class="test">Hellow World <% this.name %></div>'
  });

  var dogView = myApp.view({
    name: "Dogs",
    process: function() {
      console.log('The view can be called from a varaible');
    },
    template: '<div class="test">Hellow World <% this.name %></div>'
  });


  // Testing system
  console.log(myApp);
  myApp.render('People');
  dogView.render();


  // Create Objects
  // =============================================================================

  // Module notes
  //  - dependenceis
  //  - parameters

  var myModule = new _Module({
    _name: 'ConsoleMadness',
    _settings: {
      settingOne: 'No',
      flag: true
    },
    _module: function(settings) {

      var privateSecret = 'I can walk through walls :)';
      for (var i = 0; i < 100; i++) console.log('Module Run: ' + i);
      this.test = "hello world";
      this.mySecret = function() {
        return this.test + ' communicating my secret: ' + privateSecret;
      };
      
      function testModuleComm() {
        if (settings.flag) console.log('This did not work');
        else console.log('This did work!');
      }
      window.setTimeout(testModuleComm, 1500);
      console.log('does this run')

      return this;


      
    }
  });

  var anotherModule = new _Module({
    _name: 'ModuleCommunication',
    _settings: {
      test: false
    },
    _module: function() {
      
      var dependency = _import('ConsoleMadness');
      console.log(dependency);
      this.othersSecret = function() {
        console.log(dependency.mySecret());
      }
      dependency._settings.flag = false;
      this.test = "Another Value";
      
      return this;
      
    }
  });
  console.log(myModule);
  console.log(anotherModule);






}

isFramework(jQuery);









// ================================================
// Base Class for Test
// ================================================








// ================================================
// Create Data Object (For use in other objects)
// ================================================




// ================================================
// App (MVC)
// ================================================








// ================================================
// Test App Output
// ================================================





// ================================================
// Test Module
// ================================================



